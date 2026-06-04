"use client";

import { useEffect, useRef, useState } from "react";

type ImgItem = string | { src: string; filter?: string };

interface Props {
  images: ImgItem[];
  step?: number;       // px de scroll por cada cambio de imagen
  parallax?: number;   // px de desplazamiento por px de scroll (profundidad)
  filter?: string;     // filtro CSS aplicado a TODAS las imágenes (p.ej. duotono naranja)
  className?: string;  // contenedor (tamaño/posición). Usa top-* SIN -translate-y; el centrado lo hace el JS.
}

/**
 * Imagen que cambia (crossfade) con el scroll y, opcionalmente, hace parallax.
 * Cada imagen puede llevar su propio filtro (p.ej. para igualar tonos).
 */
export default function ScrollSwapImage({ images, step = 170, parallax, filter, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const items = images.map((im) => (typeof im === "string" ? { src: im } : im));

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const i = Math.floor(y / step) % items.length;
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
  }, [items.length, step, parallax]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`overflow-hidden will-change-transform ${className}`}
      style={{
        ...(parallax != null ? { transform: "translate3d(0,-50%,0)" } : {}),
        ...(filter ? { filter } : {}),
      }}
    >
      {items.map((it, i) => (
        <div
          key={it.src}
          className="absolute inset-0 bg-center bg-no-repeat bg-contain transition-opacity duration-700 ease-out"
          style={{ backgroundImage: `url(${it.src})`, opacity: i === idx ? 1 : 0, filter: it.filter }}
        />
      ))}
    </div>
  );
}
