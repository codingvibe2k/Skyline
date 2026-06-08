# 🚀 Task 6: Strict Runtime Schema Mapping — Form Input & Payload Validation via Zod

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the rules established in `agent.md`. This task implements runtime type-safety layers across incoming server data entries. You are **STRICTLY FORBIDDEN** from creating Zod properties, validation attributes, custom refinements, or localized error strings that reference: `mileage`, `odometer`, `used`, `pre-owned`, `wear_and_tear`, `scratches`, or `trade-ins`.
> 
> All fields must describe pristine factory specs, certified charging network metrics, and flawless luxury assets.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 6.1: Authoring Centralized Showroom Zod Schemas
Create a validation file at `src/lib/validations/showroom.ts` to manage structured ingestion layers for the database entities defined in Task 4 and Task 5. Leverage native `zod` structures to build two pristine verification contracts:

1. **`vehicleInputSchema`:**
   * **Text Fields:** `brand` (min 1 char), `model` (min 1 char), `trim_level` (string, optional/nullable).
   * **Performance Numbers:** * `battery_capacity_kwh` (positive number, strictly greater than 0)
     * `wltp_range_km` (positive integer)
     * `peak_power_kw` (positive integer)
     * `acceleration_0_100` (positive number)
     * `top_speed_kmh` (positive integer)
   * **Commercial Metrics:** * `price_usd` (positive number matching high-precision scalar limits)
     * `factory_warranty_years` (positive integer, minimum 1 year required)
     * `stock_count` (integer, minimum 0 allowed)
   * **Status Enumerations:** `status` (restricted using `z.enum(['available', 'reserved', 'allocated'])`).

2. **`chargingStationInputSchema`:**
   * **Meta Fields:** `name` (min 1 char), `location_description` (min 1 char).
   * **Geospatial Coordinates:** * `latitude` (number bounded between `-90` and `90`)
     * `longitude` (number bounded between `-180` and `180`)
   * **Infrastructure Specs:**
     * `total_plugs` (integer, minimum 1 required)
     * `power_output_kw` (positive integer)
     * `status` (restricted via `z.enum(['operational', 'maintenance', 'planned'])`)
     * `access_type` (restricted via `z.enum(['public', 'fleet_only', 'diplomatic'])`)

#### Step 6.2: Extracting Static Compile-Time TypeScript Profiles
Export strong compile-time types directly from your written schemas to avoid structural drift across application boundaries:
* Utilize Zod's native `z.infer<typeof schema>` capability.
* Export two structured types: `VehicleInput` and `ChargingStationInput`.
* Cross-verify that these types align safely with the database model interfaces previously written inside `src/types/database.types.ts`.

#### Step 6.3: Multi-Lingual Contextual Error Payloads
Ensure that all validation feedback rules are isolated from hardcoded strings to guarantee simple translation overrides down the line:
* For each restriction constraint, declare structured, lightweight, human-readable error messages.
* Example syntax approach:
  ```typescript
  brand: z.string().min(1, { message: "validation.vehicle.brand_required" })