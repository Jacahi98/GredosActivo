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
          {/* Repoblacion densa: copias de los tipos pino (tronco largo,
              copa suelta -- 3, 7, 8, 9, 10, 11, 12), generadas con un
              reparto que evita colocar dos copias del mismo recorte en
              posiciones consecutivas, con altura y espejo variables. */}
          <div
            className="tree-cutout"
            style={{
              left: "1.0%",
              top: "12.83%",
              height: "17.1vh",
              aspectRatio: "91 / 362",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "2.8%",
              top: "12.6%",
              height: "16.5vh",
              aspectRatio: "75 / 391",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "4.6%",
              top: "12.21%",
              height: "18.6vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "6.4%",
              top: "11.82%",
              height: "19.6vh",
              aspectRatio: "113 / 471",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "10.0%",
              top: "11.52%",
              height: "19.0vh",
              aspectRatio: "179 / 394",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eighth-tree-green.png)",
              maskImage: "url(/eighth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "11.8%",
              top: "11.62%",
              height: "16.6vh",
              aspectRatio: "118 / 434",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "13.6%",
              top: "11.76%",
              height: "21.8vh",
              aspectRatio: "91 / 362",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "17.2%",
              top: "11.55%",
              height: "17.6vh",
              aspectRatio: "118 / 434",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "19.0%",
              top: "11.02%",
              height: "22.6vh",
              aspectRatio: "113 / 471",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "20.8%",
              top: "10.21%",
              height: "18.8vh",
              aspectRatio: "75 / 391",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "24.4%",
              top: "8.43%",
              height: "16.3vh",
              aspectRatio: "113 / 471",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "26.2%",
              top: "7.84%",
              height: "18.0vh",
              aspectRatio: "91 / 362",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "28.0%",
              top: "7.67%",
              height: "16.8vh",
              aspectRatio: "179 / 394",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eighth-tree-green.png)",
              maskImage: "url(/eighth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "31.6%",
              top: "8.64%",
              height: "21.7vh",
              aspectRatio: "75 / 391",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "33.4%",
              top: "9.53%",
              height: "20.1vh",
              aspectRatio: "91 / 362",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "35.2%",
              top: "10.44%",
              height: "18.6vh",
              aspectRatio: "113 / 267",
              WebkitMaskImage: "url(/ninth-tree-green.png)",
              maskImage: "url(/ninth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "40.6%",
              top: "11.79%",
              height: "16.4vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "42.4%",
              top: "11.73%",
              height: "17.4vh",
              aspectRatio: "75 / 391",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "44.2%",
              top: "11.58%",
              height: "19.0vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "47.8%",
              top: "11.62%",
              height: "20.1vh",
              aspectRatio: "118 / 434",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "51.4%",
              top: "12.32%",
              height: "18.1vh",
              aspectRatio: "118 / 434",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "53.2%",
              top: "12.69%",
              height: "20.9vh",
              aspectRatio: "91 / 362",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "55.0%",
              top: "12.84%",
              height: "20.0vh",
              aspectRatio: "115 / 310",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "60.4%",
              top: "11.17%",
              height: "22.1vh",
              aspectRatio: "75 / 391",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "64.0%",
              top: "9.09%",
              height: "18.0vh",
              aspectRatio: "115 / 310",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "65.8%",
              top: "8.33%",
              height: "16.8vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "67.6%",
              top: "7.96%",
              height: "21.3vh",
              aspectRatio: "113 / 471",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "73.0%",
              top: "9.09%",
              height: "19.4vh",
              aspectRatio: "113 / 471",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "74.8%",
              top: "9.73%",
              height: "20.7vh",
              aspectRatio: "91 / 362",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eleventh-tree-green.png)",
              maskImage: "url(/eleventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "76.6%",
              top: "10.24%",
              height: "20.0vh",
              aspectRatio: "115 / 310",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "80.2%",
              top: "10.58%",
              height: "18.2vh",
              aspectRatio: "113 / 267",
              WebkitMaskImage: "url(/ninth-tree-green.png)",
              maskImage: "url(/ninth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "82.0%",
              top: "10.54%",
              height: "20.2vh",
              aspectRatio: "118 / 434",
              WebkitMaskImage: "url(/seventh-tree-green.png)",
              maskImage: "url(/seventh-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "83.8%",
              top: "10.53%",
              height: "19.2vh",
              aspectRatio: "115 / 310",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "87.4%",
              top: "11.09%",
              height: "22.6vh",
              aspectRatio: "115 / 310",
              WebkitMaskImage: "url(/tenth-tree-green.png)",
              maskImage: "url(/tenth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "89.2%",
              top: "11.71%",
              height: "20.6vh",
              aspectRatio: "179 / 394",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/eighth-tree-green.png)",
              maskImage: "url(/eighth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "91.0%",
              top: "12.43%",
              height: "20.9vh",
              aspectRatio: "75 / 391",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/third-tree-green.png)",
              maskImage: "url(/third-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "96.4%",
              top: "13.43%",
              height: "23.0vh",
              aspectRatio: "179 / 394",
              WebkitMaskImage: "url(/eighth-tree-green.png)",
              maskImage: "url(/eighth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "98.2%",
              top: "12.96%",
              height: "18.0vh",
              aspectRatio: "113 / 471",
              WebkitMaskImage: "url(/twelfth-tree-green.png)",
              maskImage: "url(/twelfth-tree-green.png)",
            }}
          />
          {/* Mas copias del arbol 6 (redondo tupido, fila de arriba),
              repartidas en los huecos que quedaban entre los demas. */}
          <div
            className="tree-cutout"
            style={{
              left: "5.4%",
              top: "12.03%",
              height: "21.7vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "15.8%",
              top: "11.76%",
              height: "17.4vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "28.8%",
              top: "7.75%",
              height: "19.1vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "36.6%",
              top: "11.04%",
              height: "17.7vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "39.2%",
              top: "11.7%",
              height: "19.2vh",
              aspectRatio: "130 / 247",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "47.0%",
              top: "11.55%",
              height: "19.3vh",
              aspectRatio: "130 / 247",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "52.2%",
              top: "12.5%",
              height: "17.4vh",
              aspectRatio: "130 / 247",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "56.1%",
              top: "12.77%",
              height: "19.1vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "69.1%",
              top: "7.99%",
              height: "20.7vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "71.7%",
              top: "8.62%",
              height: "17.3vh",
              aspectRatio: "130 / 247",
              transform: "translate(-50%, -100%) scaleX(-1)",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "75.6%",
              top: "9.98%",
              height: "19.9vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "84.7%",
              top: "10.58%",
              height: "20.1vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "92.5%",
              top: "12.98%",
              height: "18.8vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "95.1%",
              top: "13.49%",
              height: "18.8vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
          <div
            className="tree-cutout"
            style={{
              left: "99.0%",
              top: "12.63%",
              height: "20.3vh",
              aspectRatio: "130 / 247",
              WebkitMaskImage: "url(/sixth-tree-green.png)",
              maskImage: "url(/sixth-tree-green.png)",
            }}
          />
        </div>
      </div>
    </CurtainContext.Provider>
  );
}
