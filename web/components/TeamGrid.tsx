"use client";

import { useState } from "react";

export interface TeamMember {
  key: string;
  src: string;
  name: string;
  role: string;
  bio?: string;
  instagram?: string;
}

/**
 * Team photo grid. Tapping a portrait covers it with the member's description
 * rather than expanding beneath it, so the grid never reflows.
 *
 * The toggle is a button sitting over the photo; the panel above it is
 * pointer-events-none so clicks fall through and close it again. Only the
 * Instagram link takes pointer events back, and only while the panel is open —
 * otherwise it would be an invisible target and a stop on the tab order.
 */
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 2 }}>
      {members.map(({ key, src, name, role, bio, instagram }) => {
        const isOpen = open === key;
        const hasPanel = Boolean(bio || instagram);

        return (
          <div key={src}>
            <div className="relative h-[240px] md:h-[340px] lg:h-[420px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />

              {hasPanel && (
                <>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-label={name}
                    className="group absolute inset-0 w-full h-full cursor-pointer"
                  >
                    <span
                      aria-hidden
                      className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center
                                  text-lg leading-none transition-all duration-300 rounded-full
                                  ${isOpen
                                    ? "text-ivory rotate-45"
                                    : "text-ivory/0 group-hover:text-ivory/90 group-hover:bg-cobalt/70"}`}
                      style={{ fontFamily: "var(--font-highway)" }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`absolute inset-0 flex flex-col justify-end pointer-events-none
                                bg-cobalt/80 backdrop-blur-[2px] p-5 md:p-6
                                transition-opacity duration-300 ease-out
                                ${isOpen ? "opacity-100" : "opacity-0"}`}
                  >
                    {bio && (
                      <p
                        className={`text-ivory text-[10px] sm:text-sm leading-relaxed transition-transform duration-300 ease-out
                                    ${isOpen ? "translate-y-0" : "translate-y-2"}`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {bio}
                      </p>
                    )}

                    {instagram && (
                      <a
                        href={`https://www.instagram.com/${instagram}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? 0 : -1}
                        aria-hidden={!isOpen}
                        className={`mt-4 self-start inline-flex items-center gap-2
                                    rounded-full border border-ivory/60 text-ivory
                                    px-4 py-2 text-xs tracking-[0.2em] uppercase
                                    hover:bg-ivory hover:text-cobalt transition-colors
                                    ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                        style={{ fontFamily: "var(--font-highway)" }}
                      >
                        @{instagram}
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="pt-3 pb-8 px-1">
              <p
                className="text-xs tracking-[0.15em] uppercase text-dusk leading-tight"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                {name}
              </p>
              <p
                className="text-xs text-ash mt-1 italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {role}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
