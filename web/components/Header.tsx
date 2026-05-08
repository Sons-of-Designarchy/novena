"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const leftLinks  = [
  { href: "/gallery",   label: "Galería"  },
  { href: "/equipment", label: "Equipo"   },
];
const rightLinks = [
  { href: "/artists",   label: "Artistas" },
  { href: "/contact",   label: "Contacto" },
];

const LOGOS: Record<string, string> = {
  azul:    "/logos/logo-azul.png",
  naranja: "/logos/logo-naranja.png",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const linkClass = (href: string) =>
    `text-[10px] tracking-[0.18em] uppercase transition-colors whitespace-nowrap
     ${pathname === href ? "text-dusk" : "text-dusk/45 hover:text-dusk"}`;

  return (
    <>
      {/* ── Floating pill nav ───────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center w-full max-w-2xl
                     rounded-[8px] border border-sand/50
                     px-6 h-12
                     shadow-[0_2px_24px_rgba(26,26,24,0.06)]"
          style={{
            background: "color-mix(in srgb, var(--color-ivory) 72%, transparent)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Left links — desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {leftLinks.map(l => (
              <Link key={l.href} href={l.href}
                className={linkClass(l.href)}
                style={{ fontFamily: "var(--font-highway)" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex-1 md:flex-none flex justify-start md:justify-center md:mx-8">
            <Link href="/">
              <Image
                src={LOGOS[theme] ?? LOGOS.azul}
                alt="Estudio Novena"
                width={110}
                height={38}
                className="h-6 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right links — desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {rightLinks.map(l => (
              <Link key={l.href} href={l.href}
                className={linkClass(l.href)}
                style={{ fontFamily: "var(--font-highway)" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden text-dusk/50 hover:text-dusk transition-colors ml-auto"
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile dropdown — also pill-styled */}
      {open && (
        <div className="fixed top-[72px] left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <div
            className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-sand/50
                       px-6 py-5 flex flex-col gap-4
                       shadow-[0_4px_32px_rgba(26,26,24,0.08)]"
            style={{
              background: "color-mix(in srgb, var(--color-ivory) 92%, transparent)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {[...leftLinks, ...rightLinks].map(l => (
              <Link key={l.href} href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm tracking-[0.15em] uppercase transition-colors
                  ${pathname === l.href ? "text-dusk" : "text-dusk/45"}`}
                style={{ fontFamily: "var(--font-highway)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </>
  );
}
