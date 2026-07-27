/**
 * Rooms and spaces shown on /studios, in page order.
 *
 * Copy (name, tagline, body, purpose) lives in the dictionaries under
 * `studios.rooms.<id>` and `studios.spaces.<id>` so it can be translated. Only
 * what is identical in both languages lives here: photos and gear.
 *
 * `gear` is carried over from the per-item studio labels that used to sit in
 * the equipment list — the only record of which keys live in which room.
 * Each room takes exactly three photos: the first runs full width, the other
 * two sit side by side beneath it.
 *
 * TODO: photo assignments are a first pass and need confirming against the
 * actual rooms.
 */
export interface Studio {
  id: string;
  images: string[];
  gear: string[];
}

export const STUDIOS: Studio[] = [
  {
    id: "studio-a",
    images: [
      "/gallery/NOVENA-6772.jpg",
      "/gallery/NOVENA-6474.jpg",
      "/gallery/NOVENA-6719.jpg",
    ],
    gear: [
      "Neumann KH310A con KH750",
      "Yamaha U3 Upright Piano",
      "Sequential OB6",
      "Korg Microkorg 37",
      "Farfisa VIP-600 Dual",
    ],
  },
  {
    id: "studio-b",
    images: [
      "/gallery/NOVENA-6457.jpg",
      "/gallery/NOVENA-7767.jpg",
      "/gallery/NOVENA-7085.jpg",
    ],
    gear: ["Adam Audio A7"],
  },
  {
    id: "studio-c",
    images: [
      "/gallery/NOVENA-6020.jpg",
      "/gallery/NOVENA-7709.jpg",
      "/gallery/NOVENA-7706.jpg",
    ],
    gear: ["Adam Audio A77H", "Moog Grandmother", "Erika Synths Bassline"],
  },
];

/** Secondary spaces — not bookable rooms, but part of what you get. */
export interface Space {
  id: string;
  image: string;
}

/**
 * Hidden while the copy and photos are refined — the page skips the whole
 * section when this is empty. Restore by uncommenting; the dictionary entries
 * under `studios.spaces` are still in place.
 */
export const SPACES: Space[] = [
  // { id: "patio", image: "/gallery/NOVENA-7867.jpg" },
  // { id: "apartment", image: "/gallery/NOVENA-8145.jpg" },
];

/** Photos not tied to a specific room — one grid at the foot of the page. */
export const AROUND_THE_STUDIO: string[] = [
  "/gallery/NOVENA-7905.jpg",
  "/gallery/BENJAMIN_F200_0490_2.webp",
  "/gallery/BENJAMIN_F200_0499_18.webp",
  "/gallery/dblack+2024-11-13+133758.311.webp",
  "/gallery/dblack+2024-11-13+140359.223.webp",
  "/gallery/BENJAMIN_F200_0499_23.webp",
  "/gallery/NOVENA-6925.jpg",
  "/gallery/NOVENA-8173.jpg",
  "/gallery/NOVENA-6903.jpg",
];
