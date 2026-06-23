"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Slot {
  top: string;
  left: string;
  w: number;
  depth: number;
  rotate: number;
  hideBelow?: number; // hide on viewports narrower than this (px)
}

const SLOTS: Slot[] = [
  // ── Top-left cluster ──
  { top:  "3%", left:  "1%",  w: 183, depth: 0.35, rotate: -1.2 },
  { top:  "1%", left: "13%",  w: 148, depth: 0.55, rotate:  0.8, hideBelow: 640 },
  // ── Top-center-left ── (kept on mobile to fill the top-center gap)
  { top:  "2%", left: "25%",  w: 172, depth: 0.25, rotate: -0.4 },
  // ── Top-right cluster ──
  { top:  "3%", left: "62%",  w: 137, depth: 0.50, rotate:  1.0 },
  { top:  "0%", left: "73%",  w: 188, depth: 0.65, rotate: -0.8 },
  { top:  "4%", left: "87%",  w: 144, depth: 0.40, rotate:  0.5 },
  // ── Left side ──
  { top: "32%", left: "-1%",  w: 169, depth: 0.70, rotate: -1.0 },
  { top: "57%", left:  "3%",  w: 144, depth: 0.45, rotate:  0.7 },
  // ── Left-center fill ──
  { top: "24%", left: "17%",  w: 150, depth: 0.38, rotate:  1.1, hideBelow: 1024 },
  { top: "46%", left: "14%",  w: 140, depth: 0.52, rotate: -1.0, hideBelow: 1024 },
  { top: "38%", left: "29%",  w: 120, depth: 0.28, rotate:  0.7, hideBelow: 1280 },
  // ── Right side ──
  { top: "28%", left: "80%",  w: 186, depth: 0.60, rotate: -0.5 },
  { top: "56%", left: "85%",  w: 158, depth: 0.38, rotate:  1.2 },
  { top: "42%", left: "67%",  w: 138, depth: 0.50, rotate:  1.0, hideBelow: 1024 },
  { top: "61%", left: "70%",  w: 124, depth: 0.32, rotate: -0.9, hideBelow: 1280 },
  // ── Bottom row ──
  { top: "78%", left:  "2%",  w: 174, depth: 0.65, rotate:  1.0 },
  { top: "80%", left: "18%",  w: 135, depth: 0.48, rotate: -0.8, hideBelow: 640 },
  { top: "76%", left: "33%",  w: 158, depth: 0.28, rotate:  0.5 },
  { top: "74%", left: "54%",  w: 169, depth: 0.58, rotate: -1.0 },
  { top: "77%", left: "70%",  w: 151, depth: 0.48, rotate:  0.8, hideBelow: 1024 },
  { top: "75%", left: "86%",  w: 174, depth: 0.68, rotate: -0.5 },
];

export default function HeroCollage({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [vw, setVw] = useState(1440);
  const [parallaxOn, setParallaxOn] = useState(false);
  const raf = useRef(0);

  // Reshuffle the image order on every page load. Starts from the stable
  // server order (no hydration mismatch), then randomizes after mount.
  const [shuffled, setShuffled] = useState(images);
  useEffect(() => {
    const next = [...images];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setShuffled(next);
  }, [images]);

  // Track viewport width for responsive scaling
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Enable parallax based on POINTER capability, not window width —
  // a narrow desktop window (e.g. Arc with its sidebar open) still has a mouse.
  // Touch-only devices and "reduce motion" users are excluded.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setParallaxOn(true); // very old browser: just enable it
      return;
    }
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce  = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setParallaxOn(pointer.matches && !reduce.matches);
    sync();
    pointer.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      pointer.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setOffset({
        x: (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2),
        y: (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2),
      });
    });
  }, []);

  useEffect(() => {
    if (!parallaxOn) {
      setOffset({ x: 0, y: 0 }); // reset to base position when disabled
      return;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove, parallaxOn]);

  if (!images.length) return null;

  const scale = vw < 640 ? 0.52 : vw < 1024 ? 0.72 : 1;
  const visible = SLOTS.filter(s => !s.hideBelow || vw >= s.hideBelow);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {visible.map((slot, i) => {
        const tx = offset.x * slot.depth * 28;
        const ty = offset.y * slot.depth * 28;
        const w = Math.round(slot.w * scale);
        return (
          <div
            key={i}
            className="absolute overflow-hidden"
            style={{
              top: slot.top,
              left: slot.left,
              width: w,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(26,26,24,0.18)",
              transform: `translate(${tx}px, ${ty}px) rotate(${slot.rotate}deg)`,
              transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shuffled[i % shuffled.length]}
              alt=""
              width={w}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        );
      })}
    </div>
  );
}
