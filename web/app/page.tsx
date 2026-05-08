import Image from "next/image";
import Link from "next/link";
import ParallaxTexture from "@/components/ParallaxTexture";
import HalftoneImage from "@/components/HalftoneImage";
import SvgIcon from "@/components/SvgIcon";

const marqueeItems = [
  { type: "text",  value: "Estudio Novena" },
  { type: "icon",  value: "araucana"       },
  { type: "text",  value: "Mexico City"    },
  { type: "icon",  value: "sun"            },
  { type: "icon",  value: "cactus"         },
  { type: "text",  value: "Grabación"       },
  { type: "icon",  value: "pepper"         },
  { type: "text",  value: "Independiente"  },
  { type: "icon",  value: "flower"         },
  { type: "icon",  value: "piramid"        },
  { type: "text",  value: "Estudio Novena" },
  { type: "icon",  value: "fork"           },
  { type: "text",  value: "Sesiones"        },
  { type: "icon",  value: "yito"           },
] as const;

export default function Home() {
  return (
    <>

      {/* ─────────────────────────────────────────────────
          01  HERO — card with rounded corners
      ───────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative pt-5 px-5 pb-5 bg-ivory"
      >
        {/* Rounded card */}
        <div
          className="relative overflow-hidden bg-ivory"
          style={{
            height: "calc(94svh - 40px)",
            minHeight: "520px",
            borderRadius: "16px",
            boxShadow: "0 4px 48px rgba(26,26,24,0.10), 0 1px 0px rgba(26,26,24,0.06)",
          }}
        >
          <ParallaxTexture
            src="/textures/halftone-wide-01.png"
            speed={0.45}
            opacity={0.14}
            blendMode="multiply"
            backgroundSize="contain"
            overshoot="-20%"
          />

          {/* Centered content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-20">

            <p
              className="text-cobalt/40 text-[9px] tracking-[0.4em] uppercase mb-8
                         opacity-0 animate-fade-up"
              style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
            >
              Estudio de grabación · Ciudad de México
            </p>

            <h1
              className="text-cobalt uppercase leading-[0.88] tracking-tight
                         text-[48px] max-w-[20ch]
                         opacity-0 animate-fade-up delay-100"
              style={{ fontFamily: "var(--font-highway-exp)", animationFillMode: "forwards" }}
            >
              El espacio donde abrazamos tu música
            </h1>

            <p
              className="mt-7 text-dusk/45 italic text-[clamp(1rem,1.6vw,1.25rem)]
                         opacity-0 animate-fade-up delay-200"
              style={{ fontFamily: "var(--font-serif)", animationFillMode: "forwards" }}
            >
              De LATAM para el mundo
            </p>

            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full
                         border border-cobalt text-cobalt
                         px-7 py-3 text-[10px] tracking-[0.2em] uppercase
                         hover:bg-cobalt hover:text-ivory transition-colors
                         opacity-0 animate-fade-up delay-300"
              style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
            >
              Reserva una sesión
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <p
            className="absolute bottom-6 left-6 md:left-10 z-10
                       text-dusk/25 text-[9px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-highway)" }}
          >
            Estudio · Mexico City
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          02  MARQUEE
      ───────────────────────────────────────────────── */}
      <div className="bg-cobalt overflow-hidden py-5">
        <div className="flex items-center animate-marquee-left w-max gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              {item.type === "text" && (
                <span
                  className="text-ivory/70 uppercase text-2xl md:text-3xl tracking-[0.12em] leading-none"
                  style={{ fontFamily: "var(--font-highway-exp)" }}
                >
                  {item.value}
                </span>
              )}
              {item.type === "icon" && (
                <SvgIcon name={item.value} className="w-8 h-8 md:w-9 md:h-9 text-ivory opacity-60" />
              )}
              <span className="ml-8 text-ivory/20 text-xl leading-none">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────
          03  EDITORIAL — 2-col: content left, photo right bleeds
      ───────────────────────────────────────────────── */}
      <section
        id="about"
        data-section="about"
        className="relative overflow-hidden"
      >
        <ParallaxTexture
          src="/textures/halftone-02.png"
          speed={0.45}
          opacity={0.14}
          blendMode="multiply"
        />

        <div className="relative z-10 grid md:grid-cols-[1fr_1fr] min-h-[600px] md:min-h-[700px] items-stretch">

          {/* LEFT — heading + body + CTA */}
          <div className="flex flex-col justify-center px-5 md:pl-12 lg:pl-20 py-16 md:py-24 pr-8 md:pr-12" data-animate>

            <p
              className="text-[9px] tracking-[0.35em] uppercase text-dusk/30 mb-5"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              01 — El Estudio
            </p>

            <h2
              className="uppercase leading-[0.9] tracking-tight text-cobalt mb-8
                         text-[clamp(2.8rem,5vw,4.5rem)]"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              El estudio<br />detrás<br />del sonido
            </h2>

            <div
              className="space-y-5 text-dusk/60 leading-[1.75] max-w-[44ch] mb-10"
              style={{ fontFamily: "var(--font-highway)", fontSize: "clamp(0.9rem,1.3vw,1rem)" }}
            >
              <p>
                Un estudio de grabación independiente en la Colonia Cuauhtémoc, Ciudad de México —
                construido para músicos que quieren trabajar con total libertad creativa.
                Sin presión de reloj, sin ambiente corporativo.
              </p>
              <p>
                El nombre hace referencia a los nueve días de preparación que preceden algo
                significativo. Cada sesión es un compromiso enfocado e intencional con el trabajo.
              </p>
              <p>
                Hemos trabajado con artistas de México, Chile y más allá — desde actos emergentes
                hasta nombres reconocidos internacionalmente, grabando desde folk íntimo hasta
                rock psicodélico expansivo.
              </p>
            </div>

            <Link
              href="/contact"
              className="group self-start inline-flex items-center gap-2
                         rounded-full border border-cobalt text-cobalt
                         px-7 py-3 text-[10px] tracking-[0.2em] uppercase
                         hover:bg-cobalt hover:text-ivory transition-colors"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              Reserva una sesión
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

          </div>

          {/* RIGHT — single photo, bleeds to edge, no padding */}
          <HalftoneImage
            src="/gallery/BENJAMIN_F200_0490_2.webp"
            alt="Session at Estudio Novena"
            fill
            containerClassName="hidden md:block min-h-[600px] h-full"
            className="object-cover object-center"
          />

        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          04  FULL-BLEED PHOTO — texture02 split landscape
      ───────────────────────────────────────────────── */}
      <section
        data-section="photo"
        data-theme="dark"
        className="relative overflow-hidden"
        style={{ height: "min(80vw, 900px)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/gallery/dblack+2024-11-13+133758.311.webp"
            alt="Estudio Novena"
            fill
            className="object-cover object-center"
            style={{ filter: "contrast(1.32) brightness(0.9) sepia(0.29) saturate(0.8)" }}
          />
          <div className="halftone-dots" />
        </div>
        {/* Landscape split texture — screen blend adds a color-field effect */}
        <ParallaxTexture
          src="/textures/grain-01.png"
          speed={0.55}
          opacity={0.22}
          blendMode="screen"
        />
      </section>

      {/* ─────────────────────────────────────────────────
          05  PILLARS — texture04 landscape on ivory
      ───────────────────────────────────────────────── */}
      <section
        data-section="pillars"
        className="relative overflow-hidden border-y border-sand/50"
      >
        <ParallaxTexture
          src="/textures/grain-02.png"
          speed={0.4}
          opacity={0.12}
          blendMode="multiply"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand/50">
            {[
              { label: "Ubicación",  value: "Mexico City"   },
              { label: "Fundado",    value: "Independiente" },
              { label: "Disciplina", value: "Grabación"     },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className="py-6 sm:py-8 px-0 sm:px-4 md:px-8 sm:first:pl-0 sm:last:pr-0"
                data-animate
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p
                  className="text-[8px] tracking-[0.3em] uppercase text-dusk/25 mb-2"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {label}
                </p>
                <p
                  className="text-cobalt text-base md:text-lg uppercase leading-tight"
                  style={{ fontFamily: "var(--font-highway-exp)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


</>
  );
}
