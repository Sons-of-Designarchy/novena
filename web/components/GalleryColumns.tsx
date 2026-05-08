"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/gallery/BENJAMIN_F200_0490_2.webp",              w: 750, h: 505  },
  { src: "/gallery/BENJAMIN_F200_0499_18.webp",             w: 750, h: 1114 },
  { src: "/gallery/dblack+2024-11-13+133758.311.webp",      w: 750, h: 523  },
  { src: "/gallery/dblack+2024-11-13+140443.553+copy.webp", w: 750, h: 482  },
  { src: "/gallery/BENJAMIN_F200_0490_22.webp",             w: 750, h: 513  },
  { src: "/gallery/BENJAMIN_F200_0499_23.webp",             w: 750, h: 505  },
  { src: "/gallery/dblack+2024-11-13+140359.223.webp",      w: 750, h: 523  },
  { src: "/gallery/BENJAMIN_F200_0499_27.webp",             w: 750, h: 505  },
];

const col1imgs = [...IMAGES.slice(0, 4), ...IMAGES.slice(0, 4), ...IMAGES.slice(0, 4)];
const col2imgs = [...IMAGES.slice(4), ...IMAGES.slice(4), ...IMAGES.slice(4)];

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
