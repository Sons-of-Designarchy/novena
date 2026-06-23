"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, stripLocale, type Locale } from "@/lib/locale";
import { useI18n } from "./I18nProvider";

const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };

/**
 * EN/ES switch. Swaps the locale segment of the current path and navigates,
 * preserving the page the user is on. Used in the nav and footer.
 */
export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === lang) return;
    const rest = stripLocale(pathname);
    router.push(`/${next}${rest === "/" ? "" : rest}`);
  };

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase ${className}`}
      style={{ fontFamily: "var(--font-highway)" }}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={lang === l}
            className={`transition-opacity ${
              lang === l ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            {LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
