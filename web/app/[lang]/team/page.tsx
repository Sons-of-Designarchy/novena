import { readdirSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";
import TeamGrid from "@/components/TeamGrid";

/** `instagram` is the handle only — the component builds the URL. */
const TEAM_DATA: Record<
  string,
  { name: string; role: string; order: number; instagram?: string }
> = {
  ben:    { name: "Ben Bultrini",    role: "Studio Manager / Prod / Mix / Rec", order: 1, instagram: "norbumusic" },
  felipe: { name: "Felipe Castro",   role: "Prod / Mix / Rec",                  order: 2, instagram: "felicaster" },
  ale:    { name: "Alejandro Yelin", role: "Prod / Mix / Rec",                  order: 3, instagram: "warawaramusica" },
  tom:    { name: "Tom Kearney",     role: "Prod / Mix / Rec",                  order: 4, instagram: "brokeneveryangle" },
  fabio:  { name: "Fabio Lendrum",   role: "Resident Artist / Prod",            order: 5, instagram: "noize_london" },
  dan:    { name: "Dan Pliego",      role: "Tech / Drums",                      order: 6, instagram: "dan.pliego" },
  rayito: { name: "Yito",            role: "Chief Barking Officer",             order: 7 },
};

function getTeamMembers(): {
  key: string; src: string; name: string; role: string; instagram?: string;
}[] {
  const dir = path.join(process.cwd(), "public/team");
  return readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => {
      const base = f.replace(/\.[^.]+$/, "");
      const key  = (base.match(/^[a-zA-Z]+/)?.[0] ?? base).toLowerCase();
      const data = TEAM_DATA[key] ?? { name: key, role: "", order: 99 };
      return { key, src: `/team/${encodeURIComponent(f)}`, ...data };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ key, src, name, role, instagram }) => ({ key, src, name, role, instagram }));
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
        <TeamGrid
          members={teamMembers.map((m) => ({ ...m, bio: dict.team.bios?.[m.key] }))}
        />
      </div>
    </div>
  );
}
