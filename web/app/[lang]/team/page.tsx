import { readdirSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";

const TEAM_DATA: Record<string, { name: string; role: string; order: number }> = {
  ben:    { name: "Ben Bultrini",    role: "Studio Manager / Prod / Mix / Rec", order: 1 },
  felipe: { name: "Felipe Castro",   role: "Prod / Mix / Rec",                  order: 2 },
  ale:    { name: "Alejandro Yelin", role: "Prod / Mix / Rec",                  order: 3 },
  tom:    { name: "Tom Kearney",     role: "Prod / Mix / Rec",                  order: 4 },
  fabio:  { name: "Fabio Lendrum",   role: "Resident Artist / Prod",            order: 5 },
  dan:    { name: "Dan Pliego",      role: "Tech / Drums",                      order: 6 },
  rayito: { name: "Yito",            role: "Chief Barking Officer",             order: 7 },
};

function getTeamMembers(): { src: string; name: string; role: string }[] {
  const dir = path.join(process.cwd(), "public/team");
  return readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => {
      const base = f.replace(/\.[^.]+$/, "");
      const key  = (base.match(/^[a-zA-Z]+/)?.[0] ?? base).toLowerCase();
      const data = TEAM_DATA[key] ?? { name: key, role: "", order: 99 };
      return { src: `/team/${encodeURIComponent(f)}`, ...data };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ src, name, role }) => ({ src, name, role }));
}

export default async function Team({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const teamMembers = getTeamMembers();

  return (
    <div style={{ backgroundColor: "#E4DAC8" }}>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <p
          className="text-sm tracking-[0.35em] uppercase text-ash mb-4
                     opacity-0 animate-fade-up"
          style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
        >
          {dict.team.eyebrow}
        </p>
        <h1
          className="uppercase leading-none text-cobalt text-[clamp(2.5rem,6vw,5.5rem)]
                     opacity-0 animate-fade-up delay-100"
          style={{ fontFamily: "var(--font-highway-exp)", letterSpacing: "-0.02em", animationFillMode: "forwards" }}
        >
          {dict.team.title}
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
