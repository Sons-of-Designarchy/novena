import { readdirSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import ParallaxTexture from "@/components/ParallaxTexture";
import ParallaxImage from "@/components/ParallaxImage";
import SvgIcon from "@/components/SvgIcon";
import HeroCollage from "@/components/HeroCollage";

function getHeroImages(): string[] {
  const dir = path.join(process.cwd(), "public/hero");
  const imgs = readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => `/hero/${encodeURIComponent(f)}`);
  for (let i = imgs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
  }
  return imgs;
}

const marqueeItems = [
  { type: "text",  value: "Estudio Novena" },
  { type: "icon",  value: "araucana"       },
  { type: "text",  value: "Ciudad de México" },
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
  const heroImages = getHeroImages();

  return (
    <>

      {/* ─────────────────────────────────────────────────
          01  HERO
      ───────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="relative bg-ivory overflow-hidden min-h-svh"
      >
        {/* Halftone texture — subtle bg detail */}
        <ParallaxTexture
          src="/textures/halftone-wide-01.png"
          speed={0.1}
          opacity={0.05}
          blendMode="multiply"
          backgroundSize="600px"
          backgroundRepeat="repeat"
        />

        {/* Image collage — scattered around edges, parallax on mouse */}
        <HeroCollage images={heroImages} />

        {/* Centered content — floats above collage */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">

          <p
            className="text-cobalt tracking-[0.35em] uppercase mb-3
                       opacity-0 animate-fade-up"
            style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards", fontSize: "14px" }}
          >
            Estudio de grabación
          </p>

          <Image
            src="/logos/logo-naranja.png"
            alt="Novena"
            width={557}
            height={214}
            priority
            className="w-auto opacity-0 animate-fade-up delay-100"
            style={{
              height: "clamp(42px, 5.6vw, 90px)",
              animationFillMode: "forwards",
            }}
          />

          <h1
            className="text-display uppercase opacity-0 animate-fade-up delay-100 mt-2"
            style={{
              fontFamily: "var(--font-highway-exp)",
              animationFillMode: "forwards",
              fontSize: "clamp(30px, 3.4vw, 46px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              maxWidth: "14ch",
            }}
          >
            <span style={{ display: "block", letterSpacing: "-0.05em" }}>abrazamos</span>
            tu música
          </h1>

          <Link
            href="/contact"
            className="group mt-4 inline-flex items-center gap-2 rounded-full
                       border border-cobalt text-cobalt
                       px-6 py-2.5 tracking-[0.2em] uppercase
                       hover:bg-cobalt hover:text-ivory transition-colors
                       opacity-0 animate-fade-up delay-300"
            style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards", fontSize: "16px" }}
          >
            Reserva una sesión
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
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
                  className="text-ivory uppercase text-2xl md:text-3xl tracking-[0.12em] leading-none"
                  style={{ fontFamily: "var(--font-highway-exp)" }}
                >
                  {item.value}
                </span>
              )}
              {item.type === "icon" && (
                <SvgIcon name={item.value} className="w-8 h-8 md:w-9 md:h-9 text-ivory" />
              )}
              <span className="ml-8 text-ivory text-xl leading-none">·</span>
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
          src="/textures/grain-01.png"
          speed={0.2}
          opacity={0.06}
          blendMode="multiply"
        />

        <div className="relative z-10 grid md:grid-cols-[1fr_1fr] min-h-[600px] md:min-h-[700px] items-stretch">

          {/* LEFT — heading + body + CTA */}
          <div className="relative isolate overflow-hidden flex flex-col justify-center px-5 md:pl-12 lg:pl-20 py-16 md:py-24 pr-8 md:pr-12" data-animate>

            {/* Pedazo de araucana — esquina sup. derecha de esta columna, B&N, parallax */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 -z-10 w-[130px] md:w-[210px] h-[400px] md:h-[600px] overflow-hidden pointer-events-none"
            >
              <ParallaxImage
                src="/textures/halftone-wide-01.png"
                speed={0.28}
                opacity={0.12}
              />
            </div>

            <h2
              className="uppercase leading-[0.9] tracking-tight text-display mb-8
                         text-[clamp(2.8rem,5vw,4.5rem)]"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              Estudio<br />Novena
            </h2>

            <div
              className="space-y-5 text-ash text-base leading-[1.75] max-w-[44ch] mb-10"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              <p>
                Es un estudio ganador del Grammy y Latin Grammy ubicado en la colonia Narvarte
                de la Ciudad de México. Se ha convertido en un hogar para músicos latinoamericanos
                e internacionales — recibiendo desde artistas emergentes hasta figuras globales —
                todos atraídos por un ambiente acogedor y colaborativo donde la visión artística
                siempre encuentra su lugar.
              </p>
            </div>

            <Link
              href="/contact"
              className="group self-start inline-flex items-center gap-2
                         rounded-full border border-cobalt text-cobalt
                         px-7 py-3 text-sm tracking-[0.2em] uppercase
                         hover:bg-cobalt hover:text-ivory transition-colors"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              Reserva una sesión
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

          </div>

          {/* RIGHT — single photo, bleeds to edge, no padding */}
          <div className="relative overflow-hidden hidden md:block min-h-[600px] h-full">
            <Image
              src="/gallery/novena-equipo.jpg"
              alt="Equipo de Estudio Novena"
              fill
              className="object-cover object-center"
            />
          </div>

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
            src="/gallery/NOVENA-8173.jpg"
            alt="Estudio Novena"
            fill
            className="object-cover object-center"
          />
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
          src="/textures/halftone-trippy-01.jpg"
          speed={0.15}
          opacity={0.06}
          overshoot="-100%"
          backgroundSize="1400px"
          backgroundRepeat="repeat"
          blendMode="multiply"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand/50">
            {["Creación", "Comunidad", "Calidad"].map((word, i) => (
              <div
                key={word}
                className="py-8 sm:py-10 px-0 sm:px-4 md:px-8 text-center"
                data-animate
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p
                  className="text-cobalt text-2xl md:text-3xl uppercase leading-tight"
                  style={{ fontFamily: "var(--font-highway-exp)" }}
                >
                  {word}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


</>
  );
}
