/**
 * Photos for the gallery at the top of the gear page (GearGallery),
 * grouped by the category string used in app/[lang]/equipment/page.tsx.
 *
 * Curated by hand, not a directory scan — public/gear holds some photos with
 * no category (an old export, or a general shot) that were deliberately left
 * out rather than swept in.
 */
export interface GearPhoto {
  src: string;
  focus?: "top" | "center" | "bottom";
}

const GUITAR_PHOTOS: GearPhoto[] = [
  { src: "/gear/guitars.jpg" },
  { src: "/gear/NOVENA-8069 2 1 guitars.jpg" },
  { src: "/gear/NOVENA-8177 2 1 guitars.jpg" },
];

export const GEAR_PHOTOS: Record<string, GearPhoto[]> = {
  "Micrófonos": [{ src: "/gear/microphone.jpg" }],

  "Preamplificadores y Convertidores": [
    { src: "/gear/NOVENA-6815 pre amp.jpg" },
    { src: "/gear/NOVENA-6276 pre amp crop em nice.jpg" },
    { src: "/gear/NOVENA-6040 mixer.jpg" },
  ],

  "Monitores y Monitoreo": [
    { src: "/gear/NOVENA-5665 monitores.jpg" },
    { src: "/gear/aviom.jpg" },
  ],

  // Guitars and basses share one set of photos, listed once under Bajos.
  "Bajos": GUITAR_PHOTOS,

  "Batería": [
    { src: "/gear/NOVENA-8173 2 1 drums.jpg" },
    { src: "/gear/drums.jpg" },
  ],

  "Sintetizadores y teclados": [
    { src: "/gear/synths.jpg" },
    { src: "/gear/NOVENA-6302 keys.jpg" },
    { src: "/gear/NOVENA-6903 2 1 keys.jpg" },
  ],

  "Juguetes": [{ src: "/gear/lmdrum.jpg" }],
};
