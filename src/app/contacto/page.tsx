import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { GoogleReviewsBadge } from "@/components/google-reviews-badge";
import { CopyButton } from "@/components/copy-button";
import {
  PHONE_TEL,
  PHONE_DISPLAY,
  EMAIL,
  ADDRESS_DISPLAY,
  MAPS_EMBED_SRC,
  MAPS_DIRECTIONS_URL,
  MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "@/lib/business";

export const metadata: Metadata = {
  title: "Contacto — Gredos Activo",
  description: "Contacta con Gredos Activo en Navarredonda de Gredos: teléfono, dirección y correo.",
};

export default function ContactoPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-8 sm:pt-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Gredos Activo
        </p>
        <h1 className="mt-4 text-4xl leading-[1.1] text-[var(--ink)] sm:text-5xl">Contacto</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[22rem_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="max-w-xl text-[17px] leading-relaxed text-[var(--text-dim)]">
              Para reservar actividades o cualquier consulta, llámanos.
            </p>

            <dl className="mt-10 space-y-6 text-[17px]">
              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                  Teléfono
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-semibold text-[var(--pine)] underline-offset-4 transition-colors hover:text-[var(--gorse)] hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <CopyButton value={PHONE_DISPLAY} label="teléfono" />
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                  Correo
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-semibold text-[var(--pine)] underline-offset-4 transition-colors hover:text-[var(--gorse)] hover:underline"
                  >
                    {EMAIL}
                  </a>
                  <CopyButton value={EMAIL} label="correo" />
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                  Dirección
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-[var(--text-dim)]">
                  <span>{ADDRESS_DISPLAY}</span>
                  <CopyButton value={ADDRESS_DISPLAY} label="dirección" />
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="overflow-hidden rounded-sm border border-[var(--border)] shadow-[var(--shadow)]">
              <iframe
                src={MAPS_EMBED_SRC}
                className="h-72 w-full sm:h-[26rem]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Gredos Activo"
              />
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--granite-raised)] px-5 py-4">
                <p className="text-sm text-[var(--text-dim)]">Ctra. AV-941, Nº 11 · Navarredonda de Gredos</p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-sm bg-[var(--pine)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--pine-ink)] transition-opacity hover:opacity-90"
                >
                  Cómo llegar
                </a>
              </div>
            </div>

            <GoogleReviewsBadge rating={GOOGLE_RATING} reviewCount={GOOGLE_REVIEW_COUNT} href={MAPS_REVIEWS_URL} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
