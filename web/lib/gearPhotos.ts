/**
 * Highlight photos for the gear page, keyed by the same category string used
 * in app/[lang]/equipment/page.tsx's `gear` array.
 *
 * Curated by hand, not a directory scan — public/gear holds some photos with
 * no category (an old export, or a general shot) that were deliberately left
 * out rather than swept in.
 *
 * `NOVENA-6276 monitor.jpg` and `NOVENA-6276 pre amp crop em nice.jpg` are the
 * same source photo (the desk: monitors up top, preamp rack through the
 * middle) reused under two categories with a different `focus` so each crop
 * favors the relevant gear.
 */
export interface GearPhoto {
  src: string;
  focus?: "top" | "center" | "bottom";
}

const GUITAR_PHOTOS: GearPhoto[] = [
  { src: "/gear/guitars.jpg" },
  { src: "/gear/NOVENA-6251 2 1 guitars.jpg" },
  { src: "/gear/NOVENA-8069 2 1 guitars.jpg" },
  { src: "/gear/NOVENA-8177 2 1 guitars.jpg" },
];

export const GEAR_PHOTOS: Record<string, GearPhoto[]> = {
  "Micrófonos": [{ src: "/gear/microphone.jpg" }],

  "Preamplificadores y Convertidores": [
    { src: "/gear/NOVENA-6815 pre amp.jpg" },
    { src: "/gear/NOVENA-6276 pre amp crop em nice.jpg" },
    { src: "/gear/NOVENA-6040 mixer.jpg" },
    { src: "/gear/NOVENA-7706 2 1 mixer.jpg" },
  ],

  "Monitores y Monitoreo": [
    { src: "/gear/NOVENA-6276 monitor.jpg", focus: "top" },
    { src: "/gear/NOVENA-5665 monitores.jpg" },
    { src: "/gear/aviom.jpg" },
  ],

  // Guitarras has no carousel — the same photos already run under Bajos,
  // and showing them twice in adjacent grid cells read as a mistake.
  "Bajos": GUITAR_PHOTOS,

  "Batería": [
    { src: "/gear/NOVENA-8173 2 1 drums.jpg" },
    { src: "/gear/drums.jpg" },
  ],

  "Sintetizadores y teclados": [
    { src: "/gear/synths.jpg" },
    { src: "/gear/NOVENA-6108 synth.jpg" },
    { src: "/gear/NOVENA-7709 2 1 synth.jpg" },
    { src: "/gear/farfisa.jpg" },
    { src: "/gear/NOVENA-6302 keys.jpg" },
    { src: "/gear/NOVENA-6903 2 1 keys.jpg" },
  ],

  "Juguetes": [{ src: "/gear/lmdrum.jpg" }],
};
