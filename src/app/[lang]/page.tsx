import { getDictionary } from '@/lib/get-dictionary';
import HeroBanner from '@/components/home/HeroBanner';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LanguageHome({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col">
      <HeroBanner lang={lang} dict={dict} />
    </main>
  );
}
