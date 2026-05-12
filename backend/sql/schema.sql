-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  TracePoint SPB — Database Schema                               ║
-- ║  Auto-runs on first `docker-compose up` via initdb.d mount      ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. USERS ───────────────────────────────────────────────────────
-- Stores all users: admins, clients (businesses), and distributors.
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    phone           VARCHAR(50),
    avatar_url      TEXT,
    role            VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'CLIENT', 'DISTRIBUTOR')),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ─── 2. CAMPAIGNS ──────────────────────────────────────────────────
-- A flyer distribution project created by an admin for a client.
CREATE TABLE campaigns (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    flyer_goal          INTEGER NOT NULL DEFAULT 0,
    flyers_distributed  INTEGER NOT NULL DEFAULT 0,
    status              VARCHAR(50) DEFAULT 'DRAFT'
                        CHECK (status IN ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED')),
    target_area_polygon JSONB,          -- GeoJSON polygon of the target zone (Yandex Maps compatible)
    start_date          TIMESTAMPTZ,
    end_date            TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_client ON campaigns(client_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ─── 3. CAMPAIGN ASSIGNMENTS ───────────────────────────────────────
-- Many-to-many: which distributors are assigned to which campaigns.
CREATE TABLE campaign_assignments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id     UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    distributor_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campaign_id, distributor_id)
);

-- ─── 4. SHIFTS ─────────────────────────────────────────────────────
-- A working session: distributor clocks in/out on a campaign.
CREATE TABLE shifts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    distributor_id  UUID NOT NULL REFERENCES users(id),
    campaign_id     UUID NOT NULL REFERENCES campaigns(id),
    start_time      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_time        TIMESTAMPTZ,
    is_active       BOOLEAN DEFAULT TRUE,
    flyers_count    INTEGER DEFAULT 0,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shifts_distributor ON shifts(distributor_id);
CREATE INDEX idx_shifts_campaign ON shifts(campaign_id);
CREATE INDEX idx_shifts_active ON shifts(is_active) WHERE is_active = TRUE;

-- ─── 5. GPS_LOGS ───────────────────────────────────────────────────
-- High-frequency location pings during a shift (every few seconds).
CREATE TABLE gps_logs (
    id              BIGSERIAL PRIMARY KEY,
    shift_id        UUID NOT NULL REFERENCES shifts(id) ON DELETE CASCADE,
    distributor_id  UUID NOT NULL REFERENCES users(id),
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    accuracy        DOUBLE PRECISION,          -- meters
    speed           DOUBLE PRECISION,          -- m/s (from Geolocation API)
    heading         DOUBLE PRECISION,          -- degrees
    recorded_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Composite index for time-series queries per shift
CREATE INDEX idx_gps_shift_time ON gps_logs(shift_id, recorded_at);
-- Index for heatmap queries across distributors
CREATE INDEX idx_gps_distributor ON gps_logs(distributor_id);

-- ─── 6. PROOF_UPLOADS ──────────────────────────────────────────────
-- Geotagged photos taken by distributors as delivery evidence.
CREATE TABLE proof_uploads (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_id        UUID NOT NULL REFERENCES shifts(id) ON DELETE CASCADE,
    campaign_id     UUID NOT NULL REFERENCES campaigns(id),
    distributor_id  UUID NOT NULL REFERENCES users(id),
    image_url       TEXT NOT NULL,
    thumbnail_url   TEXT,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    address         TEXT,                       -- Reverse-geocoded via Yandex/2GIS
    scanned_qr      VARCHAR(255),              -- If they scanned a checkpoint QR
    uploaded_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_proof_campaign ON proof_uploads(campaign_id);
CREATE INDEX idx_proof_shift ON proof_uploads(shift_id);

-- ─── 7. QR_CODES ───────────────────────────────────────────────────
-- Generated QR codes for campaigns, checkpoints, or flyer tracking.
CREATE TABLE qr_codes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id     UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    code            VARCHAR(255) UNIQUE NOT NULL,   -- The encoded string
    type            VARCHAR(50) NOT NULL
                    CHECK (type IN ('CAMPAIGN', 'CHECKPOINT', 'FLYER_TRACKING', 'CLIENT_PORTAL')),
    redirect_url    TEXT,                            -- Where to redirect on scan (for flyer QR codes)
    scan_count      INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    metadata        JSONB,                           -- Arbitrary data (UTM params, batch info, etc.)
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qr_code ON qr_codes(code);
CREATE INDEX idx_qr_campaign ON qr_codes(campaign_id);

-- ─── 8. QR_SCANS ───────────────────────────────────────────────────
-- Every time a QR code is scanned (public or internal).
CREATE TABLE qr_scans (
    id              BIGSERIAL PRIMARY KEY,
    qr_code_id      UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
    scanned_by      UUID REFERENCES users(id),         -- NULL if scanned by the public
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    user_agent      TEXT,
    ip_address      INET,
    scanned_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scans_qr ON qr_scans(qr_code_id);
CREATE INDEX idx_scans_time ON qr_scans(scanned_at);

-- ─── 9. REPORTS ────────────────────────────────────────────────────
-- Auto-generated or manual PDF/summary reports for clients.
CREATE TABLE reports (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id     UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    type            VARCHAR(50) DEFAULT 'DAILY'
                    CHECK (type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'FINAL')),
    pdf_url         TEXT,
    summary         JSONB,       -- Quick stats: flyers delivered, distance covered, etc.
    generated_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_campaign ON reports(campaign_id);

-- ─── 10. NOTIFICATIONS ────────────────────────────────────────────
-- In-app notifications for users (campaign updates, proof alerts).
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    body            TEXT,
    type            VARCHAR(50) DEFAULT 'INFO'
                    CHECK (type IN ('INFO', 'SUCCESS', 'WARNING', 'ALERT')),
    is_read         BOOLEAN DEFAULT FALSE,
    link            TEXT,            -- Deep link into the dashboard
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ─── FUNCTION: Auto-update `updated_at` columns ───────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
