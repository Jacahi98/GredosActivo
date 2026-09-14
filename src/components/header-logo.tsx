import { LogoMark } from "@/components/logo-mark";

// shrink-0 es obligatorio: sin el, al estrechar la cabecera el flex aplasta
// el SVG (mide w-auto, asi que no tiene ancho propio que defender) y el logo
// sale deformado en vez de recortarse el texto de al lado.
export function HeaderLogo() {
  return <LogoMark role="img" aria-label="GREDOS activo" className="h-9 w-auto shrink-0 sm:h-11" />;
}
