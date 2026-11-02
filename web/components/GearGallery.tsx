"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GEAR_PHOTOS } from "@/lib/gearPhotos";

const FOCUS_CLASS = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

const seen = new Set<string>();
const PHOTOS = Object.values(GEAR_PHOTOS)
  .flat()
  .filter((p) => !seen.has(p.src) && seen.add(p.src));

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center " +
  "text-ivory bg-dusk/50 hover:bg-dusk/80 transition-colors text-xl";

/** Scrollable strip of every gear photo; click one to open it full size. */
export default function GearGallery() {
  const strip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scrollStrip = (dir: 1 | -1) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const current = open === null ? null : PHOTOS[open];

  return (
    <>
      <div className="relative">
        <div
          ref={strip}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory px-5 md:px-8
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1} of ${PHOTOS.length}`}
              className="relative h-48 md:h-72 aspect-[4/3] shrink-0 snap-start overflow-hidden
                         bg-sand/20 cursor-zoom-in"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                draggable={false}
                sizes="(min-width: 768px) 384px, 256px"
                className={`object-cover ${photo.focus ? FOCUS_CLASS[photo.focus] : ""}`}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => scrollStrip(-1)} aria-label="Scroll left"
                className={`${arrowClass} left-2 md:left-4`}>‹</button>
        <button type="button" onClick={() => scrollStrip(1)} aria-label="Scroll right"
                className={`${arrowClass} right-2 md:right-4`}>›</button>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[100] bg-dusk/90 flex items-center justify-center p-4 md:p-12"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button type="button" onClick={() => setOpen(null)} aria-label="Close"
                  className={`${arrowClass} !top-4 md:!top-6 right-4 md:right-6 !translate-y-0`}>×</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous photo" className={`${arrowClass} left-2 md:left-6`}>‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next photo" className={`${arrowClass} right-2 md:right-6`}>›</button>
        </div>
      )}
    </>
  );
}
