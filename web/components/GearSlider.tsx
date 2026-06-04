"use client";

import { useRef, useEffect, useCallback } from "react";

const HEIGHT = 480;
const SPEED  = 0.6; // px per frame

export default function GearSlider({ images }: { images: string[] }) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef(0);
  const paused    = useRef(false);
  const drag      = useRef({ active: false, startX: 0, scrollLeft: 0 });

  // Auto-scroll loop — resets to 0 when halfway (seamless loop via duplicated images)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tick = () => {
      if (!paused.current && el) {
        el.scrollLeft += SPEED;
        // Seamless loop: when we've scrolled past the first set, jump back
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    paused.current = true;
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  }, []);

  const stopDrag = useCallback(() => {
    drag.current.active = false;
    paused.current = false;
    const el = trackRef.current;
    if (el) el.style.cursor = "grab";
  }, []);

  // Duplicate images for seamless infinite loop
  const doubled = [...images, ...images];

  return (
    <div
      ref={trackRef}
      className="flex overflow-x-auto"
      style={{
        height: HEIGHT,
        cursor: "grab",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        lineHeight: 0,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseEnter={() => { paused.current = true; }}
    >
      {doubled.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          draggable={false}
          style={{
            height: HEIGHT,
            width: "auto",
            display: "block",
            flexShrink: 0,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
