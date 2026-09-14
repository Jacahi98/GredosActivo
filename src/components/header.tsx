import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderLogo } from "@/components/header-logo";
import { Phone } from "lucide-react";
import { CurtainLink } from "@/components/curtain-link";
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--granite)]/90 px-4 py-3 backdrop-blur sm:px-8">
      <CurtainLink href="/" className="flex shrink-0 items-center gap-3">
        <HeaderLogo />
        <span className="flex flex-col gap-0.5">
          <span className="font-[family-name:var(--font-display)] text-lg font-medium leading-none text-[var(--ink)]">
            Gredos Activo
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-[var(--sky)]">
            Navarredonda de Gredos · Sierra de Gredos
          </span>
        </span>
      </CurtainLink>
      {/* El teléfono, en la cabecera pegajosa, para poder llamar desde
          cualquier página y sin buscarlo. El dock de abajo ya tiene uno, pero
          en escritorio queda lejos del recorrido de lectura y no se asocia a
          la marca; aquí va junto al logo y siempre a la vista.
          Mismo tamaño y forma que el botón de tema, con el que comparte
          esquina, para que se lean como un par. */}
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Llamar al ${PHONE_DISPLAY}`}
          title={`Llamar al ${PHONE_DISPLAY}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-dim)] transition-colors hover:border-[var(--pine)] hover:text-[var(--pine)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
