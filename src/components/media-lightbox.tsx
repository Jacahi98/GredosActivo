"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

export type MediaItem =
  | { type: "image"; src: string; label: string }
  | { type: "video"; src: string; poster: string; label: string };

export function MediaLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const item = items[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M1 1l16 16M17 1L1 17" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Anterior"
        className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12.5 4l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Siguiente"
        className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7.5 4l6 6-6 6" />
        </svg>
      </button>

      <div
        className="relative flex max-h-full max-w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <div className="relative h-[85vh] w-[90vw]">
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        ) : (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-[90vw] rounded-sm"
          />
        )}
        <p className="absolute -bottom-9 left-0 right-0 text-center font-mono text-xs uppercase tracking-wider text-white/70">
          {item.label} · {index + 1}/{items.length}
        </p>
      </div>
    </div>
  );
}
