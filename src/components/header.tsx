import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderLogo } from "@/components/header-logo";
import { Phone } from "lucide-react";
import { CurtainLink } from "@/components/curtain-link";
import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--granite)]/90 px-4 py-3 backdrop-blur sm:gap-3 sm:px-8">
      {/* min-w-0 en el enlace y en la columna de texto: sin el, un hijo flex
          nunca baja de su ancho de contenido y el nombre largo empujaba la
          cabecera 136 px mas alla del viewport, dando scroll horizontal en
          movil. Con min-w-0 + truncate el texto cede y nunca desborda. */}
      <CurtainLink href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
        <HeaderLogo />
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-[family-name:var(--font-display)] text-base font-medium leading-none text-[var(--ink)] sm:text-lg">
            Gredos Activo
          </span>
          {/* El subtitulo completo no cabe en un movil (mide ~310 px), y cortarlo
              con puntos suspensivos queda peor que no ponerlo: la localidad ya
              esta en el heroe y en el pie. */}
          <span className="hidden truncate font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-[var(--sky)] sm:block">
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
