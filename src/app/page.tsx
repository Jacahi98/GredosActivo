import Image from "next/image";
import { Fuel } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { GoogleReviewsBadge } from "@/components/google-reviews-badge";
import { CurtainLink } from "@/components/curtain-link";
import { GanaderiaSection } from "@/components/ganaderia-section";
import { PHONE_TEL, PHONE_DISPLAY, MAPS_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/business";

export default function Home() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-8 sm:pt-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Gredos Activo
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] text-[var(--ink)] sm:text-5xl">
          Aventura en la sierra, servicio en el pueblo.
        </h1>

        <div className="mt-6 max-w-xl space-y-4 text-justify text-[17px] leading-relaxed text-[var(--text-dim)]">
          <p>
            Gredos Activo es un negocio local en Navarredonda de Gredos, en el corazón de la Sierra de Gredos.
            Combinamos el turismo activo con los servicios del día a día del pueblo: somos también la Estación de
            Servicio Gredos.
          </p>
          <p>
            Trabajamos con grupos y particulares, con material y monitores cualificados, adaptando cada actividad al
            nivel de quien viene a disfrutar de la sierra.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CurtainLink
            href="/actividades"
            className="rounded-sm bg-[var(--pine)] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--pine-ink)] transition-opacity hover:opacity-90"
          >
            Ver actividades
          </CurtainLink>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-semibold text-[var(--pine)] underline-offset-4 transition-colors hover:text-[var(--gorse)] hover:underline"
          >
            Llamar · {PHONE_DISPLAY}
          </a>
        </div>

        <GoogleReviewsBadge rating={GOOGLE_RATING} reviewCount={GOOGLE_REVIEW_COUNT} href={MAPS_REVIEWS_URL} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <CurtainLink
            href="/actividades"
            className="group overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] shadow-[var(--shadow)] transition-colors hover:border-[var(--pine)]"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/photos/hero-btt.jpg"
                alt="Bicicleta de montaña en la Sierra de Gredos"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl text-[var(--ink)]">Turismo activo</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-dim)]">
                Bicicleta de montaña, parque de cuerda, paintball y tiro con arco.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--pine)] underline-offset-4 group-hover:underline">
                Ver actividades →
              </span>
            </div>
          </CurtainLink>

          <CurtainLink
            href="/gasolinera"
            className="group overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] shadow-[var(--shadow)] transition-colors hover:border-[var(--pine)]"
          >
            <div className="flex aspect-[16/10] items-center justify-center bg-[var(--granite-sunken)]">
              <Fuel className="h-16 w-16 text-[var(--sky)]" aria-hidden="true" />
            </div>
            <div className="p-6">
              <h2 className="text-xl text-[var(--ink)]">Gasolinera y reparto</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-dim)]">
                Autoservicio 24 horas y reparto de gasóleo a domicilio para calefacción.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--pine)] underline-offset-4 group-hover:underline">
                Más información →
              </span>
            </div>
          </CurtainLink>
        </div>
      </section>

      <GanaderiaSection />
    </PageTransition>
  );
}
