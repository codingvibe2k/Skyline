import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/get-dictionary";

interface HeroBannerProps {
  lang: string;
  dict: Dictionary;
}

// Brand partner data — strictly factory-fresh electric brands
const BRAND_PARTNERS = [
  {
    key: "byd",
    logo: "/assets/BYD_LOGO.png",
    alt: "BYD Electric Vehicles",
    description:
      "BYD leads the global electric mobility revolution with blade battery technology, zero-emission engineering, and full factory warranty coverage on every pristine unit.",
    href: "/showroom?brand=BYD",
  },
  {
    key: "mg",
    logo: "/assets/MG_LOGO.png",
    alt: "MG Electric Vehicles",
    description:
      "MG delivers cutting-edge EV innovation, blending British heritage with advanced electric drivetrains — every model sealed with a complete factory certificate.",
    href: "/showroom?brand=MG",
  },
  {
    key: "toyota",
    logo: "/assets/TOYOTA_LOGO.png",
    alt: "Toyota Electric Vehicles",
    description:
      "Toyota pioneers its multi-pathway approach to sustainable mobility, engineering ultra-reliable electric and hybrid systems built for demanding institutional fleets.",
    href: "/showroom?brand=Toyota",
  },
];

export default function HeroBanner({ lang, dict }: HeroBannerProps) {
  return (
    <section className="relative flex flex-col" aria-label="Hero Banner">
      {/* ─── LAYER STACK: Full-Bleed Cinematic Hero ─── */}
      <div className="relative w-full min-h-[92vh] flex items-end overflow-hidden bg-brand-obsidian">
        {/* Layer 0 — Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/heroBG/Hero_BG_with_car.png"
            alt="Factory-pristine BYD electric vehicle at cinematic dusk showcase"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* Layer 1 — Left-Side Gradient Shroud (darkens left for text legibility) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(7,8,7,0.92) 0%, rgba(7,8,7,0.70) 40%, rgba(7,8,7,0.20) 70%, rgba(7,8,7,0.05) 100%)",
          }}
        />

        {/* Layer 2 — Bottom Gradient Shroud (blends into brand-partners section) */}
        <div
          className="absolute bottom-0 left-0 w-full h-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #070807 0%, rgba(7,8,7,0.80) 60%, transparent 100%)",
          }}
        />

        {/* Layer 3 — Foreground Typography & CTA Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20 pt-32">
          <div className="max-w-2xl space-y-6">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-espresso bg-brand-obsidian/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                {dict.hero.badge}
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-display font-serif tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight text-brand-gold">
              Electric. <span className="text-brand-platinum">Elevated.</span>
            </h1>

            {/* Sub-Hero Descriptor */}
            <p className="text-base md:text-lg text-brand-gold font-semibold leading-relaxed max-w-lg">
              {dict.hero.subtitle}
            </p>
            <p className="text-sm md:text-base text-brand-platinum/75 font-serif leading-relaxed max-w-lg">
              {dict.hero.description}
            </p>

            {/* Dual CTA Track */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA — Skyline Crimson fill */}
              <Link
                href={`/${lang}/showroom`}
                id="hero-cta-primary"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-crimson text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-brand-crimson/80 hover:scale-105 active:scale-95 shadow-lg shadow-brand-crimson/30"
              >
                {dict.hero.ctaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Secondary CTA — Champagne Gold outline */}
              <Link
                href={`/${lang}/network`}
                id="hero-cta-secondary"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-brand-gold text-brand-gold text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold/10 hover:scale-105 active:scale-95"
              >
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-brand-gold text-brand-gold text-xs transition-colors group-hover:bg-brand-gold group-hover:text-brand-obsidian">
                  ▶
                </span>
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BRAND PARTNERS SECTION ─── */}
      <div className="relative z-20 bg-brand-obsidian border-t border-brand-espresso">
        {/* Section Heading */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-4 text-center">
          <h2 className="font-display text-base sm:text-xl font-medium font-serif uppercase tracking-[0.35em] text-brand-gold">
            Our Electric Brand Partners
          </h2>
        </div>

        {/* Partner Cards Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BRAND_PARTNERS.map((partner) => (
              <Link
                key={partner.key}
                href={`/${lang}${partner.href}`}
                id={`brand-partner-${partner.key}`}
                className="group flex items-start gap-5 p-6 rounded border border-brand-espresso bg-brand-espresso/20 hover:border-brand-gold/40 hover:bg-brand-espresso/40 transition-all duration-300"
              >
                {/* Brand Logo */}
                <div className="flex-shrink-0 w-24 h-24 relative flex items-center justify-center bg-transparent rounded">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={300}
                    height={100}
                    quality={100}
                    className="object-contain p-1 pointer-events-none scale-300"
                  />
                </div>

                {/* Brand Info */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <p className="text-xs text-brand-platinum/60 leading-relaxed line-clamp-3">
                    {partner.description}
                  </p>
                  <span className="text-xs font-semibold text-brand-gold tracking-wide group-hover:underline underline-offset-2 transition-colors duration-200">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
