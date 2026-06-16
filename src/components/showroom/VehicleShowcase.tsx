import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { VehicleWithImages } from "@/types/database.types";

interface VehicleShowcaseProps {
  vehicle: VehicleWithImages;

  dictionary: {
    showroom: {
      exploreVehicle: string;
      startingFrom: string;
      range: string;
      power: string;
      acceleration: string;
      battery: string;
    };
  };

  lang: string;

  reversed?: boolean;

  backgroundImage?: string;
}

export default function VehicleShowcase({
  vehicle,
  dictionary,
  lang,
  reversed = false,
  backgroundImage = "/assets/vehicle_BG/BG_VEHICLE.png",
}: VehicleShowcaseProps) {
  const image =
    vehicle.vehicle_images[0]?.url ?? "/images/vehicle-placeholder.webp";

  const formatter = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-brand-gold/10
        bg-brand-obsidian
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          priority
          src={backgroundImage}
          alt=""
          className="
            object-cover
            opacity-25
          "
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-gradient-to-r
          from-brand-obsidian
          via-brand-obsidian/90
          to-brand-obsidian
        "
      />

      {/* Gold Ambient Light */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-[radial-gradient(circle_at_80%_30%,rgba(225,196,153,0.12),transparent_40%)]
        "
      />

      <div
        className="
          relative
          z-30
          mx-auto
          max-w-7xl
          px-6
          py-28
        "
      >
        <div
          className={`
            grid
            items-center
            gap-16
            lg:grid-cols-2
            ${reversed ? "lg:[&>*:first-child]:order-2" : ""}
          `}
        >
          {/* Content */}
          <div className="space-y-10">
            <div>
              <p
                className="
                  mb-4
                  text-xs
                  uppercase
                  tracking-[0.4em]
                  text-brand-gold
                "
              >
                Featured Vehicle
              </p>

              <h2
                className="
                  font-display
                  text-5xl
                  font-bold
                  text-brand-platinum
                  md:text-7xl
                "
              >
                {vehicle.brand}
              </h2>

              <h3
                className="
                  mt-2
                  font-serif
                  text-4xl
                  text-brand-gold
                  md:text-5xl
                "
              >
                {vehicle.model}
              </h3>

              {vehicle.trim_level && (
                <p
                  className="
                    mt-4
                    text-lg
                    text-brand-platinum/70
                  "
                >
                  {vehicle.trim_level}
                </p>
              )}
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-x-10
                gap-y-8
              "
            >
              <div>
                <p className="text-sm text-brand-platinum/50">
                  {dictionary.showroom.range}
                </p>

                <p className="mt-1 text-2xl text-brand-platinum">
                  {vehicle.wltp_range_km} km
                </p>
              </div>

              <div>
                <p className="text-sm text-brand-platinum/50">
                  {dictionary.showroom.power}
                </p>

                <p className="mt-1 text-2xl text-brand-platinum">
                  {vehicle.peak_power_kw} kW
                </p>
              </div>

              <div>
                <p className="text-sm text-brand-platinum/50">
                  {dictionary.showroom.acceleration}
                </p>

                <p className="mt-1 text-2xl text-brand-platinum">
                  {vehicle.acceleration_0_100}s
                </p>
              </div>

              <div>
                <p className="text-sm text-brand-platinum/50">
                  {dictionary.showroom.battery}
                </p>

                <p className="mt-1 text-2xl text-brand-platinum">
                  {vehicle.battery_capacity_kwh} kWh
                </p>
              </div>
            </div>

            <div>
              <p className="text-brand-platinum/50">
                {dictionary.showroom.startingFrom}
              </p>

              <p
                className="
                  mt-3
                  font-display
                  text-5xl
                  text-brand-gold
                  md:text-6xl
                "
              >
                {formatter.format(vehicle.price_usd)}
              </p>
            </div>

            <Link
              href={`/${lang}/vehicles/${vehicle.id}`}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-brand-gold
                px-8
                py-4
                text-brand-gold
                transition-all
                duration-300
                hover:bg-brand-gold
                hover:text-brand-obsidian
              "
            >
              {dictionary.showroom.exploreVehicle}

              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Vehicle Image */}
          <div
            className="
              relative
              z-20
              lg:translate-y-14
            "
          >
            <div
              className="
                relative
                aspect-[16/10]
                scale-110
              "
            >
              <Image
                fill
                priority
                src={image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="
                  object-contain
                  drop-shadow-[0_40px_80px_rgba(0,0,0,0.75)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
