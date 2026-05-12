import { Router, Response } from 'express';
import pool from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// ─── POST /api/shifts/start ─────────────────────────────────────
// Distributor starts a shift on a campaign
router.post('/start', authorize('DISTRIBUTOR'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { campaign_id } = req.body;

    if (!campaign_id) {
      res.status(400).json({ error: 'campaign_id is required' });
      return;
    }

    // Check the distributor is assigned to this campaign
    const assignment = await pool.query(
      'SELECT id FROM campaign_assignments WHERE campaign_id = $1 AND distributor_id = $2',
      [campaign_id, req.user!.id]
    );

    if (assignment.rows.length === 0) {
      res.status(403).json({ error: 'You are not assigned to this campaign' });
      return;
    }

    // Check for an existing active shift
    const activeShift = await pool.query(
      'SELECT id FROM shifts WHERE distributor_id = $1 AND is_active = TRUE',
      [req.user!.id]
    );

    if (activeShift.rows.length > 0) {
      res.status(409).json({ error: 'You already have an active shift. End it first.' });
      return;
    }

    // Create shift
    const result = await pool.query(
      `INSERT INTO shifts (distributor_id, campaign_id)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user!.id, campaign_id]
    );

    res.status(201).json({ shift: result.rows[0] });
  } catch (err) {
    console.error('Start shift error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /api/shifts/:id/end ───────────────────────────────────
// Distributor ends their active shift
router.post('/:id/end', authorize('DISTRIBUTOR'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { flyers_count, notes } = req.body;

    const result = await pool.query(
      `UPDATE shifts
       SET end_time = CURRENT_TIMESTAMP, is_active = FALSE, flyers_count = $1, notes = $2
       WHERE id = $3 AND distributor_id = $4 AND is_active = TRUE
       RETURNING *`,
      [flyers_count || 0, notes || null, req.params.id, req.user!.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Active shift not found' });
      return;
    }

    // Update campaign total
    if (flyers_count > 0) {
      await pool.query(
        'UPDATE campaigns SET flyers_distributed = flyers_distributed + $1 WHERE id = $2',
        [flyers_count, result.rows[0].campaign_id]
      );
    }

    res.json({ shift: result.rows[0] });
  } catch (err) {
    console.error('End shift error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/shifts/active ─────────────────────────────────────
// Get all currently active shifts (admin view)
router.get('/active', authorize('ADMIN'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT s.*, u.full_name as distributor_name, c.title as campaign_title
       FROM shifts s
       JOIN users u ON s.distributor_id = u.id
       JOIN campaigns c ON s.campaign_id = c.id
       WHERE s.is_active = TRUE
       ORDER BY s.start_time DESC`
    );

    res.json({ active_shifts: result.rows });
  } catch (err) {
    console.error('Active shifts error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/shifts/:id/gps ────────────────────────────────────
// Get the GPS trail for a specific shift (for drawing on the map)
router.get('/:id/gps', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT latitude, longitude, accuracy, speed, heading, recorded_at
       FROM gps_logs
       WHERE shift_id = $1
       ORDER BY recorded_at ASC`,
      [req.params.id]
    );

    res.json({ gps_trail: result.rows });
  } catch (err) {
    console.error('GPS trail error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
