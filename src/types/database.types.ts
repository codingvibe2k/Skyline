// =============================================================================
// Database Type Definitions — Premium "0 Km" Showroom Platform
// Strictly maps the Supabase relational schema for:
//   • vehicles & vehicle_images (showroom inventory)
//   • charging_stations          (GIS geolocation infrastructure)
// All types model pristine, factory-fresh, brand-new inventory exclusively.
// NO references to: mileage | odometer | used | pre-owned | wear_and_tear
// =============================================================================

// ---------------------------------------------------------------------------
// Vehicle inventory lifecycle states
// ---------------------------------------------------------------------------
export type VehicleStatus = 'available' | 'reserved' | 'allocated';

// ---------------------------------------------------------------------------
// VehicleImage — Ordered CDN media asset linked to a vehicle entry
// ---------------------------------------------------------------------------
export interface VehicleImage {
  id: string;
  vehicle_id: string;
  url: string;
  display_order: number;
  alt_text: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Vehicle — Core catalog entity for a pristine, factory-delivered unit
// ---------------------------------------------------------------------------
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  trim_level: string | null;

  // Electric Powertrain Spec Matrix
  battery_capacity_kwh: number;
  wltp_range_km: number;
  peak_power_kw: number;
  acceleration_0_100: number;
  top_speed_kmh: number;

  // Inventory Control & Factory Compliance
  price_usd: number;
  factory_warranty_years: number;
  stock_count: number;
  status: VehicleStatus;

  // Audit Timestamps
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// VehicleWithImages — Vehicle joined with its ordered image gallery.
// Use when rendering carousel sliders or full specification deep-dive pages.
// Example query shape: vehicles left join vehicle_images on vehicle_id
// ---------------------------------------------------------------------------
export type VehicleWithImages = Vehicle & {
  vehicle_images: VehicleImage[];
};

// ---------------------------------------------------------------------------
// Supabase Database shape — wire this into your createClient generic param
// ---------------------------------------------------------------------------
export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: Vehicle;
        Insert: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Vehicle, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Omit<Vehicle, 'id' | 'created_at'>>;
      };
      vehicle_images: {
        Row: VehicleImage;
        Insert: Omit<VehicleImage, 'id' | 'created_at'> &
          Partial<Pick<VehicleImage, 'id' | 'created_at'>>;
        Update: Partial<Omit<VehicleImage, 'id' | 'created_at'>>;
      };
      charging_stations: {
        Row: ChargingStation;
        Insert: Omit<ChargingStation, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<ChargingStation, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Omit<ChargingStation, 'id' | 'created_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      charging_stations_in_bounds: {
        Args: ChargingStationsInBoundsArgs;
        Returns: ChargingStation[];
      };
    };
    Enums: {
      vehicle_status: VehicleStatus;
      charging_station_status: ChargingStationStatus;
      charging_station_access_type: ChargingStationAccessType;
    };
  };
}

// ---------------------------------------------------------------------------
// GeoJSON — Minimal point geometry as returned by PostGIS geography columns
// Maps to the PostGIS GEOGRAPHY(POINT, 4326) column type.
// Compatible with react-map-gl / Mapbox GL JS GeoJSON source bindings.
// ---------------------------------------------------------------------------
export interface GeoJsonPoint {
  type: 'Point';
  /** [longitude, latitude] — WGS-84 coordinate order */
  coordinates: [longitude: number, latitude: number];
}

// ---------------------------------------------------------------------------
// ChargingStation lifecycle / access states
// ---------------------------------------------------------------------------
export type ChargingStationStatus = 'operational' | 'maintenance' | 'planned';
export type ChargingStationAccessType = 'public' | 'fleet_only' | 'diplomatic';

// ---------------------------------------------------------------------------
// ChargingStation — Core geospatial entity for EV charging infrastructure
// Reflects the public.charging_stations table with PostGIS coordinate field.
// ---------------------------------------------------------------------------
export interface ChargingStation {
  id: string;
  name: string;

  // Geographic Positioning
  /** Descriptive landmark reference, e.g. "Rohero I, near Blvd de l'Uprona" */
  location_description: string | null;
  /**
   * PostGIS GEOGRAPHY(POINT, 4326) column.
   * Supabase serialises this as a GeoJSON Point object when queried via the
   * REST API — bind directly to a react-map-gl <Marker> or GeoJSON source.
   */
  coordinates: GeoJsonPoint;

  // Technical Capabilities
  /** Total number of operational plug ports. Always > 0. */
  total_plugs: number;
  /** Power capacity in kilowatts, e.g. 50 for DC fast, 150 for ultra-fast. */
  power_output_kw: number | null;
  status: ChargingStationStatus;
  access_type: ChargingStationAccessType;

  // Audit Timestamps
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// ChargingStationWithDistance — Optionally augmented by a spatial proximity query
// ---------------------------------------------------------------------------
export type ChargingStationWithDistance = ChargingStation & {
  /** Distance in metres from the query origin point (if computed server-side) */
  distance_m?: number;
};

// ---------------------------------------------------------------------------
// RPC — charging_stations_in_bounds args
// Matches the PostgreSQL function signature exactly:
//   charging_stations_in_bounds(min_lat, min_long, max_lat, max_long)
// ---------------------------------------------------------------------------
export interface ChargingStationsInBoundsArgs {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
}


