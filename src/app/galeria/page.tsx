import Image from "next/image";
import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Galería — Gredos Activo",
  description: "Fotos de las actividades de Gredos Activo en Navarredonda de Gredos, Sierra de Gredos.",
};

const PHOTOS = [
  { src: "/photos/hero-btt.jpg", label: "Bicicleta de Montaña" },
  { src: "/photos/parque-cuerda.jpg", label: "Parque de Cuerda" },
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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--border)] shadow-[var(--shadow)]"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes="(max-width: 640px) 45vw, 550px"
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <p className="absolute bottom-2.5 left-2.5 right-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">
                {photo.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
