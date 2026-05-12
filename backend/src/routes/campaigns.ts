import { Router, Response } from 'express';
import { z } from 'zod';
import pool from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

// All campaign routes require authentication
router.use(authenticate);

// ─── Validation Schemas ─────────────────────────────────────────
const createCampaignSchema = z.object({
  client_id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  flyer_goal: z.number().int().positive(),
  target_area_polygon: z.any().optional(), // GeoJSON
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

// ─── GET /api/campaigns ─────────────────────────────────────────
// Admin sees all. Client sees only their campaigns.
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: string;
    let params: string[] = [];

    if (req.user!.role === 'ADMIN') {
      query = `
        SELECT c.*, u.full_name as client_name
        FROM campaigns c
        JOIN users u ON c.client_id = u.id
        ORDER BY c.created_at DESC
      `;
    } else if (req.user!.role === 'CLIENT') {
      query = `
        SELECT c.*, u.full_name as client_name
        FROM campaigns c
        JOIN users u ON c.client_id = u.id
        WHERE c.client_id = $1
        ORDER BY c.created_at DESC
      `;
      params = [req.user!.id];
    } else {
      // DISTRIBUTOR — only campaigns they're assigned to
      query = `
        SELECT c.*, u.full_name as client_name
        FROM campaigns c
        JOIN users u ON c.client_id = u.id
        JOIN campaign_assignments ca ON ca.campaign_id = c.id
        WHERE ca.distributor_id = $1
        ORDER BY c.created_at DESC
      `;
      params = [req.user!.id];
    }

    const result = await pool.query(query, params);
    res.json({ campaigns: result.rows });
  } catch (err) {
    console.error('List campaigns error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/campaigns/:id ─────────────────────────────────────
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.full_name as client_name
       FROM campaigns c
       JOIN users u ON c.client_id = u.id
       WHERE c.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    const campaign = result.rows[0];

    // Clients can only see their own campaigns
    if (req.user!.role === 'CLIENT' && campaign.client_id !== req.user!.id) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Get assigned distributors
    const distributors = await pool.query(
      `SELECT u.id, u.full_name, u.phone, ca.assigned_at
       FROM campaign_assignments ca
       JOIN users u ON ca.distributor_id = u.id
       WHERE ca.campaign_id = $1`,
      [req.params.id]
    );

    // Get recent shifts
    const shifts = await pool.query(
      `SELECT s.*, u.full_name as distributor_name
       FROM shifts s
       JOIN users u ON s.distributor_id = u.id
       WHERE s.campaign_id = $1
       ORDER BY s.start_time DESC
       LIMIT 20`,
      [req.params.id]
    );

    res.json({
      campaign,
      distributors: distributors.rows,
      shifts: shifts.rows,
    });
  } catch (err) {
    console.error('Get campaign error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /api/campaigns ────────────────────────────────────────
// Admin only
router.post('/', authorize('ADMIN'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createCampaignSchema.parse(req.body);

    const result = await pool.query(
      `INSERT INTO campaigns (client_id, title, description, flyer_goal, target_area_polygon, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.client_id,
        data.title,
        data.description || null,
        data.flyer_goal,
        data.target_area_polygon ? JSON.stringify(data.target_area_polygon) : null,
        data.start_date || null,
        data.end_date || null,
      ]
    );

    res.status(201).json({ campaign: result.rows[0] });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    console.error('Create campaign error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── PATCH /api/campaigns/:id/status ────────────────────────────
// Admin only — update campaign status
router.patch('/:id/status', authorize('ADMIN'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const validStatuses = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
      return;
    }

    const result = await pool.query(
      'UPDATE campaigns SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    res.json({ campaign: result.rows[0] });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /api/campaigns/:id/assign ─────────────────────────────
// Admin only — assign a distributor to a campaign
router.post('/:id/assign', authorize('ADMIN'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { distributor_id } = req.body;
    if (!distributor_id) {
      res.status(400).json({ error: 'distributor_id is required' });
      return;
    }

    await pool.query(
      `INSERT INTO campaign_assignments (campaign_id, distributor_id)
       VALUES ($1, $2)
       ON CONFLICT (campaign_id, distributor_id) DO NOTHING`,
      [req.params.id, distributor_id]
    );

    res.status(201).json({ message: 'Distributor assigned' });
  } catch (err) {
    console.error('Assign distributor error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
