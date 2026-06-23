import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CornerIcons from "@/components/CornerIcons";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { I18nProvider } from "@/components/I18nProvider";
import { THEME_BY_PATH, DEFAULT_THEME } from "../themeMap";
import { locales, isLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        {/* Apply per-route theme before first paint to avoid flash.
            Strips the /en or /es locale prefix before matching. */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var map = ${JSON.stringify(THEME_BY_PATH)};
            var def = ${JSON.stringify(DEFAULT_THEME)};
            var p = location.pathname.replace(/^\\/(en|es)(?=\\/|$)/, '') || '/';
            var t = map[p] || def;
            document.documentElement.dataset.theme = t === 'azul' ? '' : t;
          })();
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory text-dusk">
        <I18nProvider lang={lang} dict={dict}>
          <ThemeProvider>
            <Header />
            <CornerIcons />
            <ScrollReveal />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
