import type { Metadata } from "next";
import { Truck, Store, Clock } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/business";

export const metadata: Metadata = {
  title: "Gasolinera y reparto — Gredos Activo",
  description:
    "Estación de Servicio Gredos en Navarredonda de Gredos: autoservicio 24 horas, reparto de gasóleo a domicilio y tienda de imprescindibles.",
};

const FEATURES = [
  {
    icon: Clock,
    title: "Autoservicio 24 horas",
    description: "Repostaje día y noche, todos los días del año.",
  },
  {
    icon: Truck,
    title: "Reparto de gasóleo a domicilio",
    description: "Entrega de gasóleo para calefacción en Navarredonda y alrededores.",
  },
  {
    icon: Store,
    title: "Tienda de imprescindibles",
    description: "Artículos básicos para el día a día, en la propia estación.",
  },
];

export default function GasolineraPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-8 sm:pt-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Gasolinera Gredos
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] text-[var(--ink)] sm:text-5xl">
          Gasolinera y reparto de gasóleo
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--text-dim)]">
          Además del turismo activo, somos la estación de servicio y tienda de referencia en Navarredonda de Gredos.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}>
                <Icon className="h-7 w-7 text-[var(--sky)]" aria-hidden="true" />
                <h2 className="mt-3 text-lg text-[var(--ink)]">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] px-6 py-5 shadow-[var(--shadow)]">
          <p className="text-[15px] text-[var(--text-dim)]">¿Necesitas reparto de gasóleo o tienes alguna duda?</p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="ml-auto shrink-0 rounded-sm bg-[var(--pine)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--pine-ink)] transition-opacity hover:opacity-90"
          >
            Llamar · {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
