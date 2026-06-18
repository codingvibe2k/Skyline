import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Battery, Gauge, Timer, Zap } from "lucide-react";

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

const BRAND_LOGOS: Record<string, string> = {
  BYD: "/assets/BYD_LOGO.png",
  MG: "/assets/MG_LOGO.png",
  Toyota: "/assets/TOYOTA_LOGO.png",
};

export default function VehicleShowcase({
  vehicle,
  dictionary,
  lang,
  reversed = false,
  backgroundImage = "/assets/vehicle_BG/BG_VEHICLE.png",
}: VehicleShowcaseProps) {
  const image =
    vehicle.vehicle_images?.[0]?.url ?? "/images/vehicle-placeholder.webp";

  const brandLogo = BRAND_LOGOS[vehicle.brand] ?? BRAND_LOGOS.BYD;

  const formatter = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const specs = [
    {
      icon: Zap,
      label: dictionary.showroom.range,
      value: `${vehicle.wltp_range_km} km`,
    },
    {
      icon: Gauge,
      label: dictionary.showroom.power,
      value: `${vehicle.peak_power_kw} kW`,
    },
    {
      icon: Timer,
      label: dictionary.showroom.acceleration,
      value: `${vehicle.acceleration_0_100}s`,
    },
    {
      icon: Battery,
      label: dictionary.showroom.battery,
      value: `${vehicle.battery_capacity_kwh} kWh`,
    },
  ];

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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          priority
          src={backgroundImage}
          alt=""
          className="
            object-cover
            opacity-30
          "
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/75" />

      {/* Ambient Gold Glow */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-[radial-gradient(circle_at_75%_40%,rgba(225,196,153,0.14),transparent_45%)]
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
                  mb-6
                  text-xs
                  uppercase
                  tracking-[0.45em]
                  text-brand-gold
                "
              >
                Featured Vehicle
              </p>

              {/* Brand Logo */}
              <div
                className="
                  relative
                  mb-8
                  h-16
                  w-48
                "
              >
                <Image
                  fill
                  src={brandLogo}
                  alt={vehicle.brand}
                  className="
                    object-contain
                    object-left
                  "
                />
              </div>

              <h2
                className="
                  font-serif
                  text-5xl
                  text-brand-gold
                  md:text-6xl
                "
              >
                {vehicle.model}
              </h2>

              {vehicle.trim_level && (
                <p
                  className="
                    mt-4
                    text-xl
                    text-brand-platinum/70
                  "
                >
                  {vehicle.trim_level}
                </p>
              )}
            </div>

            {/* Premium Spec Cards */}
            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >
              {specs.map((spec) => {
                const Icon = spec.icon;

                return (
                  <div
                    key={spec.label}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-brand-gold/15
                      bg-brand-obsidian/60
                      p-5
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      hover:border-brand-gold/40
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                        bg-[radial-gradient(circle_at_top_right,rgba(225,196,153,0.12),transparent_55%)]
                      "
                    />

                    <div className="relative z-10">
                      <Icon
                        size={22}
                        className="
                          mb-4
                          text-brand-gold
                        "
                      />

                      <p
                        className="
                          text-[11px]
                          uppercase
                          tracking-[0.25em]
                          text-brand-platinum/50
                        "
                      >
                        {spec.label}
                      </p>

                      <p
                        className="
                          mt-2
                          text-2xl
                          font-medium
                          text-brand-platinum
                        "
                      >
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price */}
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

            {/* CTA */}
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

          {/* Vehicle */}
          <div
            className="
              relative
              z-20
              lg:translate-y-24
            "
          >
            <div
              className="
                relative
                aspect-[16/10]
                scale-[1.35]
              "
            >
              {/* Vehicle Glow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-brand-gold/10
                  blur-3xl
                "
              />

              <Image
                fill
                priority
                src={image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="
                  object-contain
                  drop-shadow-[0_50px_100px_rgba(0,0,0,0.85)]
                "
              />

              {/* Edge Fade */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_center,transparent_45%,rgba(7,8,7,0.9)_100%)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
