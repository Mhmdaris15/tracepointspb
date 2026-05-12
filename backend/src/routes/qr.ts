import { Router, Response } from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// ─── POST /api/qr/generate ─────────────────────────────────────
// Generate a QR code for a campaign, checkpoint, or flyer tracking
router.post('/generate', authorize('ADMIN'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { campaign_id, type, redirect_url, metadata } = req.body;

    const validTypes = ['CAMPAIGN', 'CHECKPOINT', 'FLYER_TRACKING', 'CLIENT_PORTAL'];
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}` });
      return;
    }

    // Generate a unique code
    const code = `TP-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Build the URL that the QR code will encode
    const baseUrl = process.env.CORS_ORIGIN || 'https://your-domain.com';
    let qrContent: string;

    switch (type) {
      case 'FLYER_TRACKING':
        // Redirect via our tracking endpoint so we can count scans
        qrContent = `${baseUrl}/api/qr/scan/${code}`;
        break;
      case 'CLIENT_PORTAL':
        qrContent = `${baseUrl}/dashboard?token=${code}`;
        break;
      case 'CHECKPOINT':
        qrContent = `${baseUrl}/api/qr/checkpoint/${code}`;
        break;
      default:
        qrContent = `${baseUrl}/campaign/${code}`;
    }

    // Save to database
    const result = await pool.query(
      `INSERT INTO qr_codes (campaign_id, code, type, redirect_url, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [campaign_id || null, code, type, redirect_url || null, metadata ? JSON.stringify(metadata) : null]
    );

    // Generate the QR code image as a data URL (PNG base64)
    const qrImageDataUrl = await QRCode.toDataURL(qrContent, {
      width: 400,
      margin: 2,
      color: {
        dark: '#a78bfa',    // Purple — matches our brand
        light: '#080b14',   // Dark background
      },
      errorCorrectionLevel: 'H',
    });

    // Also generate SVG for print use
    const qrSvg = await QRCode.toString(qrContent, {
      type: 'svg',
      width: 400,
      margin: 2,
      color: {
        dark: '#a78bfa',
        light: '#080b14',
      },
      errorCorrectionLevel: 'H',
    });

    res.status(201).json({
      qr_code: result.rows[0],
      qr_content: qrContent,
      qr_image: qrImageDataUrl,
      qr_svg: qrSvg,
    });
  } catch (err) {
    console.error('QR generate error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/qr/scan/:code ─────────────────────────────────────
// Public endpoint — when someone scans a QR code on a flyer
router.get('/scan/:code', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    // Find the QR code
    const qrResult = await pool.query(
      'SELECT * FROM qr_codes WHERE code = $1 AND is_active = TRUE',
      [code]
    );

    if (qrResult.rows.length === 0) {
      res.status(404).json({ error: 'QR code not found or inactive' });
      return;
    }

    const qrCode = qrResult.rows[0];

    // Log the scan
    await pool.query(
      `INSERT INTO qr_scans (qr_code_id, latitude, longitude, user_agent, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        qrCode.id,
        req.body?.latitude || null,
        req.body?.longitude || null,
        req.headers['user-agent'] || null,
        req.ip,
      ]
    );

    // Increment scan count
    await pool.query(
      'UPDATE qr_codes SET scan_count = scan_count + 1 WHERE id = $1',
      [qrCode.id]
    );

    // Redirect to the target URL
    if (qrCode.redirect_url) {
      res.redirect(302, qrCode.redirect_url);
    } else {
      res.json({ message: 'Scan recorded', campaign_id: qrCode.campaign_id });
    }
  } catch (err) {
    console.error('QR scan error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/qr/campaign/:campaignId ───────────────────────────
// List all QR codes for a campaign
router.get('/campaign/:campaignId', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT * FROM qr_codes WHERE campaign_id = $1 ORDER BY created_at DESC',
      [req.params.campaignId]
    );

    res.json({ qr_codes: result.rows });
  } catch (err) {
    console.error('List QR codes error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/qr/:id/analytics ──────────────────────────────────
// Get scan analytics for a specific QR code
router.get('/:id/analytics', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const scans = await pool.query(
      `SELECT scanned_at, latitude, longitude, user_agent
       FROM qr_scans
       WHERE qr_code_id = $1
       ORDER BY scanned_at DESC
       LIMIT 100`,
      [req.params.id]
    );

    // Aggregate by day
    const dailyScans = await pool.query(
      `SELECT DATE(scanned_at) as date, COUNT(*) as count
       FROM qr_scans
       WHERE qr_code_id = $1
       GROUP BY DATE(scanned_at)
       ORDER BY date DESC
       LIMIT 30`,
      [req.params.id]
    );

    res.json({
      total_scans: scans.rows.length,
      recent_scans: scans.rows,
      daily_breakdown: dailyScans.rows,
    });
  } catch (err) {
    console.error('QR analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
