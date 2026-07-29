"use client";

import { useState } from "react";

interface PillarsProps {
  words: string[];
  bodies: string[];
}

/**
 * The three pillars on the home page. Tapping one expands a panel beneath it;
 * only one is open at a time. The panel animates on grid-template-rows so the
 * height is never hard-coded and the copy can be any length.
 */
export default function Pillars({ words, bodies }: PillarsProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand/50">
      {words.map((word, i) => {
        const isOpen = open === i;
        return (
          <div
            key={word}
            className="py-8 sm:py-10 px-0 sm:px-3 lg:px-8 text-center"
            data-animate
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`pillar-panel-${i}`}
              className="group w-full flex flex-col items-center gap-2 cursor-pointer"
            >
              <span
                className={`uppercase leading-tight transition-colors
                            text-2xl sm:text-[clamp(1.05rem,2.8vw,2.375rem)]
                            ${isOpen ? "text-dusk" : "text-cobalt group-hover:text-dusk"}`}
                style={{ fontFamily: "var(--font-highway-exp)" }}
              >
                {word}
              </span>
              <span
                aria-hidden
                className={`block w-4 h-px bg-current transition-all duration-300
                            ${isOpen ? "text-dusk w-8" : "text-sand group-hover:w-8"}`}
              />
            </button>

            <div
              id={`pillar-panel-${i}`}
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={`mx-auto max-w-[34ch] pt-4 text-sm leading-relaxed text-ash
                              transition-opacity duration-300
                              ${isOpen ? "opacity-100" : "opacity-0"}`}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {bodies[i]}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
