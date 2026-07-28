/**
 * Rooms and spaces shown on /studios, in page order.
 *
 * Copy (name, tagline, purpose) lives in the dictionaries under
 * `studios.rooms.<id>` and `studios.spaces.<id>` so it can be translated. Only
 * what is identical in both languages lives here: photos and gear.
 *
 * `gear` is carried over from the per-item studio labels that used to sit in
 * the equipment list — the only record of which keys live in which room.
 *
 * Each room takes three photos: the first runs full width, the other two sit
 * side by side beneath it. A room with no photos renders as text only.
 *
 * Deliberately unused: everything under `BENJAMIN_*` is the former location,
 * and NOVENA-7085 / NOVENA-6457 were ruled out by hand.
 *
 * `AROUND_THE_STUDIO` draws from public/gallery/around-the-studio, a folder
 * dedicated to this grid — not a leftovers bin.
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
      "/gallery/NOVENA-6719.jpg",
      "/gallery/NOVENA-8173.jpg", // live room
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
      "/gallery/studio-b/NOVENA-5677.jpg",
      "/gallery/studio-b/NOVENA-5726.jpg",
      "/gallery/studio-b/NOVENA-5781.jpg",
    ],
    gear: ["Adam Audio A7"],
  },
  {
    id: "studio-c",
    images: [
      "/gallery/NOVENA-6020.jpg",
      "/gallery/NOVENA-7709.jpg",
      "/gallery/NOVENA-7767.jpg",
    ],
    gear: ["Adam Audio A77H", "Moog Grandmother", "Erika Synths Bassline"],
  },
];

/**
 * Secondary spaces — not bookable rooms, just part of what you get. Text
 * only, no photos, until real ones exist for each.
 */
export interface Space {
  id: string;
}

export const SPACES: Space[] = [
  { id: "patio" },
  { id: "apartment" },
  { id: "kitchen" },
];

/** Photos not tied to a specific room — one grid at the foot of the page. */
export const AROUND_THE_STUDIO: string[] = [
  "/gallery/around-the-studio/NOVENA-5633.jpg",
  "/gallery/around-the-studio/NOVENA-5749.jpg",
  "/gallery/around-the-studio/NOVENA-5937.jpg",
  "/gallery/around-the-studio/NOVENA-6302.jpg",
  "/gallery/around-the-studio/NOVENA-6344.jpg",
  "/gallery/around-the-studio/NOVENA-6387.jpg",
  "/gallery/around-the-studio/NOVENA-6498.jpg",
  "/gallery/around-the-studio/NOVENA-6581.jpg",
  "/gallery/around-the-studio/NOVENA-7079.jpg",
  "/gallery/around-the-studio/NOVENA-8164.jpg",
  "/gallery/around-the-studio/NOVENA-8171.jpg",
];
