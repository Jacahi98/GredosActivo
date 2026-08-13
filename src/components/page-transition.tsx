// La transición entre páginas la lleva la cortina en mountain-curtain.tsx
// (ver CurtainLink), no este componente — se mantiene como wrapper vacío
// para no tocar los cinco page.tsx que ya lo importan.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
