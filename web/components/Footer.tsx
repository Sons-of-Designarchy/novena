import Image from "next/image";
import Link from "next/link";
import ParallaxTexture from "./ParallaxTexture";

export default function Footer() {

  return (
    <footer className="bg-cobalt text-ivory relative overflow-hidden border-t border-ivory/10">
      <ParallaxTexture
        src="/textures/halftone-wide-01.png"
        speed={0.45}
        opacity={0.18}
        blendMode="overlay"
        backgroundSize="contain"
        overshoot="-20%"
      />

      {/* ── 3-column grid ─────────────────────────── */}
      <div className="relative z-10 border-b border-ivory/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ivory/10">

            {/* Col 1 — CTA */}
            <div className="py-14 md:py-20 md:pr-12" data-animate>
              <p
                className="text-[9px] tracking-[0.35em] uppercase text-ivory/25 mb-6"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                01 — Reservar
              </p>
              <h2
                className="text-ivory uppercase leading-[0.88] tracking-tight mb-10
                           text-[clamp(2.8rem,4vw,3.8rem)]"
                style={{ fontFamily: "var(--font-highway-exp)" }}
              >
                Listos<br />cuando<br />tú lo estés.
              </h2>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-ivory text-ivory
                           px-7 py-3 text-[10px] tracking-[0.2em] uppercase
                           hover:bg-ivory hover:text-cobalt transition-colors"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                Reserva una sesión
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Col 2 — Follow + Studio */}
            <div className="py-14 md:py-20 md:pl-12 flex flex-col justify-between gap-10">
              <div>
                <p
                  className="text-[9px] tracking-[0.35em] uppercase text-ivory/25 mb-6"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  02 — Síguenos
                </p>
                <a
                  href="https://instagram.com/estudionovena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span
                    className="text-xs uppercase tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-highway)" }}
                  >
                    Instagram
                  </span>
                </a>
              </div>
              <div>
                <p
                  className="text-[9px] tracking-[0.35em] uppercase text-ivory/25 mb-3"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  Estudio
                </p>
                <p
                  className="text-ivory/40 text-xs tracking-[0.15em] uppercase leading-[1.9]"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  Colonia Cuauhtémoc<br />Mexico City, MX
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Giant wordmark ────────────────────────────── */}
      <div className="relative z-10 overflow-hidden border-b border-ivory/8">
        <div
          className="flex w-full px-3 md:px-5 py-4 select-none"
          aria-hidden="true"
        >
          {([
            ["/footer/01.svg", 109],
            ["/footer/02.svg", 123],
            ["/footer/03.svg", 94],
            ["/footer/04.svg", 96],
            ["/footer/05.svg", 109],
            ["/footer/06.svg", 106],
          ] as [string, number][]).map(([src, w]) => (
            <img
              key={src}
              src={src}
              alt=""
              draggable={false}
              style={{
                flex: `${w} 0 0`,
                height: "clamp(6rem,20vw,18rem)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-5 flex items-center justify-between gap-4">
        <Image
          src="/logos/logo-white.png"
          alt="Estudio Novena"
          width={72}
          height={24}
          className="h-4 w-auto opacity-20"
        />
        <p
          className="text-[9px] tracking-[0.2em] uppercase text-ivory/20"
          style={{ fontFamily: "var(--font-highway)" }}
        >
          © {new Date().getFullYear()} Estudio Novena
        </p>
      </div>

    </footer>
  );
}
