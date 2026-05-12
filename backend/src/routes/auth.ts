import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import pool from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// ─── Validation Schemas ─────────────────────────────────────────
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum(['CLIENT', 'DISTRIBUTOR']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ─── POST /api/auth/register ────────────────────────────────────
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    // Check if user already exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [data.email]);
    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, full_name, role, created_at`,
      [data.email, password_hash, data.full_name, data.phone || null, data.role]
    );

    const user = result.rows[0];

    // Generate JWT
    const jwtOptions: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
      process.env.JWT_SECRET!,
      jwtOptions
    );

    res.status(201).json({ user, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /api/auth/login ───────────────────────────────────────
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await pool.query(
      'SELECT id, email, password_hash, full_name, role, is_active FROM users WHERE email = $1',
      [data.email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];

    if (!user.is_active) {
      res.status(403).json({ error: 'Account disabled' });
      return;
    }

    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const jwtOpts: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
      process.env.JWT_SECRET!,
      jwtOpts
    );

    res.json({
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      token,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
      return;
    }
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── GET /api/auth/me ───────────────────────────────────────────
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, phone, avatar_url, role, created_at FROM users WHERE id = $1',
      [req.user!.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
