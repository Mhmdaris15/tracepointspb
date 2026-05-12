import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Config
import pool from './config/database';
import { connectRedis } from './config/redis';

// Routes
import authRoutes from './routes/auth';
import campaignRoutes from './routes/campaigns';
import shiftRoutes from './routes/shifts';
import qrRoutes from './routes/qr';

// Sockets
import { setupGPSTracking } from './sockets/gpsTracking';

// ─── App Setup ──────────────────────────────────────────────────
const app = express();
const server = http.createServer(app);

// ─── Socket.io Setup ────────────────────────────────────────────
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
});

// ─── Middleware ──────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// ─── Health Check ───────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'TracePoint SPB API',
      version: '1.0.0',
    });
  } catch {
    res.status(503).json({ status: 'unhealthy', error: 'Database connection failed' });
  }
});

// ─── API Routes ─────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/qr', qrRoutes);

// ─── 404 Handler ────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ───────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '4000', 10);

async function start() {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');

    // Connect Redis
    try {
      await connectRedis();
    } catch (err) {
      console.warn('⚠️ Redis connection failed — running without cache:', err);
    }

    // Initialize Socket.io GPS tracking
    setupGPSTracking(io);
    console.log('✅ Socket.io GPS tracking initialized');

    // Start listening
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🚀 TracePoint SPB API Server                               ║
║  ─────────────────────────────────────────────────────────── ║
║  Port:      ${PORT}                                           ║
║  Env:       ${process.env.NODE_ENV || 'development'}                                  ║
║  Health:    http://localhost:${PORT}/api/health                  ║
║  WebSocket: ws://localhost:${PORT}/socket.io/                   ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
