"use client";

import { usePathname } from "next/navigation";
import { Home, MountainSnow, Fuel, Images, Mail, Phone } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";
import { CurtainLink } from "@/components/curtain-link";

const NAV = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Actividades", href: "/actividades", icon: MountainSnow },
  { title: "Gasolinera", href: "/gasolinera", icon: Fuel },
  { title: "Galería", href: "/galeria", icon: Images },
  { title: "Contacto", href: "/contacto", icon: Mail },
];

// Dock estilo macOS: panel de cristal líquido (fondo translúcido + blur y
// saturación altos, borde de luz muy tenue) en vez de una bandeja opaca —
// el mismo lenguaje visual que el "liquid glass" de Apple, no un bloque de
// color sólido. Al señalar un icono con el ratón se amplía él solo, no sus
// vecinos, y en pantallas táctiles no se amplía ninguno. El tema
// claro/oscuro no es un apartado, así que vive en el header, no aquí. Ver
// src/components/core/dock.tsx para el mecanismo de magnificación
// (adaptado de Motion Primitives a framer-motion).
//
// z-40, por encima de la cortina de montañas (z-30, ver
// mountain-curtain.tsx): el dock se queda fijo y visible durante todo
// el barrido entre páginas.
export function DockNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-2 sm:px-4">
      <Dock
        className="border border-white/25 bg-[var(--granite-raised)]/85 shadow-xl shadow-black/25 [backdrop-filter:blur(32px)_saturate(160%)]"
        magnification={64}
        panelHeight={56}
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <DockItem
              key={item.href}
              active={active}
              // El tope en movil va por elemento: el activo necesita mas que
              // los demas. Con 5 a 36 px, uno a 48 y gap-1.5 la barra mide
              // 282 px, que entran en los 288 utiles de una pantalla de 320.
              className={`aspect-square ${active ? "max-w-12" : "max-w-9"} sm:max-w-none`}
            >
              <DockLabel className="border-white/20 bg-black/70 text-white backdrop-blur-sm">
                {item.title}
              </DockLabel>
              <DockIcon>
                <CurtainLink
                  href={item.href}
                  className="relative flex h-full w-full items-center justify-center"
                  aria-label={item.title}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={`h-full w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] ${
                      active ? "text-[var(--pine)]" : "text-[var(--ink)]"
                    }`}
                  />
                  {active && (
                    <span className="absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-[var(--pine)] shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
                  )}
                </CurtainLink>
              </DockIcon>
            </DockItem>
          );
        })}

        <DockItem className="aspect-square max-w-9 sm:max-w-none">
          <DockLabel className="border-white/20 bg-black/70 text-white backdrop-blur-sm">
            Llamar · 920 34 80 45
          </DockLabel>
          <DockIcon>
            <a href="tel:920348045" className="flex h-full w-full items-center justify-center" aria-label="Llamar">
              <Phone className="h-full w-full text-[var(--pine)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
            </a>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
