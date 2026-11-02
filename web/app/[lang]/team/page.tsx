import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";

/**
 * The roster, in page order. `instagram` (handle only) is kept for when
 * per-person links come back; nothing renders it while the page is names only.
 */
const TEAM_DATA: Record<
  string,
  { name: string; role?: string; order: number; instagram?: string }
> = {
  felipe:    { name: "Felipe Castro",   role: "Prod / Mix / Rec",       order: 1, instagram: "felicaster" },
  ale:       { name: "Alejandro Yelin", role: "Prod / Mix / Rec",       order: 2, instagram: "warawaramusica" },
  sebastian: { name: "Sebastián Salom", role: "Partner Santiago de Chile", order: 3 },
  tom:       { name: "Tom Kearney",     role: "Prod / Mix / Rec",       order: 4, instagram: "brokeneveryangle" },
  dan:       { name: "Dan Pliego",      role: "Tech / Drums",           order: 5, instagram: "dan.pliego" },
  ben:       { name: "Ben Bultrini",    role: "Prod / Mix / Rec",       order: 6, instagram: "norbumusic" },
  fabio:     { name: "Fabio Lendrum",   role: "Resident Artist / Prod", order: 7, instagram: "noize_london" },
};

const TEAM_MEMBERS = Object.entries(TEAM_DATA)
  .map(([key, member]) => ({ key, ...member }))
  .sort((a, b) => a.order - b.order);

export default async function Team({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div style={{ backgroundColor: "#E4DAC8" }}>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-[120px] md:pt-24 pb-10">
        <h1
          className="uppercase leading-none text-cobalt text-[clamp(2.5rem,6vw,5.5rem)]
                     opacity-0 animate-fade-up delay-100"
          style={{ fontFamily: "var(--font-highway-exp)", letterSpacing: "-0.02em", animationFillMode: "forwards" }}
        >
          {dict.team.title}
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <ul className="divide-y divide-sand/50 border-y border-sand/50">
          {TEAM_MEMBERS.map(({ key, name, role }, i) => (
            <li
              key={key}
              className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-8"
              data-animate
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className="uppercase leading-tight text-cobalt text-[clamp(1.5rem,3vw,2.4rem)]"
                style={{ fontFamily: "var(--font-highway-exp)", letterSpacing: "-0.02em" }}
              >
                {name}
              </span>
              {role && (
                <span
                  className="text-ash text-sm italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {role}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
