// =============================================================================
// Showroom Runtime Validation Schemas — Premium "0 Km" Platform
// All schemas enforce pristine factory-spec data. Zero references to:
// mileage | odometer | used | pre-owned | wear_and_tear | scratches | trade-ins
// =============================================================================

import { z } from 'zod';

// ---------------------------------------------------------------------------
// § 6.1 / 6.3 — vehicleInputSchema
// Validates incoming form payloads for new factory-fresh vehicle entries.
// All error messages use i18n translation key paths for downstream locale
// override without touching this schema file.
// ---------------------------------------------------------------------------
export const vehicleInputSchema = z.object({
  // ── Text Identity Fields ──────────────────────────────────────────────────
  brand: z
    .string({ error: 'validation.vehicle.brand_required' })
    .min(1, { error: 'validation.vehicle.brand_required' }),

  model: z
    .string({ error: 'validation.vehicle.model_required' })
    .min(1, { error: 'validation.vehicle.model_required' }),

  trim_level: z
    .string()
    .min(1, { error: 'validation.vehicle.trim_level_invalid' })
    .nullable()
    .optional(),

  // ── Electric Powertrain Performance Matrix ────────────────────────────────
  battery_capacity_kwh: z
    .number({ error: 'validation.vehicle.battery_capacity_kwh_required' })
    .positive({ error: 'validation.vehicle.battery_capacity_kwh_positive' }),

  wltp_range_km: z
    .number({ error: 'validation.vehicle.wltp_range_km_required' })
    .int({ error: 'validation.vehicle.wltp_range_km_integer' })
    .positive({ error: 'validation.vehicle.wltp_range_km_positive' }),

  peak_power_kw: z
    .number({ error: 'validation.vehicle.peak_power_kw_required' })
    .int({ error: 'validation.vehicle.peak_power_kw_integer' })
    .positive({ error: 'validation.vehicle.peak_power_kw_positive' }),

  acceleration_0_100: z
    .number({ error: 'validation.vehicle.acceleration_0_100_required' })
    .positive({ error: 'validation.vehicle.acceleration_0_100_positive' }),

  top_speed_kmh: z
    .number({ error: 'validation.vehicle.top_speed_kmh_required' })
    .int({ error: 'validation.vehicle.top_speed_kmh_integer' })
    .positive({ error: 'validation.vehicle.top_speed_kmh_positive' }),

  // ── Commercial & Factory Compliance Metrics ───────────────────────────────
  price_usd: z
    .number({ error: 'validation.vehicle.price_usd_required' })
    .positive({ error: 'validation.vehicle.price_usd_positive' }),

  factory_warranty_years: z
    .number({ error: 'validation.vehicle.factory_warranty_years_required' })
    .int({ error: 'validation.vehicle.factory_warranty_years_integer' })
    .min(1, { error: 'validation.vehicle.factory_warranty_years_min' }),

  stock_count: z
    .number({ error: 'validation.vehicle.stock_count_required' })
    .int({ error: 'validation.vehicle.stock_count_integer' })
    .min(0, { error: 'validation.vehicle.stock_count_non_negative' }),

  // ── Lifecycle Status Enumeration ──────────────────────────────────────────
  status: z.enum(['available', 'reserved', 'allocated'], {
    error: 'validation.vehicle.status_invalid',
  }),
});

// ---------------------------------------------------------------------------
// § 6.1 / 6.3 — chargingStationInputSchema
// Validates incoming form payloads for EV charging station infrastructure
// entries. Latitude/longitude are validated individually for clear per-field
// error feedback before being composed into a GeoJSON Point on the server.
// ---------------------------------------------------------------------------
export const chargingStationInputSchema = z.object({
  // ── Meta Identity Fields ──────────────────────────────────────────────────
  name: z
    .string({ error: 'validation.station.name_required' })
    .min(1, { error: 'validation.station.name_required' }),

  location_description: z
    .string({ error: 'validation.station.location_description_required' })
    .min(1, { error: 'validation.station.location_description_required' }),

  // ── WGS-84 Geospatial Coordinates (validated flat, composed to GeoJSON) ──
  latitude: z
    .number({ error: 'validation.station.latitude_required' })
    .min(-90, { error: 'validation.station.latitude_out_of_range' })
    .max(90, { error: 'validation.station.latitude_out_of_range' }),

  longitude: z
    .number({ error: 'validation.station.longitude_required' })
    .min(-180, { error: 'validation.station.longitude_out_of_range' })
    .max(180, { error: 'validation.station.longitude_out_of_range' }),

  // ── Infrastructure Technical Capabilities ────────────────────────────────
  total_plugs: z
    .number({ error: 'validation.station.total_plugs_required' })
    .int({ error: 'validation.station.total_plugs_integer' })
    .min(1, { error: 'validation.station.total_plugs_min' }),

  power_output_kw: z
    .number({ error: 'validation.station.power_output_kw_required' })
    .int({ error: 'validation.station.power_output_kw_integer' })
    .positive({ error: 'validation.station.power_output_kw_positive' }),

  // ── Operational Status & Access Control ──────────────────────────────────
  status: z.enum(['operational', 'maintenance', 'planned'], {
    error: 'validation.station.status_invalid',
  }),

  access_type: z.enum(['public', 'fleet_only', 'diplomatic'], {
    error: 'validation.station.access_type_invalid',
  }),
});

// ---------------------------------------------------------------------------
// § 6.2 — Compile-Time TypeScript Profiles (inferred from schemas)
// These types are the single source of truth for form payloads.
// They deliberately match (but do not extend) the database interfaces in
// src/types/database.types.ts — structural alignment is enforced by the
// compiler; any schema drift will surface as a type error at call sites.
// ---------------------------------------------------------------------------
export type VehicleInput = z.infer<typeof vehicleInputSchema>;
export type ChargingStationInput = z.infer<typeof chargingStationInputSchema>;
