import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/locale";

function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  // First language tag, e.g. "es-MX,es;q=0.9,en;q=0.8" -> "es"
  const preferred = header.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return locales.includes(preferred as (typeof locales)[number])
    ? preferred
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals, the API, and files with an
  // extension (favicon.ico, /logos/*.png, /textures/*, etc.).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
