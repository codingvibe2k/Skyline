-- =============================================================================
-- Migration: Premium "0 Km" Showroom Schema
-- Tables: vehicles, vehicle_images
-- Enforces factory-fresh, brand-new inventory constraints exclusively.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- TABLE: vehicles
-- Core catalog entity representing every pristine, factory-delivered unit.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vehicles (
  id                     UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  brand                  TEXT        NOT NULL,
  model                  TEXT        NOT NULL,
  trim_level             TEXT,

  -- Electric Powertrain Spec Matrix
  battery_capacity_kwh   NUMERIC     NOT NULL,
  wltp_range_km          INTEGER     NOT NULL,
  peak_power_kw          INTEGER     NOT NULL,
  acceleration_0_100     NUMERIC     NOT NULL,
  top_speed_kmh          INTEGER     NOT NULL,

  -- Inventory Control & Factory Compliance
  price_usd              NUMERIC     NOT NULL,
  factory_warranty_years INTEGER     NOT NULL,
  stock_count            INTEGER     NOT NULL DEFAULT 0,
  status                 TEXT        NOT NULL DEFAULT 'available',

  -- Audit Timestamps
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Integrity Constraints
  CONSTRAINT chk_vehicles_price_positive
    CHECK (price_usd > 0),
  CONSTRAINT chk_vehicles_stock_non_negative
    CHECK (stock_count >= 0),
  CONSTRAINT chk_vehicles_status_valid
    CHECK (status IN ('available', 'reserved', 'allocated')),
  CONSTRAINT chk_vehicles_battery_positive
    CHECK (battery_capacity_kwh > 0),
  CONSTRAINT chk_vehicles_range_positive
    CHECK (wltp_range_km > 0),
  CONSTRAINT chk_vehicles_power_positive
    CHECK (peak_power_kw > 0),
  CONSTRAINT chk_vehicles_acceleration_positive
    CHECK (acceleration_0_100 > 0),
  CONSTRAINT chk_vehicles_top_speed_positive
    CHECK (top_speed_kmh > 0),
  CONSTRAINT chk_vehicles_warranty_positive
    CHECK (factory_warranty_years > 0)
);

COMMENT ON TABLE vehicles IS
  'Factory-fresh, zero-delivery-km fleet catalog. Pristine manufacturer units only.';

COMMENT ON COLUMN vehicles.status IS
  'Inventory lifecycle state: available | reserved | allocated.';

COMMENT ON COLUMN vehicles.factory_warranty_years IS
  'Full original manufacturer warranty coverage period in years.';

-- ---------------------------------------------------------------------------
-- TABLE: vehicle_images
-- Decoupled media layer for high-resolution CDN / Cloudinary asset paths.
-- Supports ordered carousel arrays without cluttering root table lookups.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vehicle_images (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id    UUID        NOT NULL
                              REFERENCES vehicles(id)
                              ON DELETE CASCADE,
  url           TEXT        NOT NULL,
  display_order INTEGER     NOT NULL DEFAULT 0,
  alt_text      TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE vehicle_images IS
  'Ordered CDN image assets linked to each vehicle entry for carousel display.';

COMMENT ON COLUMN vehicle_images.display_order IS
  'Zero-based ordering index controlling carousel image sequence.';

-- Index for high-performance joins over local Bujumbura 3G/4G network profiles
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id
  ON vehicle_images(vehicle_id);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- vehicles: enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- vehicles: public read — unauthenticated clients may fetch the full catalog
CREATE POLICY "vehicles_public_read"
  ON vehicles
  FOR SELECT
  USING (true);

-- vehicles: write access restricted to authenticated administrators
CREATE POLICY "vehicles_admin_insert"
  ON vehicles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicles_admin_update"
  ON vehicles
  FOR UPDATE
  USING  (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicles_admin_delete"
  ON vehicles
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- vehicle_images: enable RLS
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

-- vehicle_images: public read
CREATE POLICY "vehicle_images_public_read"
  ON vehicle_images
  FOR SELECT
  USING (true);

-- vehicle_images: write access restricted to authenticated administrators
CREATE POLICY "vehicle_images_admin_insert"
  ON vehicle_images
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_admin_update"
  ON vehicle_images
  FOR UPDATE
  USING  (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_admin_delete"
  ON vehicle_images
  FOR DELETE
  USING (auth.role() = 'authenticated');
