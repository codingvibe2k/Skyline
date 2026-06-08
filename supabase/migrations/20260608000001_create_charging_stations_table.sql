-- =============================================================================
-- Migration: 20260608000001_create_charging_stations_table.sql
-- Purpose  : Geospatial infrastructure registry for EV charging stations
--            within Bujumbura and surrounding Burundian regions.
-- Platform : Supabase / PostgreSQL + PostGIS
-- Constraint: NO references to mileage, odometer, used, pre-owned,
--             wear_and_tear, scratches, or trade-ins. All data reflects
--             precision GIS coordinate mapping for high-performance
--             infrastructure telemetry.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Step 5.1a — Activate PostGIS Geospatial Extension
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS postgis;

-- ---------------------------------------------------------------------------
-- Step 5.1b — Define the charging_stations Table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.charging_stations (
  -- Identifiers
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,

  -- Geographic Positioning
  location_description  TEXT,            -- Descriptive landmark reference,
                                         -- e.g. "Rohero I, near Blvd de l'Uprona"
                                         --      "Kiriri Diplomatic Zone"
  coordinates           GEOGRAPHY(POINT, 4326)  NOT NULL,
                                         -- WGS-84 longitude/latitude for native
                                         -- high-performance spatial queries

  -- Technical Capabilities
  total_plugs         INTEGER     NOT NULL DEFAULT 1,
  power_output_kw     INTEGER,
  status              TEXT        NOT NULL DEFAULT 'operational',
  access_type         TEXT        NOT NULL DEFAULT 'public',

  -- Audit Timestamps
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- ----------------------------------------------------
  -- CHECK Constraints — enforce operational data quality
  -- ----------------------------------------------------
  CONSTRAINT charging_stations_total_plugs_positive
    CHECK (total_plugs > 0),

  CONSTRAINT charging_stations_power_output_positive
    CHECK (power_output_kw IS NULL OR power_output_kw > 0),

  CONSTRAINT charging_stations_status_valid
    CHECK (status IN ('operational', 'maintenance', 'planned')),

  CONSTRAINT charging_stations_access_type_valid
    CHECK (access_type IN ('public', 'fleet_only', 'diplomatic'))
);

-- ---------------------------------------------------------------------------
-- Step 5.1c — Performance Optimization: GIST Spatial Index
-- Optimizes bounding-box intersection queries over mobile cellular networks
-- (Econet Leo / Lumitel 3G/4G) by enabling index-backed spatial lookups.
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS charging_stations_geo_idx
  ON public.charging_stations
  USING GIST (coordinates);

-- ---------------------------------------------------------------------------
-- Step 5.1d — Auto-update updated_at via trigger function
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_charging_stations_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER charging_stations_updated_at_trigger
  BEFORE UPDATE ON public.charging_stations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_charging_stations_updated_at();

-- ---------------------------------------------------------------------------
-- Step 5.2 — PostGIS Bounding-Box RPC Function
-- Callable from the Next.js client via supabase.rpc('charging_stations_in_bounds')
-- Minimizes payload by filtering to strictly the Mapbox viewport bounds.
-- Uses PostGIS && operator (bounding-box intersect) for index-backed lookups.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.charging_stations_in_bounds(
  min_lat   FLOAT,
  min_long  FLOAT,
  max_lat   FLOAT,
  max_long  FLOAT
)
RETURNS TABLE (
  id                    UUID,
  name                  TEXT,
  location_description  TEXT,
  coordinates           GEOGRAPHY,
  total_plugs           INTEGER,
  power_output_kw       INTEGER,
  status                TEXT,
  access_type           TEXT,
  created_at            TIMESTAMPTZ,
  updated_at            TIMESTAMPTZ
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    cs.id,
    cs.name,
    cs.location_description,
    cs.coordinates,
    cs.total_plugs,
    cs.power_output_kw,
    cs.status,
    cs.access_type,
    cs.created_at,
    cs.updated_at
  FROM public.charging_stations cs
  WHERE cs.coordinates && ST_MakeEnvelope(min_long, min_lat, max_long, max_lat, 4326)::GEOGRAPHY;
$$;

-- ---------------------------------------------------------------------------
-- Step 5.3 — Row Level Security (RLS) Policies
-- ---------------------------------------------------------------------------
ALTER TABLE public.charging_stations ENABLE ROW LEVEL SECURITY;

-- Public read — unauthenticated map layers can scan station availability
CREATE POLICY "charging_stations_public_read"
  ON public.charging_stations
  FOR SELECT
  USING (true);

-- Admin insert — restricted to verified authenticated accounts only
CREATE POLICY "charging_stations_admin_insert"
  ON public.charging_stations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Admin update — restricted to verified authenticated accounts only
CREATE POLICY "charging_stations_admin_update"
  ON public.charging_stations
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Admin delete — restricted to verified authenticated accounts only
CREATE POLICY "charging_stations_admin_delete"
  ON public.charging_stations
  FOR DELETE
  USING (auth.role() = 'authenticated');
