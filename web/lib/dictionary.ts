import "server-only";
import { readFileSync } from "fs";
import path from "path";
import { parse } from "yaml";
import type { Locale } from "./locale";

export interface Dict {
  meta: { title: string; description: string };
  nav: {
    home: string;
    gear: string;
    team: string;
    gallery: string;
    artists: string;
    contact: string;
  };
  cta: { bookSession: string };
  home: {
    hero: { subtitle: string };
    about: { body: string };
    pillars: string[];
    marquee: {
      studio: string;
      city: string;
      recording: string;
      independent: string;
      sessions: string;
    };
  };
  team: { eyebrow: string; title: string };
  gear: {
    eyebrow: string;
    title: string;
    categories: Record<string, string>;
  };
  artists: {
    eyebrow: string;
    title: string;
    body: string;
    playlistLabel: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      errorFallback: string;
    };
    sent: { title: string; body: string };
    locationLabel: string;
    emailLabel: string;
  };
  footer: {
    bookLabel: string;
    headingLines: string[];
    followLabel: string;
    locationLabel: string;
    langLabel: string;
  };
}

const cache = new Map<Locale, Dict>();

/** Load and cache the YAML dictionary for a locale. Server-only. */
export function getDictionary(locale: Locale): Dict {
  const cached = cache.get(locale);
  if (cached) return cached;
  const file = path.join(process.cwd(), "dictionaries", `${locale}.yaml`);
  const dict = parse(readFileSync(file, "utf8")) as Dict;
  cache.set(locale, dict);
  return dict;
}
