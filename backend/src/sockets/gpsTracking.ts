import { Server as SocketServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { getRedisClient } from '../config/redis';
import { AuthUser } from '../middleware/auth';

interface GPSPayload {
  shift_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
}

/**
 * Sets up real-time GPS tracking via Socket.io.
 *
 * Flow:
 * 1. Distributor connects with JWT token → authenticated.
 * 2. Distributor emits 'gps:update' events every few seconds.
 * 3. Server saves to PostgreSQL + publishes to Redis.
 * 4. Admin/Client dashboards subscribe to 'gps:live:{campaignId}' rooms.
 * 5. Admins see live markers moving on Yandex Maps / 2GIS.
 */
export function setupGPSTracking(io: SocketServer): void {
  // ─── Authentication middleware for Socket.io ──────────────────
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const user = jwt.verify(token as string, process.env.JWT_SECRET!) as AuthUser;
      (socket as any).user = user;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const user: AuthUser = (socket as any).user;
    console.log(`🔌 Socket connected: ${user.full_name} (${user.role})`);

    // ── Distributor: Send GPS updates ───────────────────────────
    if (user.role === 'DISTRIBUTOR') {
      socket.on('gps:update', async (payload: GPSPayload) => {
        try {
          const { shift_id, latitude, longitude, accuracy, speed, heading } = payload;

          // 1. Save to PostgreSQL (persistent storage for trail/heatmaps)
          await pool.query(
            `INSERT INTO gps_logs (shift_id, distributor_id, latitude, longitude, accuracy, speed, heading)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [shift_id, user.id, latitude, longitude, accuracy || null, speed || null, heading || null]
          );

          // 2. Get the campaign_id for this shift
          const shiftResult = await pool.query(
            'SELECT campaign_id FROM shifts WHERE id = $1',
            [shift_id]
          );

          if (shiftResult.rows.length > 0) {
            const campaignId = shiftResult.rows[0].campaign_id;

            // 3. Broadcast to all subscribers watching this campaign
            const liveData = {
              distributor_id: user.id,
              distributor_name: user.full_name,
              shift_id,
              latitude,
              longitude,
              accuracy,
              speed,
              heading,
              timestamp: new Date().toISOString(),
            };

            io.to(`campaign:${campaignId}`).emit('gps:live', liveData);

            // 4. Cache latest position in Redis (fast lookups for dashboard)
            try {
              const redis = getRedisClient();
              await redis.set(
                `gps:latest:${user.id}`,
                JSON.stringify(liveData),
                { EX: 300 } // Expire after 5 minutes of no updates
              );
            } catch (redisErr) {
              // Redis is optional — don't crash if it's down
              console.error('Redis cache error:', redisErr);
            }
          }
        } catch (err) {
          console.error('GPS update error:', err);
          socket.emit('gps:error', { message: 'Failed to save GPS data' });
        }
      });
    }

    // ── Admin/Client: Subscribe to campaign updates ─────────────
    socket.on('campaign:subscribe', (campaignId: string) => {
      if (user.role === 'ADMIN' || user.role === 'CLIENT') {
        socket.join(`campaign:${campaignId}`);
        console.log(`👁️ ${user.full_name} subscribed to campaign:${campaignId}`);
      }
    });

    socket.on('campaign:unsubscribe', (campaignId: string) => {
      socket.leave(`campaign:${campaignId}`);
    });

    // ── Disconnect ──────────────────────────────────────────────
    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${user.full_name}`);
    });
  });
}
