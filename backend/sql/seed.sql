-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  TracePoint SPB — Seed Data (Development Only)                  ║
-- ║  Creates a default admin user so you can log in immediately.    ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- Default admin user
-- Email: admin@tracepoint.spb
-- Password: admin123 (bcrypt hash, $2b$10$ rounds)
INSERT INTO users (email, password_hash, full_name, phone, role)
VALUES (
    'admin@tracepoint.spb',
    '$2b$10$K4GWpvJN2xgITW3KlnYz0O3Bnb0ixq7Y7S.aVxyDJH1mWqR2G9Ni',
    'Admin TracePoint',
    '+79810409453',
    'ADMIN'
) ON CONFLICT (email) DO NOTHING;

-- Sample client
INSERT INTO users (email, password_hash, full_name, phone, role)
VALUES (
    'client@demo.com',
    '$2b$10$K4GWpvJN2xgITW3KlnYz0O3Bnb0ixq7Y7S.aVxyDJH1mWqR2G9Ni',
    'Demo Client LLC',
    '+79001234567',
    'CLIENT'
) ON CONFLICT (email) DO NOTHING;

-- Sample distributor
INSERT INTO users (email, password_hash, full_name, phone, role)
VALUES (
    'courier@demo.com',
    '$2b$10$K4GWpvJN2xgITW3KlnYz0O3Bnb0ixq7Y7S.aVxyDJH1mWqR2G9Ni',
    'Ivan Petrov',
    '+79009876543',
    'DISTRIBUTOR'
) ON CONFLICT (email) DO NOTHING;
