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
  {
    category: "Micrófonos",
    items: [
      "Soyuz 017 (Tube)", "Soyuz 011 (Tube)", "AEA r88 (Ribbon Stereo)",
      "2x Lauten Atlantis FX 387", "3x Lauten Tom Mics", "5x Shure SM57",
      "Shure SM58 Beta", "Shure Beta 52", "Audio-Technica ATM25",
      "Audio-Technica ATM650", "Sennheiser MD21", "Sennheiser e604 Dynamic Mic",
      "AKG D112 Bass Drum Mic", "ElectroVoice 635a", "Lewitt LCT 140 (x2)",
      "Microtech Gefell MT71", 'AKG "The Tube" Tube Mic',
      "Sony F-96 Dynamic Microphone", "Bumblebee RM-5 Ribbon Mic (x4)",
      "Royer R-122 Ribbon Mic", "RE20 (x3)",
    ],
  },
  {
    category: "Preamplificadores y Convertidores",
    items: [
      "Chandler TG2", "Chandler TG12411 Channel", "Cranborne Camden x8",
      "BAE 1073", "Heritage Britstrip", "Rupert Neve Designs Newton Channel",
      "Yamaha 100 x2", "UAD Apollo Twin", "UAD Apollo x6", "UAD Apollo 16",
      "Audient iD24", "Zoom L-12 Mixer", "Prism Lyra", "RME Babyface Pro",
      "Antelope Audio Orion Studio 12", "Golden Age PRE-73 MKii",
      "Shadow Hills Mono GAMA",
    ],
  },
  {
    category: "Monitores y Monitoreo",
    items: [
      "Neumann KH310A con KH750", "Neumann KH120", "Adam Audio A77H",
      "Adam Audio A7", "AVIOM A-16 con mixers",
    ],
  },
  {
    category: "Amplificadores",
    items: [
      "Silvertone 1484", "Ampeg SVT MicroVR Bass Amplifier Half Stack",
      "Mesa Boogie Bass 400+", "1962 GA-8T Gibson Discoverer Tremolo",
      "Fender Twin Reverb", "Carvin BX micro bass head + Hartke Pro 2200 cabinet",
      "Gibson Discoverer GA-8T",
    ],
  },
  {
    category: "Guitarras",
    items: [
      "Gibson Les Paul 50's Standard (P90)", "Gibson SG Standard",
      "Fender Jazzmaster CIJ 2003", "Orville Les Paul Jr.",
      "Fender Stratocaster HSS", "Fender Telecaster", "Epiphone Texan MIJ 70's",
      "Epiphone 1964 Texan", "Taylor Academy 12e acoustic",
      "SX 8-string lap steel", "Epiphone Casino Fully Hollow Electric",
      "Gretsch G2622 semi-hollow", "Fender Stratocaster",
      "Epiphone Riviera Elite", "Fender Acoustic Nashville Tuning",
    ],
  },
  {
    category: "Bajos",
    items: [
      "Fender Custom Shop P-Bass", "Fender Jazz Bass Fretless",
      "Sandberg California 2 TM4", "Squier Jazz Bass", "Gibson Thunderbird Bass",
    ],
  },
  {
    category: "Batería",
    items: [
      "1960 Ludwig Superclassic set", "2001 TAMA Starclassic Birch/Bubinga MIJ",
      "Unknown Vintage Kit (that sounds bonkers)", "Sonor Canadian Maple Kit",
      "50's Slingerland Radioking Set (upon request)", 'Ludwig 24" Kick',
      "1962 14x5 Ludwig Jazz Festival Snare", "30's 14x8 Slingerland Radioking Snare",
      "Custom Bosphorus Crash and Ride", 'Bosphorus Master Vintage 14" Hi Hat',
      "Zildjian K Hi Hats", "Zildjian A Custom Fast Crash",
    ],
  },
  {
    category: "Sintetizadores y teclados",
    items: [
      "Moog Grandmother (Estudio Solarium)", "Erika Synths Bassline (Estudio Solarium)",
      "Sequential OB6 (Estudio A)", "Korg Microkorg 37 (Estudio A)",
      "Farfisa VIP-600 Dual (Estudio A)", '70s Baldwin Electric Organ "Fun Machine"',
    ],
  },
  {
    category: "Juguetes",
    items: [
      "Roland T-8", "Ableton Push", "Assorted Percussion",
      "Talkbox Rocktron", "Great assortment of guitar pedals",
    ],
  },
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
                className="text-sm tracking-[0.3em] uppercase text-cobalt leading-snug
                           flex items-end min-h-[3.9rem] mb-4 pb-3 border-b border-sand/70"
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
