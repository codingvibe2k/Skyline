import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skyline - Premium 0 Km Showroom",
  description: "High-performance, type-safe showroom optimized for luxury and diplomatic fleet clients in Bujumbura, Burundi.",
};

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-obsidian text-brand-platinum font-sans">
        <Header lang={lang} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} footer={dict.footer} />
      </body>
    </html>
  );
}
