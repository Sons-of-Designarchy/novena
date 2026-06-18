"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/gallery/NOVENA-6020.jpg", w: 1500, h: 1000 },
  { src: "/gallery/NOVENA-6903.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-6474.jpg", w: 1500, h: 1000 },
  { src: "/gallery/NOVENA-7085.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-7709.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-8145.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-6925.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-6719.jpg", w: 1500, h: 1000 },
  { src: "/gallery/NOVENA-7706.jpg", w: 1000, h: 1500 },
  { src: "/gallery/NOVENA-6772.jpg", w: 1500, h: 1000 },
  // ── Fotos de equipo (carpeta /gear) ──
  { src: "/gear/NOVENA-6251%202%201.jpg", w: 1366, h: 2049 },
  { src: "/gear/NOVENA-6474%202%201.jpg", w: 2048, h: 1366 },
  { src: "/gear/NOVENA-6903%202%201.jpg", w: 1366, h: 2049 },
  { src: "/gear/NOVENA-7818%202%201.jpg", w: 2048, h: 1366 },
  { src: "/gear/NOVENA-7706%202%201.jpg", w: 1366, h: 2049 },
  { src: "/gear/NOVENA-7867%202%201.jpg", w: 2048, h: 1365 },
  { src: "/gear/NOVENA-7709%202%201.jpg", w: 1366, h: 2049 },
  { src: "/gear/NOVENA-8049%202%201.jpg", w: 2048, h: 1365 },
  { src: "/gear/NOVENA-8061%202%201.jpg", w: 1366, h: 2049 },
  { src: "/gear/NOVENA-8171%202%201.jpg", w: 2048, h: 1366 },
  { src: "/gear/NOVENA-8069%202%201.jpg", w: 1365, h: 2048 },
  { src: "/gear/NOVENA-8173%202%201.jpg", w: 2048, h: 1365 },
];

const half = Math.ceil(IMAGES.length / 2);
const col1imgs = [...IMAGES.slice(0, half), ...IMAGES.slice(0, half), ...IMAGES.slice(0, half)];
const col2imgs = [...IMAGES.slice(half), ...IMAGES.slice(half), ...IMAGES.slice(half)];

export default function GalleryColumns() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const c1   = col1Ref.current;
    const c2   = col2Ref.current;
    if (!wrap || !c1 || !c2) return;

    const update = () => {
      const rect     = wrap.getBoundingClientRect();
      const wrapH    = wrap.offsetHeight;
      const vh       = window.innerHeight;
      const maxScroll = Math.max(1, wrapH - vh);
      const scrolled  = Math.max(0, Math.min(maxScroll, -rect.top));
      const progress  = scrolled / maxScroll;

      const c1Range = Math.max(0, c1.offsetHeight - vh);
      const c2Range = Math.max(0, c2.offsetHeight - vh);

      // Col 1: top → bottom (moves up as progress increases)
      c1.style.transform = `translateY(${-progress * c1Range}px)`;
      // Col 2: bottom → top (starts at bottom, ends at top)
      c2.style.transform = `translateY(${-(1 - progress) * c2Range}px)`;
    };

    // Run after images have had time to paint their heights
    const runOnLoad = () => {
      update();
      window.removeEventListener("load", runOnLoad);
    };

    if (document.readyState === "complete") {
      // Already loaded — wait one frame for layout
      requestAnimationFrame(update);
    } else {
      window.addEventListener("load", runOnLoad);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("load", runOnLoad);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const Column = ({
    imgs,
    ref: colRef,
  }: {
    imgs: typeof IMAGES;
    ref: React.RefObject<HTMLDivElement | null>;
  }) => (
    <div className="w-1/2 overflow-hidden" style={{ height: "100vh" }}>
      <div ref={colRef} className="will-change-transform" style={{ lineHeight: 0 }}>
        {imgs.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt="Estudio Novena"
            width={img.w}
            height={img.h}
            sizes="50vw"
            style={{ display: "block", width: "100%", height: "auto" }}
            loading="eager"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div ref={wrapRef} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 flex" style={{ height: "100vh" }}>
        <Column imgs={col1imgs} ref={col1Ref} />
        <Column imgs={col2imgs} ref={col2Ref} />
      </div>
    </div>
  );
}
