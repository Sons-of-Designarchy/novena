import { readdirSync } from "fs";
import path from "path";

export const metadata = { title: "The Amigos — Estudio Novena" };

const TEAM_DATA: Record<string, { name: string; role: string; order: number }> = {
  ben:    { name: "Ben Bultrini",    role: "Studio Manager",             order: 1 },
  felipe: { name: "Felipe Castro",   role: "Prod / Mix / Rec",           order: 2 },
  alex:   { name: "Alejandro Yelin", role: "Prod / Eng / Comp",          order: 3 },
  tom:    { name: "Tom Kearney",     role: "Prod / Eng",                 order: 4 },
  flavio: { name: "Fabio Lendrum",   role: "Prod / Comp / Vibe-curator", order: 5 },
  dan:    { name: "Dan Pliego",      role: "Tech / Drums",               order: 6 },
  rayito: { name: "Rayito",          role: "El Emperador",               order: 7 },
};

function getTeamMembers(): { src: string; name: string; role: string }[] {
  const dir = path.join(process.cwd(), "public/team");
  return readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => {
      const base = f.replace(/\.[^.]+$/, "");
      const key  = base.split("-")[0].toLowerCase();
      const data = TEAM_DATA[key] ?? { name: key, role: "", order: 99 };
      return { src: `/team/${encodeURIComponent(f)}`, ...data };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ src, name, role }) => ({ src, name, role }));
}

export default function Team() {
  const teamMembers = getTeamMembers();

  return (
    <div style={{ backgroundColor: "#E4DAC8" }}>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <p
          className="text-sm tracking-[0.35em] uppercase text-ash mb-4
                     opacity-0 animate-fade-up"
          style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
        >
          Con quíen trabajamos
        </p>
        <h1
          className="uppercase leading-none text-cobalt text-[clamp(2.5rem,6vw,5.5rem)]
                     opacity-0 animate-fade-up delay-100"
          style={{ fontFamily: "var(--font-highway-exp)", letterSpacing: "-0.02em", animationFillMode: "forwards" }}
        >
          The Amigos
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 2 }}>
          {teamMembers.map(({ src, name, role }) => (
            <div key={src}>
              <div className="h-[240px] md:h-[340px] lg:h-[420px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
              </div>
              <div className="pt-3 pb-8 px-1">
                <p
                  className="text-xs tracking-[0.15em] uppercase text-dusk leading-tight"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {name}
                </p>
                <p
                  className="text-xs text-ash mt-1 italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
