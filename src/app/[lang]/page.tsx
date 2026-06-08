import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LanguageHome({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-brand-obsidian text-brand-platinum font-sans">
      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-brand-espresso bg-brand-obsidian">
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-brand-gold">{dict.hero.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-brand-platinum leading-tight">
          Skyline <span className="text-brand-crimson">{dict.hero.title}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-brand-gold font-medium tracking-wide">
          {dict.hero.subtitle}
        </p>
        
        <p className="text-md md:text-lg text-brand-platinum/70 max-w-xl mx-auto leading-relaxed">
          {dict.hero.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {["en", "fr", "sw", "rn"].map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={`px-4 py-2 rounded text-sm font-semibold tracking-wider uppercase transition-colors duration-200 border ${
                lang === locale
                  ? "bg-brand-crimson border-brand-crimson text-white"
                  : "bg-transparent border-brand-espresso text-brand-platinum hover:border-brand-gold"
              }`}
            >
              {locale}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

