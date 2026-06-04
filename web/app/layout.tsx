import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CornerIcons from "@/components/CornerIcons";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { THEME_BY_PATH, DEFAULT_THEME } from "./themeMap";

export const metadata: Metadata = {
  title: "Estudio Novena",
  description: "Estudio de grabación musical en Ciudad de México. Reserva una sesión.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Apply per-route theme before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var map = ${JSON.stringify(THEME_BY_PATH)};
            var def = ${JSON.stringify(DEFAULT_THEME)};
            var t = map[location.pathname] || def;
            document.documentElement.dataset.theme = t === 'azul' ? '' : t;
          })();
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory text-dusk">
        <ThemeProvider>
          <Header />
          <CornerIcons />
          <ScrollReveal />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
