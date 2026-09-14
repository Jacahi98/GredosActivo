"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Reproductor con controles propios en vez de los del navegador.
//
// Los controles nativos (<video controls>) traen siempre barra de volumen, y
// según el navegador también descarga, velocidad de reproducción y
// picture-in-picture. No hay forma de quitar el volumen de manera fiable:
// controlsList solo cubre descarga/velocidad y solo en Chromium, y ocultar el
// botón con ::-webkit-media-controls-* no funciona en Firefox. Los vídeos del
// parque son ambiente, sin nada que escuchar, así que se dibujan aquí los dos
// únicos controles que hacen falta -- reproducir/pausar y posición -- y el
// resto simplemente no existe.
//
// Esto no impide que alguien decidido se descargue el fichero (la URL está en
// el HTML, como en cualquier web); lo que hace es que la interfaz no lo
// ofrezca.

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

export function SilentVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // React no siempre emite el atributo muted en el HTML del servidor, solo la
  // propiedad al hidratar; forzarlo aquí garantiza que nunca suene, y de paso
  // que el autoplay no lo bloquee el navegador (lo bloquea si hay audio).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
  }, [src]);

  const toggle = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true;
      void v.play();
    } else {
      v.pause();
    }
  }, []);

  const seek = useCallback((valor: number) => {
    const v = ref.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = (valor / 1000) * v.duration;
  }, []);

  const progreso = duration > 0 ? Math.round((current / duration) * 1000) : 0;

  return (
    <div className="flex max-h-[85vh] max-w-[90vw] flex-col gap-2">
      <video
        ref={ref}
        key={src}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        // Por si algún día se reactivasen los controles nativos: en Chromium
        // quita descarga, velocidad y reproducción remota.
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={toggle}
        className="min-h-0 w-auto cursor-pointer rounded-sm object-contain"
        aria-label={label}
      />

      <div className="flex items-center gap-3 px-1">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="3.5" height="12" rx="0.5" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="0.5" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M3 1.5l9 5.5-9 5.5z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={1000}
          value={progreso}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Posición del vídeo"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
        />

        <span className="shrink-0 font-mono text-xs tabular-nums text-white/70">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
}
