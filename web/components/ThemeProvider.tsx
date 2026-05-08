"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "azul" | "naranja";

interface ThemeCtxValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({ theme: "azul", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("azul");

  useEffect(() => {
    const raw = localStorage.getItem("theme");
    const saved: Theme = raw === "naranja" ? "naranja" : "azul";
    apply(saved);
  }, []);

  function apply(t: Theme) {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.dataset.theme = t === "azul" ? "" : t;
  }

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: apply }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
