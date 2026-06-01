"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  step?: number;       // px de scroll por cada cambio de imagen
  parallax?: number;   // px de desplazamiento por px de scroll (profundidad)
  className?: string;  // contenedor (tamaño/posición). Usa top-* SIN -translate-y; el centrado lo hace el JS.
}

/**
 * Imagen que cambia (crossfade) con el scroll y, opcionalmente, hace parallax.
 * El transform combina el centrado vertical (-50%) con el desplazamiento de parallax.
 */
export default function ScrollSwapImage({ images, step = 170, parallax, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const i = Math.floor(y / step) % images.length;
      setIdx(i < 0 ? 0 : i);
      if (parallax != null && ref.current) {
        ref.current.style.transform = `translate3d(0, calc(-50% + ${y * parallax}px), 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [images.length, step, parallax]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`overflow-hidden will-change-transform ${className}`}
      style={parallax != null ? { transform: "translate3d(0,-50%,0)" } : undefined}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-center bg-no-repeat bg-contain transition-opacity duration-700 ease-out"
          style={{ backgroundImage: `url(${src})`, opacity: i === idx ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
