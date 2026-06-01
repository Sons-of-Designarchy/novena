"use client";

import { useEffect, useRef } from "react";

interface Props {
  speed?: number; // px de desplazamiento por px de scroll (+ baja, - sube)
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Capa decorativa con parallax: se desplaza en Y según el scroll de la página.
 * Pensada para elementos position:absolute (el transform se suma a su posición).
 */
export default function ParallaxLayer({ speed = 0.15, className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
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
  }, [speed]);

  return <div ref={ref} aria-hidden="true" className={`will-change-transform ${className}`} style={style} />;
}
