import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";

const gear: { category: string; items: string[] }[] = [
  {
    category: "Micrófonos",
    items: [
      "AKG C414 XLII (x2)", "AKG D112", "Audix D6 (x2)", "Austrian Audio CC8 (x2)",
      "DPA 4055", "Earthworks DM20 Gen2", "Lauten Audio Snare Mic",
      "Lauten Audio Tom Mic (x3)", "Neumann KM184 (x2)", "Neumann KM185",
      "Neumann U67", "Royer R-10", "Sennheiser E602-II", "Sennheisser MD421-II",
      "Shure Beta 52A", "Shure Beta 91A", "Shure Beta 98AMP (x3)", "Shure SM57 (x3)",
      "Stam Audio SA-47 a tubo", "Stam Audio SA-47F MK3", "Stam Audio SA-87i",
    ],
  },
  {
    category: "Outboard",
    items: [
      "AMS Neve 8816 Summing Mixer", "Bettermaker Mastering Limiter",
      "Bettermaker Passive EQ Valve", "DBX 166A", "ELI Distressor EL8X (x2)",
      "SPL Big", "SPL Transient Designer (x4)", "SSL Fusion", "SSL Ultraviolet",
      "Stam Audio GBUS", "Stam Audio SA-609+", "Tube-Tech PE1C",
    ],
  },
  {
    category: "Preamplificadores",
    items: [
      "AMS Neve 1073lb (x2)", "API 3124v (x3)", "Avalon 737sp", "Chandler TG2",
      "Grace Design M501", "SPL Golden Mike Mk2", "Stam Audio SA-312 (x5)",
    ],
  },
  {
    category: "Baterías",
    items: [
      "Gretsch Broadkaster 24x18 20x16 10x7 12x8 16x16",
      "Gretsch USA Custom 18x14 12x8 14x14",
      "Ludwig Legacy Mahogany 20x14 12x8 14x14",
      "Ludwig Superclassic 28x14 (70s)",
      "Yamaha Maple Custom Absolute: 20x16 18x14 10x7 12x8 14x14",
    ],
  },
  {
    category: "Cajas",
    items: [
      "Gretsch USA Custom 14x5,5", "Gretsch USA Custom Bell Brass 14x6,5",
      "Ludwig Acrolite Vintage 14x5 (60s)", "Ludwig All Around 14x5 (20s)",
      "Ludwig Black Beauty 14x5", "Ludwig Supraphonic Supersensitive 14x5 (60s)",
      "Noble and Cooley Cast Aluminium 14x4,75", "Pearl Omar Hakim 13x5",
      "Slingerland Radioking 14x8 (40s)", "Yamaha Steel 14x",
    ],
  },
  {
    category: "Platillos",
    items: [
      "Istanbul Agop 30th Anniversary 14 Hi-Hat",
      "Istanbul Agop 30th Anniversary 26 Ride",
      "Istanbul Agop OM Signature 15 Hi-Hat", "Paiste Traditionals 18 Thin Crash",
      "Zildjian K Istanbul 16 Hi-Hat", "Zildjian K Istanbul 18 Ride",
      "Zildjian K Istanbul 22 Ride",
    ],
  },
  {
    category: "Guitarras y Bajos",
    items: [
      "Fender Stratocaster AVRI '62", 'Gibson Les Paul "Jessica"',
      "Yamaha FG-251 (60s)", "Fender Jazz Bass American Fretless",
      "Fender Precision American Vintage 58",
    ],
  },
  {
    category: "Amplificadores",
    items: [
      "Mesa Boogie Lone Star Special", "Mesa Boogie Subway D-800+", "VOX AC30 TBX",
    ],
  },
  {
    category: "Sintetizadores & Controladores",
    items: [
      "Arturia Keylab 61 MK3", "Dave Smith Mopho SE", "Oberheim Matrix 1000",
      "Novation",
    ],
  },
  {
    category: "Monitoreo y Convertidores",
    items: [
      "Neumann KH310A con KH750", "Controlador Grace Design M905",
      "Behringer P16HQ (x3)", "Apogee Symphony MK2 32x32",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: `${dict.scl.title} — Estudio Novena` };
}

export default async function Santiago({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-[136px] pb-16 md:py-24">

      <div className="mb-10 md:mb-14">
        <p
          className="text-sm tracking-[0.3em] uppercase text-ash mb-4"
          style={{ fontFamily: "var(--font-highway)" }}
        >
          {dict.scl.eyebrow}
        </p>
        <h1
          className="text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight text-cobalt"
          style={{ fontFamily: "var(--font-highway-exp)" }}
        >
          {dict.scl.title}
        </h1>
      </div>

      <div className="mb-14 md:mb-20">
        <p
          className="text-sm tracking-[0.3em] uppercase text-ash mb-2"
          style={{ fontFamily: "var(--font-highway)" }}
        >
          {dict.scl.locationLabel}
        </p>
        <p
          className="text-dusk text-lg"
          style={{ fontFamily: "var(--font-highway-exp)" }}
        >
          {dict.scl.location}
        </p>
      </div>

      <div className="mb-8 md:mb-10">
        <p
          className="text-sm tracking-[0.3em] uppercase text-ash mb-4"
          style={{ fontFamily: "var(--font-highway)" }}
        >
          {dict.gear.eyebrow}
        </p>
        <h2
          className="text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none tracking-tight text-cobalt"
          style={{ fontFamily: "var(--font-highway-exp)" }}
        >
          {dict.gear.title}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {gear.map((section) => (
          <div key={section.category}>
            <h3
              className="text-sm tracking-[0.3em] uppercase text-cobalt leading-snug
                         mb-4 pb-3 border-b border-sand/70"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              {dict.gear.categories[section.category] ?? section.category}
            </h3>
            <ul className="space-y-[6px]">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="text-ash text-sm flex items-start gap-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <span className="text-sand mt-[3px] shrink-0 text-xs">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  );
}
