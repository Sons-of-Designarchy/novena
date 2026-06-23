// Pure locale helpers — safe to import from both client and server.

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Strip a leading `/en` or `/es` segment, returning the locale-agnostic path. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/.*|$)/);
  if (match && isLocale(match[1])) {
    return match[2] || "/";
  }
  return pathname;
}

/** Read the locale from a pathname, falling back to the default. */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) ? seg : defaultLocale;
}

/**
 * Prefix an internal href with a locale. External links (http, mailto, tel,
 * #anchors) are returned untouched.
 */
export function withLocale(href: string, lang: Locale): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href === "/") return `/${lang}`;
  return `/${lang}${href.startsWith("/") ? "" : "/"}${href}`;
}
