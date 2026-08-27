"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaLightbox, type MediaItem } from "@/components/media-lightbox";

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 columns-2 gap-3 sm:columns-3 sm:gap-4">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] shadow-[var(--shadow)] sm:mb-4"
          >
            <Image
              src={item.type === "image" ? item.src : item.poster}
              alt={item.label}
              width={600}
              height={800}
              sizes="(max-width: 640px) 45vw, 32vw"
              className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 2.5v11l9-5.5-9-5.5z" />
                  </svg>
                </div>
              </div>
            )}
            <p className="pointer-events-none absolute bottom-2 left-2 right-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-[11px]">
              {item.label}
            </p>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <MediaLightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </>
  );
}
