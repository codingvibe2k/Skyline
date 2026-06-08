# 🚀 Task 4: Database Migration — Supabase Relational Schema: `vehicles` & `vehicle_images` Tables (0 Km Absolute Constraints)

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the rules established in `agent.md`. This task builds the inventory and media asset layer in Supabase. You are **STRICTLY FORBIDDEN** from creating database columns, foreign keys, check constraints, indexes, data types, or comments that reference: `mileage`, `odometer`, `used`, `pre-owned`, `wear_and_tear`, `scratches`, or `trade-ins`.
> 
> Everything must model pristine, factory-fresh "0 Km" fleet distributions. Decoupling the media layer into a dedicated sub-table ensures we can map over high-resolution catalog images flawlessly without cluttering root table lookups.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 4.1: SQL Migration Script Design (Relational Multi-Image Schema)
Create a migration script file at `supabase/migrations/20260608000000_create_showroom_schema.sql` (or match your local workspace migration naming syntax). Write pure, optimized PostgreSQL to establish two tightly linked tables:

1. **The Core `vehicles` Table:**
   * **Identifiers:** `id` (UUID, primary key, defaulting to `gen_random_uuid()`), `brand` (text), `model` (text), `trim_level` (text, nullable).
   * **Spec Matrix Context:**
     * `battery_capacity_kwh` (numeric)
     * `wltp_range_km` (integer)
     * `peak_power_kw` (integer)
     * `acceleration_0_100` (numeric)
     * `top_speed_kmh` (integer)
   * **Inventory Control & Factory Compliance:**
     * `price_usd` (numeric, precise checking scalar)
     * `factory_warranty_years` (integer, mandatory)
     * `stock_count` (integer, default `0`)
     * `status` (text, restricted via a check constraint to strictly `'available' | 'reserved' | 'allocated'`)
   * **Timestamps:** `created_at` & `updated_at` (timestamps with time zone).
   * *Include strict CHECK constraints ensuring `stock_count >= 0` and `price_usd > 0`.*

2. **The Relational `vehicle_images` Table:**
   * **Columns:**
     * `id` (UUID, primary key, defaulting to `gen_random_uuid()`)
     * `vehicle_id` (UUID, foreign key targeting `vehicles.id` with `ON DELETE CASCADE`)
     * `url` (text, pointing to your high-performance CDN / Cloudinary asset paths)
     * `display_order` (integer, default `0` — used to sequence images for your carousel slider arrays)
     * `alt_text` (text, for pristine semantic markup and premium SEO)
     * `created_at` (timestamp with time zone)
   * *Add a database index on `vehicle_id` to maximize query speeds over local Bujumbura networks.*

#### Step 4.2: Enable Row Level Security (RLS) & Fine-Grained Access
Within the same script, enforce absolute security barriers for both tables to protect institutional showroom structures:
* Execute `ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;` and `ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;`.
* Create open public read policies (`SELECT`) for **both** tables, allowing unauthenticated client applications to fetch and display complete showroom sheets smoothly over 3G/4G network profiles.
* Create write rules (`INSERT`, `UPDATE`, `DELETE`) locked down exclusively to administrative users carrying the verified `authenticated` role.

#### Step 4.3: Generate Multi-Table TypeScript Database Types
Expose both components of your relational schema to your frontend layer by editing or writing `src/types/database.types.ts`:
* Map out explicit TypeScript interfaces or type aliases matching the exact column definitions of both `Vehicle` and `VehicleImage`.
* Ensure the type mappings support structural arrays (e.g., fetching a vehicle left-joined with its corresponding image list: `(Vehicle & { vehicle_images: VehicleImage[] })[]`), allowing full type safety when you eventually `.map()` over them inside the UI.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Execute the project syntax validator to make sure your newly introduced database schemas and TypeScript relational types compile perfectly:
   ```bash
   npm run lint