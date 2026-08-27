import Image from "next/image";
import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { MediaGrid } from "@/components/media-grid";
import type { MediaItem } from "@/components/media-lightbox";

export const metadata: Metadata = {
  title: "Galería — Gredos Activo",
  description: "Fotos y vídeos de las actividades de Gredos Activo en Navarredonda de Gredos, Sierra de Gredos.",
};

const PARQUE_ARBOLES: MediaItem[] = [
  { type: "image", src: "/parque-arboles/IMG_1888.jpg", label: "Tirolina al atardecer" },
  { type: "image", src: "/parque-arboles/IMG_1831.jpg", label: "Plataformas suspendidas" },
  { type: "video", src: "/parque-arboles/videos/IMG_1787.mp4", poster: "/parque-arboles/posters/IMG_1787.jpg", label: "Salto entre pasarelas" },
  { type: "image", src: "/parque-arboles/IMG_1773.jpg", label: "Plataformas en las copas" },
  { type: "image", src: "/parque-arboles/IMG_1758.jpg", label: "Cruzando el cable tensado" },
  { type: "video", src: "/parque-arboles/videos/IMG_1766.mp4", poster: "/parque-arboles/posters/IMG_1766.jpg", label: "Tirolina entre pinos" },
  { type: "image", src: "/parque-arboles/IMG_1781.jpg", label: "En plena tirolina" },
  { type: "image", src: "/parque-arboles/IMG_1836.jpg", label: "Atardecer en el circuito" },
  { type: "video", src: "/parque-arboles/videos/IMG_1879.mp4", poster: "/parque-arboles/posters/IMG_1879.jpg", label: "Tirolina al atardecer" },
  { type: "image", src: "/parque-arboles/IMG_1793.jpg", label: "Salto entre troncos" },
  { type: "image", src: "/parque-arboles/IMG_1813.jpg", label: "Circuito entre pinos" },
  { type: "video", src: "/parque-arboles/videos/IMG_1742.mp4", poster: "/parque-arboles/posters/IMG_1742.jpg", label: "Tirolina" },
  { type: "image", src: "/parque-arboles/IMG_1797.jpg", label: "Puente de cuerda" },
  { type: "image", src: "/parque-arboles/IMG_1760.jpg", label: "Red de trepa" },
  { type: "video", src: "/parque-arboles/videos/IMG_1771.mp4", poster: "/parque-arboles/posters/IMG_1771.jpg", label: "Enganchando el arnés" },
  { type: "image", src: "/parque-arboles/IMG_1848.jpg", label: "Subida a la torre" },
  { type: "image", src: "/parque-arboles/IMG_1730.jpg", label: "Tirolina entre pinos" },
  { type: "video", src: "/parque-arboles/videos/IMG_1842.mp4", poster: "/parque-arboles/posters/IMG_1842.jpg", label: "Tirolina" },
  { type: "image", src: "/parque-arboles/IMG_1862.jpg", label: "Escalera de cuerda" },
  { type: "image", src: "/parque-arboles/IMG_1737.jpg", label: "Escalada a la plataforma" },
  { type: "video", src: "/parque-arboles/videos/IMG_1741.mp4", poster: "/parque-arboles/posters/IMG_1741.jpg", label: "Tirolina" },
];

const MAS_ACTIVIDADES = [
  { src: "/photos/hero-btt.jpg", label: "Bicicleta de Montaña" },
  { src: "/photos/paintball.jpg", label: "Paintball" },
  { src: "/photos/tiro-arco.jpg", label: "Tiro con Arco" },
];

export default function GaleriaPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-8 sm:pt-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Gredos Activo
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] text-[var(--ink)] sm:text-5xl">Galería</h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--text-dim)]">
          Un vistazo a nuestras actividades en la Sierra de Gredos.
        </p>

        <div className="mt-14">
          <h2 className="text-xl text-[var(--ink)]">Parque de Cuerda</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-dim)]">
            Tirolinas, puentes y pasarelas entre los pinos, tal cual se viven en el circuito.
          </p>
          <MediaGrid items={PARQUE_ARBOLES} />
        </div>

        <div className="mt-16">
          <h2 className="text-xl text-[var(--ink)]">Más actividades</h2>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            {MAS_ACTIVIDADES.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--border)] shadow-[var(--shadow)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(max-width: 640px) 30vw, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <p className="absolute bottom-2.5 left-2.5 right-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white sm:text-[11px]">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
