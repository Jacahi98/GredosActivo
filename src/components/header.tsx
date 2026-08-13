import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderLogo } from "@/components/header-logo";
import { CurtainLink } from "@/components/curtain-link";

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
      <ThemeToggle />
    </header>
  );
}
