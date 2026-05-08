"use client";

import { useEffect, useState, useCallback } from "react";
import SvgIcon from "./SvgIcon";

const ICONS = ["araucana", "cactus", "flower", "fork", "pepper", "piramid", "sun", "yito"];

const CORNERS = [
  "top-[27px] left-4 md:left-6",
  "top-[27px] right-4 md:right-6",
  "bottom-5 left-4 md:bottom-6 md:left-6",
  "bottom-5 right-4 md:bottom-6 md:right-6",
];

function pick4(): string[] {
  return [...ICONS].sort(() => Math.random() - 0.5).slice(0, 4);
}

export default function CornerIcons() {
  const [icons, setIcons]     = useState<string[]>(() => pick4());
  const [visible, setVisible] = useState(true);
  const [dark, setDark]       = useState(false);

  const rotate = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIcons(pick4());
      setVisible(true);
    }, 220);
  }, []);

  useEffect(() => {
    const STEP = 250;
    let last = Math.floor(window.scrollY / STEP);

    const onScroll = () => {
      const current = Math.floor(window.scrollY / STEP);
      if (current !== last) {
        last = current;
        const mid = window.innerHeight / 2;
        const el = document.elementFromPoint(window.innerWidth / 2, mid);
        const section = el?.closest("section[data-section]");
        setDark(section?.getAttribute("data-theme") === "dark");
        rotate();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rotate]);

  const colorClass = dark ? "text-ivory" : "text-cobalt";

  return (
    <>
      {CORNERS.map((pos, i) => (
        <div
          key={i}
          className={`fixed ${pos} z-30 pointer-events-none transition-opacity duration-200`}
          style={{ opacity: visible ? 0.8 : 0 }}
        >
          <SvgIcon
            name={icons[i]}
            className={`w-[22px] h-[22px] md:w-[26px] md:h-[26px] ${colorClass}`}
          />
        </div>
      ))}
    </>
  );
}
