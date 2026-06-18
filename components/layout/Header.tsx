"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

interface HeaderProps {
  lang: string;
  nav: {
    showroom: string;
    network: string;
    fleet: string;
    diplomatic: string;
  };
}

export default function Header({ lang, nav }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const locales = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "sw", label: "SW" },
    { code: "rn", label: "RN" },
  ];

  const currentLocale = locales.find((l) => l.code === lang) || locales[0];

  // Scroll-aware header transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      const firstSegment = segments[1];
      const validLocales = ["en", "fr", "sw", "rn"];
      if (validLocales.includes(firstSegment)) {
        segments[1] = newLang;
      } else {
        segments.splice(1, 0, newLang);
      }
    }
    const newPathname = segments.join("/");
    const query = searchParams?.toString();
    const newUrl = `${newPathname}${query ? `?${query}` : ""}`;

    setIsLangDropdownOpen(false);
    router.push(newUrl);
  };

  const navItems = [
    { label: "Home", href: `/${lang}` },
    { label: nav.showroom, href: `/${lang}/showroom` },
    { label: "Services", href: `/${lang}/network` },
    { label: "About Us", href: `/${lang}/diplomatic` },
    { label: "Contact", href: `/${lang}/fleet` },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === `/${lang}`) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-brand-obsidian/95 backdrop-blur-md border-b border-brand-espresso shadow-xl shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Identification */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href={`/${lang}`}
              id="header-logo"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300"
              aria-label="Skyline Motors — Premium 0 Km Showroom"
            >
              <div className="relative w-20 h-20">
                <Image
                  src="/assets/SKYLINE_LOGO.png"
                  alt="Skyline Motors Logo"
                  width={150}
                  height={150}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-display font-extrabold tracking-wider text-brand-platinum hover:text-brand-gold transition-colors duration-300">
                Skyline <span className="text-brand-gold">Motors</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center space-x-6"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    active
                      ? "text-brand-gold"
                      : "text-brand-platinum/80 hover:text-brand-gold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right — Lang Switcher + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-brand-espresso bg-brand-obsidian/70 text-sm font-semibold tracking-wider text-brand-platinum hover:border-brand-gold transition-all duration-300"
                aria-label="Select language"
                aria-expanded={isLangDropdownOpen}
              >
                <Globe className="w-4 h-4 text-brand-gold" />
                <span>{currentLocale.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-brand-platinum/50 transition-transform duration-300 ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 rounded border border-brand-espresso bg-brand-obsidian py-1 shadow-2xl z-50">
                    {locales.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => handleLanguageChange(locale.code)}
                        className={`w-full text-left px-4 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 ${
                          lang === locale.code
                            ? "text-brand-gold bg-brand-espresso/45"
                            : "text-brand-platinum/70 hover:text-brand-gold hover:bg-brand-espresso/30"
                        }`}
                      >
                        {locale.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Book a Test Drive CTA */}
            <Link
              href={`/${lang}/fleet`}
              id="header-cta-book"
              className="px-5 py-2 rounded-full border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold hover:text-brand-obsidian hover:shadow-lg hover:shadow-brand-gold/20 active:scale-95"
            >
              Book a Test Drive
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Compact inline language selector */}
            <div className="flex items-center space-x-1 border border-brand-espresso rounded px-1 py-0.5 bg-brand-obsidian/70">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLanguageChange(locale.code)}
                  className={`px-1.5 py-0.5 text-xs font-bold rounded transition-colors duration-200 ${
                    lang === locale.code
                      ? "bg-brand-crimson text-white"
                      : "text-brand-platinum/50 hover:text-brand-gold"
                  }`}
                >
                  {locale.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded text-brand-platinum/80 hover:text-brand-gold focus:outline-none transition-colors duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 z-40 bg-brand-obsidian/97 backdrop-blur-md border-b border-brand-espresso">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded text-base font-semibold tracking-wide uppercase transition-colors duration-200 ${
                    active
                      ? "bg-brand-espresso/40 text-brand-gold border-l-2 border-brand-gold"
                      : "text-brand-platinum/80 hover:bg-brand-espresso/20 hover:text-brand-gold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Book CTA */}
            <Link
              href={`/${lang}/fleet`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 mx-4 text-center px-5 py-3 rounded-full border border-brand-gold text-brand-gold text-sm font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-obsidian transition-all duration-300"
            >
              Book a Test Drive
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
