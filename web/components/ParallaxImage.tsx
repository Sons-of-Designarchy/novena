"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  speed?: number;    // cuánto viaja la imagen por px de scroll (0.1–0.3)
  opacity?: number;
  className?: string; // clases para el <img> (p.ej. filtros)
}

/**
 * Imagen más alta que su contenedor, que hace parallax DENTRO del recuadro
 * (mueve la imagen, no el recuadro), sin dejar huecos ni hacer zoom.
 * El contenedor padre debe ser position:relative + overflow-hidden.
 */
export default function ParallaxImage({ src, speed = 0.15, opacity = 1, className = "" }: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const extra = el.offsetHeight - parent.clientHeight; // recorrido disponible
      if (extra <= 0) { el.style.transform = "translateY(0)"; return; }
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      let ty = -extra / 2 - fromCenter * speed;
      ty = Math.max(-extra, Math.min(0, ty)); // clamp: siempre cubre el recuadro
      el.style.transform = `translateY(${ty}px)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [speed]);

  return (
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      className={`absolute left-0 top-0 w-full h-auto will-change-transform pointer-events-none select-none ${className}`}
      style={{ opacity }}
      draggable={false}
    />
  );
}
