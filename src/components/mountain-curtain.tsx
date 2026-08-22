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
        {/* Árboles sueltos sobre la capa de árboles, ver mtn-trees-deco en
            globals.css -- viajan con la misma animación que mtn-trees pero
            sin su clip-path, para no perder la copa por encima del terreno. */}
        <div className={`mtn-curtain mtn-layer mtn-trees-deco ${stateClass}`}>
          <div
            className="tree-cutout"
            style={{
              left: "50%",
              top: "12%",
              height: "20vh",
              aspectRatio: "125 / 242",
              WebkitMaskImage: "url(/first-tree-green.png)",
              maskImage: "url(/first-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "62%",
              top: "10.23%",
              height: "20vh",
              aspectRatio: "103 / 299",
              WebkitMaskImage: "url(/second-tree-green.png)",
              maskImage: "url(/second-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "38%",
              top: "11.48%",
              height: "20vh",
              aspectRatio: "75 / 391",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "8%",
              top: "11.59%",
              height: "20vh",
              aspectRatio: "179 / 217",
              WebkitMaskImage: "url(/fourth-tree-green.png)",
              maskImage: "url(/fourth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "46%",
              top: "11.51%",
              height: "20vh",
              aspectRatio: "124 / 195",
              WebkitMaskImage: "url(/fifth-tree-green.png)",
              maskImage: "url(/fifth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "58%",
              top: "12.31%",
              height: "20vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "94%",
              top: "13.37%",
              height: "20vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "15%",
              top: "11.79%",
              height: "20vh",
              aspectRatio: "179 / 394",
              WebkitMaskImage: "url(/eighth-tree-green.png)",
              maskImage: "url(/eighth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "23%",
              top: "9.08%",
              height: "20vh",
              aspectRatio: "113 / 267",
              WebkitMaskImage: "url(/ninth-tree-green.png)",
              maskImage: "url(/ninth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "30%",
              top: "8.02%",
              height: "20vh",
              aspectRatio: "115 / 310",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "70%",
              top: "8.14%",
              height: "20vh",
              aspectRatio: "91 / 362",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "78%",
              top: "10.47%",
              height: "20vh",
              aspectRatio: "113 / 471",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "86%",
              top: "10.75%",
              height: "20vh",
              aspectRatio: "118 / 357",
              WebkitMaskImage: "url(/thirteenth-tree-green.png)",
              maskImage: "url(/thirteenth-tree-green.png)",
            }}
          />
        </div>
      </div>
    </CurtainContext.Provider>
  );
}
