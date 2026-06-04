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
  // ── Top-center-left ──
  { top:  "2%", left: "25%",  w: 172, depth: 0.25, rotate: -0.4, hideBelow: 1024 },
  // ── Top-right cluster ──
  { top:  "3%", left: "62%",  w: 137, depth: 0.50, rotate:  1.0, hideBelow: 1024 },
  { top:  "0%", left: "73%",  w: 188, depth: 0.65, rotate: -0.8 },
  { top:  "4%", left: "87%",  w: 144, depth: 0.40, rotate:  0.5 },
  // ── Left side ──
  { top: "32%", left: "-1%",  w: 169, depth: 0.70, rotate: -1.0 },
  { top: "57%", left:  "3%",  w: 144, depth: 0.45, rotate:  0.7 },
  // ── Right side ──
  { top: "28%", left: "80%",  w: 186, depth: 0.60, rotate: -0.5 },
  { top: "56%", left: "85%",  w: 158, depth: 0.38, rotate:  1.2 },
  // ── Bottom row ──
  { top: "78%", left:  "2%",  w: 174, depth: 0.65, rotate:  1.0 },
  { top: "80%", left: "18%",  w: 135, depth: 0.48, rotate: -0.8, hideBelow: 640 },
  { top: "76%", left: "33%",  w: 158, depth: 0.28, rotate:  0.5, hideBelow: 1024 },
  { top: "74%", left: "54%",  w: 169, depth: 0.58, rotate: -1.0, hideBelow: 1024 },
  { top: "77%", left: "70%",  w: 151, depth: 0.48, rotate:  0.8, hideBelow: 1024 },
  { top: "75%", left: "86%",  w: 174, depth: 0.68, rotate: -0.5 },
];

export default function HeroCollage({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [vw, setVw] = useState(1440);
  const raf = useRef(0);

  // Track viewport width for responsive scaling
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Mouse parallax — desktop only
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
    if (vw < 1024) return; // no parallax on touch devices
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove, vw]);

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
              src={images[i % images.length]}
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
