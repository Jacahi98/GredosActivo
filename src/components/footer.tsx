import { APP_VERSION } from "@/lib/version";

// Pie discreto. Lleva pb generoso porque el dock de navegación flota fijo
// sobre el borde inferior (bottom-4) y taparía el contenido del pie.
export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] px-6 pb-28 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
          Gredos Activo · Navarredonda de Gredos
        </p>
        <p className="font-mono text-[10px] text-[var(--text-faint)]">v{APP_VERSION}</p>
      </div>
    </footer>
  );
}
