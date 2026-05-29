"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { themeForPath, type Theme } from "@/app/themeMap";

export type { Theme };

interface ThemeCtxValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: "azul", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Override manual (toggle). Se limpia al cambiar de ruta.
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? themeForPath(pathname);

  useEffect(() => {
    setOverride(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "azul" ? "" : theme;
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setOverride }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
