import ParallaxTexture from "@/components/ParallaxTexture";

export const metadata = { title: "Artistas — Estudio Novena" };

export default function Artists() {
  return (
    <div className="relative overflow-hidden">

      <ParallaxTexture
        src="/textures/halftone-06.png"
        speed={0.1}
        opacity={0.06}
        blendMode="multiply"
        backgroundSize="600px"
        backgroundRepeat="repeat"
      />

      <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p
            className="text-sm tracking-[0.3em] uppercase text-ash mb-4
                       opacity-0 animate-fade-up"
            style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
          >
            Con quiénes hemos trabajado
          </p>
          <h1
            className="text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight text-cobalt
                       opacity-0 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-highway-exp)", animationFillMode: "forwards" }}
          >
            Artistas
          </h1>
        </div>

        <div className="grid md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_480px] gap-16 items-start">

          {/* Left copy */}
          <div>
            <p
              className="text-ash text-base leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Una selección de los artistas y proyectos que han grabado, mezclado o
              producido en Estudio Novena. Aquí abajo, una playlist de lo que ha
              salido de nuestras sesiones.
            </p>

            <ul className="border-t border-sand/60">
              {["Charli XCX", "Mon Laferte", "Los Bunkers", "Benjamin Walker", "Cancamusa", "Susana Cala"].map((name) => (
                <li
                  key={name}
                  className="text-cobalt uppercase border-b border-sand/40 py-4"
                  style={{
                    fontFamily: "var(--font-highway-exp)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Spotify — dark card */}
          <div className="bg-cobalt p-1 rounded-2xl overflow-hidden">
            <iframe
              title="Estudio Novena Friends"
              src="https://open.spotify.com/embed/playlist/5ie7WxjIdQ42qlFVFcUt1r?utm_source=generator&theme=0"
              width="100%"
              height="500"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: 0, display: "block" }}
            />
            <div className="px-3 py-3">
              <span
                className="text-sm tracking-[0.25em] uppercase text-ivory"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                Estudio Novena Friends — Lista de reproducción
              </span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
