import { getDictionary } from "@/lib/get-dictionary";
import HeroBanner from "@/components/home/HeroBanner";
import VehicleShowcase from "@/components/showroom/VehicleShowcase";
import { VehicleWithImages } from "@/types/database.types";

interface PageProps {
  params: Promise<{ lang: string }>;
}
const featuredVehicle: VehicleWithImages = {
  id: "1",
  brand: "BYD",
  model: "Seal",
  trim_level: "Performance",

  battery_capacity_kwh: 82,
  wltp_range_km: 650,
  peak_power_kw: 390,
  acceleration_0_100: 3.8,
  top_speed_kmh: 180,

  price_usd: 42900,

  factory_warranty_years: 8,
  stock_count: 4,

  status: "available",

  created_at: "",
  updated_at: "",

  vehicle_images: [
    {
      id: "img1",
      vehicle_id: "1",
      url: "https://images.unsplash.com/photo-1694027655519-016c93b014e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnlkJTIwY2FyfGVufDB8fDB8fHww",
      display_order: 1,
      alt_text: "BYD Seal",
      created_at: "",
    },
  ],
};

export default async function LanguageHome({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col">
      <HeroBanner lang={lang} dict={dict} />
      <VehicleShowcase
        vehicle={featuredVehicle}
        dictionary={dict}
        lang={lang}
        backgroundImage="/assets/vehicle_BG/BG_VEHICLE.png"
      />
    </main>
  );
}
