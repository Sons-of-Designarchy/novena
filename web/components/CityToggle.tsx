"use client";

import { usePathname, useRouter } from "next/navigation";
import { stripLocale } from "@/lib/locale";
import { useI18n } from "./I18nProvider";

type City = "cdmx" | "scl";

const LABELS: Record<string, Record<City, string>> = {
  en: { cdmx: "Mexico City", scl: "Santiago de Chile" },
  es: { cdmx: "Ciudad de México", scl: "Santiago de Chile" },
};

const SIZE = {
  compact: "text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em]",
  tagline: "text-sm tracking-[0.15em]",
  hero: "text-[clamp(15px,2vw,18px)] tracking-[0.40em]",
};

const COLOR = {
  ash: "text-ash",
  // Theme-reactive accent — resolves to whatever color the current page's
  // theme maps to (see [data-theme] in globals.css), not necessarily blue.
  cobalt: "text-cobalt",
  // Fixed blue (--color-cobalt's azul-theme value), for use on pages whose
  // own theme isn't blue but should still show this badge in blue.
  blue: "text-[#1A3FA3]",
};

const ALIGN = {
  center: "items-center justify-center",
  start: "items-start sm:items-center justify-start",
};

/**
 * CDMX/SCL switch. Navigates to the site root for CDMX, or /scl for
 * Santiago. Mirrors LangToggle's pill styling.
 *
 * `uppercase` is applied directly on each <button> (not just the wrapping
 * group) because Tailwind's preflight resets `text-transform` on form
 * controls, so it won't inherit from an ancestor.
 */
export default function CityToggle({
  className = "",
  size = "compact",
  color = "ash",
  bold = false,
  align = "center",
}: {
  className?: string;
  size?: keyof typeof SIZE;
  color?: keyof typeof COLOR;
  bold?: boolean;
  align?: keyof typeof ALIGN;
}) {
  const { href, lang } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const labels = LABELS[lang] ?? LABELS.en;

  const active: City = stripLocale(pathname).startsWith("/scl") ? "scl" : "cdmx";

  const goTo = (city: City) => {
    if (city === active) return;
    router.push(city === "scl" ? href("/scl") : href("/"));
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-1 sm:gap-2
                  ${SIZE[size]} ${COLOR[color]} ${bold ? "font-bold" : ""} ${ALIGN[align]} ${className}`}
      style={{ fontFamily: "var(--font-highway)" }}
      role="group"
      aria-label="City"
    >
      {(["cdmx", "scl"] as City[]).map((c, i) => (
        <span key={c} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="hidden sm:inline opacity-30">/</span>}
          <button
            type="button"
            onClick={() => goTo(c)}
            aria-pressed={active === c}
            className={`uppercase whitespace-nowrap transition-opacity ${
              active === c ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            {labels[c]}
          </button>
        </span>
      ))}
    </div>
  );
}
