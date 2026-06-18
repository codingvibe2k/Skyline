"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Globe,
  Zap,
  BatteryCharging,
  RefreshCw,
  Lock,
  ArrowUp,
  Send,
} from "lucide-react";

import { FaYoutube as Youtube, FaFacebook as Facebook, FaInstagram as Instagram, FaLinkedin as Linkedin } from "react-icons/fa";

/* ─────────────────────────── Types ──────────────────────────── */
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface TrustItem {
  icon: string;
  title: string;
  desc: string;
}

interface FooterProps {
  lang: string;
  footer: {
    tagline: string;
    columns: {
      corporate: FooterColumn;
      diplomatic: FooterColumn;
      sustainability: FooterColumn;
      legal: FooterColumn;
    };
    trust: TrustItem[];
    badges: TrustItem[];
    newsletter: {
      heading: string;
      desc: string;
      placeholder: string;
      ariaLabel: string;
    };
    social: {
      facebook: string;
      instagram: string;
      linkedin: string;
      youtube: string;
    };
    bottom: {
      copyright: string;
      privacy: string;
      terms: string;
      cookies: string;
      sitemap: string;
      backToTop: string;
    };
  };
}

/* ─────────────────── Icon resolver ──────────────────────────── */
function TrustIcon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? "w-7 h-7";
  switch (name) {
    case "shield":
      return <ShieldCheck className={cls} />;
    case "user":
      return <User className={cls} />;
    case "globe":
      return <Globe className={cls} />;
    case "zap":
      return <Zap className={cls} />;
    case "charging":
      return <BatteryCharging className={cls} />;
    case "refresh":
      return <RefreshCw className={cls} />;
    case "lock":
      return <Lock className={cls} />;
    default:
      return <ShieldCheck className={cls} />;
  }
}

/* ──────────────────── Sub-components ───────────────────────── */
function TrustPillars({ items }: { items: TrustItem[] }) {
  return (
    <div className="border-b border-brand-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-espresso">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 px-6 py-4 first:pl-0 last:pr-0 group"
            >
              <div className="flex-shrink-0 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                <TrustIcon name={item.icon} className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-platinum leading-tight">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-brand-platinum/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavColumn({ col, lang }: { col: FooterColumn; lang: string }) {
  return (
    <div>
      <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-5">
        {col.heading}
      </h3>
      <ul className="space-y-3">
        {col.links.map((link) => (
          <li key={link.label}>
            <Link
              href={`/${lang}${link.href}`}
              className="text-sm text-brand-platinum/55 hover:text-brand-gold focus:text-brand-crimson transition-colors duration-200 leading-snug"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterBox({
  data,
}: {
  data: FooterProps["footer"]["newsletter"];
}) {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-5">
        {data.heading}
      </h3>
      <p className="text-sm text-brand-platinum/55 leading-relaxed mb-5">
        {data.desc}
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center border border-brand-espresso rounded overflow-hidden focus-within:border-brand-gold transition-colors duration-200"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={data.placeholder}
          aria-label={data.ariaLabel}
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-brand-platinum placeholder:text-brand-platinum/30 outline-none"
        />
        <button
          type="submit"
          aria-label={data.ariaLabel}
          className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold/80 active:bg-brand-crimson text-brand-obsidian transition-colors duration-200 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function SocialLinks({ social }: { social: FooterProps["footer"]["social"] }) {
  const links = [
    { label: social.facebook, href: "#", Icon: Facebook },
    { label: social.instagram, href: "#", Icon: Instagram },
    { label: social.linkedin, href: "#", Icon: Linkedin },
    { label: social.youtube, href: "#", Icon: Youtube },
  ];

  return (
    <div className="flex items-center gap-3 mt-8">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="w-9 h-9 rounded-full border border-brand-espresso flex items-center justify-center text-brand-platinum/50 hover:text-brand-gold hover:border-brand-gold transition-all duration-200"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

function WarrantyBadges({ items }: { items: TrustItem[] }) {
  return (
    <div className="border-t border-b border-brand-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-espresso">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 px-6 py-3 ${i === 0 ? "pl-0" : ""} ${i === items.length - 1 ? "pr-0" : ""} group`}
            >
              <div className="flex-shrink-0 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                <TrustIcon name={item.icon} className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-platinum leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-brand-platinum/50 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Main Footer Component ─────────────────── */
export default function Footer({ lang, footer }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    footer.columns.corporate,
    footer.columns.diplomatic,
    footer.columns.sustainability,
    footer.columns.legal,
  ];

  return (
    <footer className="bg-brand-obsidian border-t border-brand-espresso mt-auto">
      {/* ── Trust Pillars Strip ── */}
      <TrustPillars items={footer.trust} />

      {/* ── Main Grid: Logo + 4 Nav Columns + Newsletter ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr_1fr_1fr_260px] gap-10 xl:gap-14">
          {/* Brand identity column */}
          <div className="lg:col-span-1">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 group"
              aria-label="Skyline Motors"
            >
              {/* Geometric S-shield logo */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 transition-opacity duration-200 group-hover:opacity-80"
                aria-hidden="true"
              >
                <polygon
                  points="20,2 36,10 36,30 20,38 4,30 4,10"
                  fill="none"
                  stroke="#E1C499"
                  strokeWidth="1.5"
                />
                <text
                  x="20"
                  y="26"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#E1C499"
                  fontFamily="sans-serif"
                >
                  S
                </text>
              </svg>
              <div className="leading-none">
                <span className="block text-lg font-display font-extrabold tracking-widest text-brand-platinum group-hover:text-brand-gold transition-colors duration-200">
                  SKYLINE
                </span>
                <span className="block text-[0.6rem] tracking-[0.3em] text-brand-platinum/40 uppercase">
                  MOTORS
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm text-brand-platinum/50 leading-relaxed max-w-[200px]">
              {footer.tagline}
            </p>

            <SocialLinks social={footer.social} />
          </div>

          {/* 4 Navigation Columns */}
          {columns.map((col) => (
            <NavColumn key={col.heading} col={col} lang={lang} />
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <NewsletterBox data={footer.newsletter} />
          </div>
        </div>
      </div>

      {/* ── Warranty / Assurance Badges Strip ── */}
      <WarrantyBadges items={footer.badges} />

      {/* ── Bottom Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-brand-platinum/40 text-center sm:text-left">
            {footer.bottom.copyright}
          </p>

          {/* Legal links + back-to-top */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { label: footer.bottom.privacy, href: `/${lang}/fleet` },
              { label: footer.bottom.terms, href: `/${lang}/fleet` },
              { label: footer.bottom.cookies, href: `/${lang}/fleet` },
              { label: footer.bottom.sitemap, href: `/${lang}/fleet` },
            ].map(({ label, href }) => (
              <React.Fragment key={label}>
                <Link
                  href={href}
                  className="text-xs text-brand-platinum/40 hover:text-brand-gold transition-colors duration-200"
                >
                  {label}
                </Link>
                <span className="text-brand-espresso last:hidden">|</span>
              </React.Fragment>
            ))}

            <button
              onClick={scrollToTop}
              aria-label={footer.bottom.backToTop}
              className="w-7 h-7 rounded-full border border-brand-espresso flex items-center justify-center text-brand-platinum/40 hover:text-brand-gold hover:border-brand-gold transition-all duration-200 ml-2"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
