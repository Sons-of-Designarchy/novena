"use client";

import { useTheme, type Theme } from "./ThemeProvider";

const themes: { id: Theme; label: string }[] = [
  { id: "azul",    label: "Azul"    },
  { id: "naranja", label: "Naranja" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-px
                 rounded-full border border-dusk/20 overflow-hidden
                 shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
      style={{ fontFamily: "var(--font-highway)", backdropFilter: "blur(12px)" }}
    >
      {themes.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`px-4 py-2 text-[9px] tracking-[0.2em] uppercase transition-colors ${
            theme === id
              ? "bg-cobalt text-ivory"
              : "bg-ivory/80 text-dusk/40 hover:text-dusk/70"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
