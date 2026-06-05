import { readdirSync } from "fs";
import path from "path";
import GearSlider from "@/components/GearSlider";

export const metadata = { title: "Gear — Estudio Novena" };

function getGearImages(): string[] {
  const dir = path.join(process.cwd(), "public/gear");
  return readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => `/gear/${encodeURIComponent(f)}`);
}

const gear: { category: string; items: string[] }[] = [
  { category: "Computadora", items: ["Mac Studio M1"] },
  {
    category: "Micrófonos",
    items: [
      "Soyuz 017 (Tube)", "Soyuz 011 (Tube)", "AEA r88 (Ribbon Stereo)",
      "4× Shure SM57", "Shure SM58 Beta", "Shure Beta 52",
      "Audio-Technica ATM25", "Sennheiser MD21", "ElectroVoice 635a",
    ],
  },
  { category: "Amplificadores", items: ["Silvertone 1484", "Mesa Boogie Bass 400+"] },
  { category: "DAW",   items: ["Pro Tools", "Logic Pro", "Ableton"] },
  {
    category: "Guitarras",
    items: [
      "Gibson Les Paul 50's Standard (P90)", "Gibson SG Standard",
      "Fender Jazzmaster CIJ 2003", "Orville Les Paul Jr.",
      "Fender Mustang Bass", "Fender Telecaster", "Epiphone Texan MIJ 70's",
    ],
  },
  {
    category: "Sintetizadores",
    items: ["Moog Grandmother", "Mellotron", "Roland Juno 6", "Roland Juno 106"],
  },
  {
    category: "Preamplificadores",
    items: [
      "Chandler TG2 (2 ch)", "Cranborne Camden (8 ch)", "BAE 1073",
      "Overstayer Modular Channel (Stereo)", "Yamaha 100 II", "UAD Apollo",
    ],
  },
  {
    category: "Batería",
    items: [
      "1960 Ludwig Superclassic set", "50's Slingerland Radioking set",
      "1962 14×5 Ludwig Jazz Festival Snare", "30's 14×8 Slingerland Radioking Snare",
    ],
  },
  { category: "Piano", items: ["Hoffman"] },
];

export default function Equipment() {
  const gearImages = getGearImages();
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">

        <div className="mb-14 md:mb-20" data-animate>
          <p
            className="text-sm tracking-[0.3em] uppercase text-ash mb-4
                       opacity-0 animate-fade-up"
            style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
          >
            Con qué trabajamos
          </p>
          <h1
            className="text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight text-cobalt
                       opacity-0 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-highway-exp)", animationFillMode: "forwards" }}
          >
            Gear
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {gear.map((section) => (
            <div key={section.category}>
              <h2
                className="text-sm tracking-[0.3em] uppercase text-cobalt mb-4 pb-3 border-b border-sand/70"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                {section.category}
              </h2>
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

      {gearImages.length > 0 && (
        <GearSlider images={gearImages} />
      )}
    </div>
  );
}
