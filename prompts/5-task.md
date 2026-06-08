# 🚀 Task 5: Database Migration — Supabase `charging_stations` Table (GIS Geolocation Bounds)

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the rules established in `agent.md`. This task initializes the geospatial network infrastructure within Supabase to power our regional Mapbox dashboard layer. You are **STRICTLY FORBIDDEN** from introducing any database columns, descriptions, type constraints, or comments that reference: `mileage`, `odometer`, `used`, `pre-owned`, `wear_and_tear`, `scratches`, or `trade-ins`.
> 
> Everything must focus strictly on high-performance infrastructure metrics. All location data must reflect precision coordinate mapping optimized for quick loading over local Bujumbura networks (Econet Leo / Lumitel 3G/4G).

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 5.1: SQL Migration Script Design (PostGIS Spatial Schema)
Create a new migration script file at `supabase/migrations/20260608000001_create_charging_stations_table.sql` (or match your local environment's migration sequence convention). Write pure PostgreSQL to activate geospatial capabilities and establish the infrastructure registry:

1. **Activate Geospatial Extensions:**
   * Ensure the Postgres spatial extension is active before creating tables:
     ```sql
     CREATE EXTENSION IF NOT EXISTS postgis;
     ```

2. **Define the `charging_stations` Table:**
   * **Identifiers:** `id` (UUID, primary key, defaulting to `gen_random_uuid()`), `name` (text, non-nullable).
   * **Geographic Positioning:** * `location_description` (text, descriptive landmark in Bujumbura, e.g., *Rohero I, near Boulevard de l'Uprona*, *Kiriri Diplomatic Zone*).
     * `coordinates` (geography(Point, 4326), non-nullable) — handles native high-performance longitude/latitude queries.
   * **Technical Capabilities:**
     * `total_plugs` (integer, default `1`) — total operational plug ports.
     * `power_output_kw` (integer) — capacity ratings (e.g., `50` for DC fast charging, `150` for ultra-fast showroom chargers).
     * `status` (text) — check-constrained to strictly: `'operational' | 'maintenance' | 'planned'`.
     * `access_type` (text) — check-constrained to strictly: `'public' | 'fleet_only' | 'diplomatic'`.
   * **Timestamps:** `created_at` & `updated_at` (timestamps with time zone).
   * *Include strict CHECK constraints ensuring `total_plugs > 0` and `power_output_kw > 0`.*

3. **Performance Optimization (Spatial Index):**
   * Create a high-speed GIST spatial index on the coordinates field to optimize bounding-box inquiries over mobile cellular networks:
     ```sql
     CREATE INDEX charging_stations_geo_idx ON charging_stations USING GIST (coordinates);
     ```

#### Step 5.2: PostGIS Bounding-Box Database Function (RPC)
Within the same migration script, create a compiled PostgreSQL function to let the Next.js client request charging stations located strictly within the user's Mapbox viewport boundaries. This minimizes payload sizes and accelerates page response speeds:
* Define a function named `charging_stations_in_bounds(min_lat float, min_long float, max_lat float, max_long float)`.
* Have it return a matching filtered sub-table containing the station fields, utilizing the PostGIS bounding-box intersect operator (`&&`) to enable index-backed lookups.

#### Step 5.3: Enable Row Level Security (RLS) & Geographic Access Controls
Enforce absolute data protection protocols on your geospatial infrastructure:
* Execute `ALTER TABLE charging_stations ENABLE ROW LEVEL SECURITY;`.
* Implement a public read policy (`SELECT`) enabling unauthenticated client map layers to scan station availability flags smoothly.
* Implement write policies (`INSERT`, `UPDATE`, `DELETE`) restricted exclusively to verified administrative accounts via the `authenticated` role.

#### Step 5.4: Map Out TypeScript Geospatial Definitions
Expose the geospatial schemas and RPC return payloads directly to your Next.js application workspace:
* Append or update type interfaces inside `src/types/database.types.ts`.
* Clearly declare structural fields matching `ChargingStation`. For fields involving geography or spatial points, accurately type out how they map to coordinates or GeoJSON structures so they pair perfectly with frontend `react-map-gl` bindings later.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Compile your workspace layout and type definitions using the local validation toolchain to guarantee structural alignment:
   ```bash
   npm run lint