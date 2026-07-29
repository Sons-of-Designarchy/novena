"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { GearPhoto } from "@/lib/gearPhotos";

const FOCUS_CLASS: Record<NonNullable<GearPhoto["focus"]>, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

/**
 * One photo at a time, arrows or drag to move — not the horizontal reel this
 * replaced. A category with one photo renders it with no controls; a
 * category with none renders nothing.
 */
export default function GearCarousel({
  photos,
  alt,
}: {
  photos: GearPhoto[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const dragX = useRef<number | null>(null);

  if (photos.length === 0) return null;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const photo = photos[index];

  return (
    <div className="mb-4">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-sand/20 cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={alt}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover pointer-events-none ${photo.focus ? FOCUS_CLASS[photo.focus] : ""}`}
        />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full
                         flex items-center justify-center text-ivory bg-dusk/40
                         hover:bg-dusk/70 transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full
                         flex items-center justify-center text-ivory bg-dusk/40
                         hover:bg-dusk/70 transition-colors"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((p, i) => (
                <span
                  key={p.src}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === index ? "bg-ivory" : "bg-ivory/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
