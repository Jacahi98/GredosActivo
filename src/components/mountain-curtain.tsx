"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

// Duración larga a propósito, para poder revisar la silueta con calma —
// las mismas cifras están en globals.css (mtn-rise/mtn-fall), tienen
// que coincidir en los dos sitios.
const RISE_MS = 2200;
const HOLD_MS = 600;
const FALL_MS = 2200;

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
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30" aria-hidden="true">
        {LAYERS.map((layer) => (
          <div key={layer} className={`mtn-curtain mtn-layer ${layer} ${stateClass}`} />
        ))}
      </div>
    </CurtainContext.Provider>
  );
}
