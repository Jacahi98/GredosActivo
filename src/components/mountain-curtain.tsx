"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CURTAIN_TREES } from "@/data/curtain-trees";

// Cortina para la transición entre páginas: cuatro siluetas apiladas
// (montañas al fondo, colinas, una loma cercana y árboles delante, ver
// globals.css) suben juntas desde abajo hasta tapar toda la pantalla,
// se mantienen un instante — tiempo de sobra para que router.push
// cambie la página detrás, invisible — y vuelven a bajar, revelando la
// sección nueva por donde entraron. Controlada enteramente por React
// (no por document.startViewTransition): una versión anterior dependía
// de que el navegador revelase una capa arrancada oculta dentro de una
// View Transition, y en la práctica no se veía nada — con clases CSS
// normales + setTimeout no hay ninguna captura de navegador de por
// medio que pueda fallar en silencio.
type Phase = "idle" | "covering" | "revealing";

const LAYERS = ["mtn-mountains", "mtn-hills", "mtn-near", "mtn-trees"] as const;

// Transición rápida para no entorpecer la navegación entre pantallas —
// las mismas cifras están en globals.css (mtn-rise/mtn-fall), tienen
// que coincidir en los dos sitios.
const RISE_MS = 700;
const HOLD_MS = 150;
const FALL_MS = 700;

const CurtainContext = createContext<((href: string) => void) | null>(null);

export function useCurtainNavigate() {
  const ctx = useContext(CurtainContext);
  if (!ctx) {
    throw new Error("useCurtainNavigate debe usarse dentro de MountainCurtainProvider");
  }
  return ctx;
}

export function MountainCurtainProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const busyRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setPhase("covering");

      setTimeout(() => {
        router.push(href);
        // Next.js restaura el scroll de forma asíncrona tras el push, y con
        // la cortina tardando solo unos cientos de ms en revelar, a veces
        // no le da tiempo -- se ve la página nueva a medio scroll antes de
        // saltar arriba. Forzarlo aquí garantiza que ya está arriba del
        // todo para cuando se revela.
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("revealing");
            setTimeout(() => {
              setPhase("idle");
              busyRef.current = false;
            }, FALL_MS);
          });
        });
      }, RISE_MS + HOLD_MS);
    },
    [router]
  );

  const stateClass = phase === "covering" ? "is-covering" : phase === "revealing" ? "is-revealing" : "";

  return (
    <CurtainContext.Provider value={navigate}>
      {children}
      {/* Fondo de "cielo" detrás de las cuatro capas -- sin esto, los huecos
          entre los picos afilados de mtn-mountains son transparentes y se ve
          el patrón de fondo de la página por detrás en vez de un hueco de
          cielo limpio. */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-30 h-screen ${
          stateClass ? "bg-[var(--granite)]" : ""
        }`}
        aria-hidden="true"
      >
        {LAYERS.map((layer) => (
          <div key={layer} className={`mtn-curtain mtn-layer ${layer} ${stateClass}`} />
        ))}
        {/* Árboles sueltos sobre la capa de árboles, ver mtn-trees-deco en
            globals.css -- viajan con la misma animación que mtn-trees pero
            sin su clip-path, para no perder la copa por encima del terreno. */}
        <div className={`mtn-curtain mtn-layer mtn-trees-deco ${stateClass}`}>
          {CURTAIN_TREES.map((tree, i) => (
            <div
              key={i}
              className="tree-cutout"
              data-min-w={tree.minW}
              style={{
                left: tree.left,
                top: tree.top,
                height: tree.height,
                aspectRatio: tree.aspectRatio,
                WebkitMaskImage: `url(/${tree.png})`,
                maskImage: `url(/${tree.png})`,
              }}
            />
          ))}
        </div>
      </div>
    </CurtainContext.Provider>
  );
}
