"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/locale";
import type { Dict } from "@/lib/dictionary";

interface I18nValue {
  lang: Locale;
  dict: Dict;
  /** Prefix an internal href with the active locale. */
  href: (path: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dict;
  children: React.ReactNode;
}) {
  const value: I18nValue = {
    lang,
    dict,
    href: (path: string) => withLocale(path, lang),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
