import Image from "next/image";
import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Actividades — Gredos Activo",
  description:
    "Bicicleta de montaña, parque de cuerda, paintball y tiro con arco en Navarredonda de Gredos, Sierra de Gredos.",
};

const ACTIVITIES = [
  {
    slug: "bicicleta-montana",
    name: "Bicicleta de Montaña",
    src: "/photos/hero-btt.jpg",
    description:
      "Rutas guiadas por los senderos y pistas de la Sierra de Gredos, adaptadas al nivel del grupo. Bicicletas y material incluidos.",
  },
  {
    slug: "parque-de-cuerda",
    name: "Parque de Cuerda",
    src: "/parque-arboles/IMG_1781.jpg",
    description:
      "Circuitos de tirolinas, puentes y pasarelas entre árboles, con distintos niveles de dificultad y equipo de seguridad homologado.",
  },
  {
    slug: "paintball",
    name: "Paintball",
    src: "/photos/paintball.jpg",
    description:
      "Partidas por equipos en un terreno natural con obstáculos, marcadoras y protección completa incluidas.",
  },
  {
    slug: "tiro-con-arco",
    name: "Tiro con Arco",
    src: "/photos/tiro-arco.jpg",
    description:
      "Iniciación y práctica de tiro con arco con monitor, arcos y material adaptados a todas las edades.",
  },
];

export default function ActividadesPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-8 sm:pt-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Gredos Activo
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] text-[var(--ink)] sm:text-5xl">Actividades</h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--text-dim)]">
          Para grupos o en solitario, con material y monitores cualificados, en plena Sierra de Gredos.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {ACTIVITIES.map((activity, i) => (
            <article
              key={activity.slug}
              className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] shadow-[var(--shadow)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={activity.src}
                  alt={activity.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl text-[var(--ink)]">{activity.name}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-dim)]">{activity.description}</p>
                <a
                  href="tel:920348045"
                  className="mt-4 inline-block text-sm font-semibold text-[var(--pine)] underline-offset-4 transition-colors hover:text-[var(--gorse)] hover:underline"
                >
                  Llamar para reservar · 920 34 80 45
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
