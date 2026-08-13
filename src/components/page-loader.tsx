"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/logo-mark";

// Duración mínima del loader: lo justo para que la animación se vea
// completa aunque la página cargue al instante ("rápido" no es "sin
// transición", es "sin esperar de más") — no espera a nada externo salvo
// las fuentes, que es lo único que puede cambiar el layout tras aparecer.
// Solo se muestra en la primera carga real de la web; las transiciones
// entre páginas siguientes usan la View Transition de page-transition.tsx.
const MIN_VISIBLE_MS = 2600;

// El mismo lenguaje de "barrido con silueta de sierra" que el theme-toggle
// (ver theme-toggle.tsx) y las transiciones entre páginas (ver
// page-transition.tsx) — para que el loader no sea un efecto suelto, sino
// la primera vez que aparece un lenguaje visual que luego se repite. Puntos
// a mano, no aleatorios (una versión con alturas al azar parecía agua, no
// montaña — misma lección aplicada aquí desde el principio).
// Los valores TIENEN que superar 100 en todos los puntos — representan la
// distancia que recorre cada punto de la cresta, y si al final del barrido
// alguno se quedara por debajo de 100 esa parte del logo seguiría cortada
// para siempre. La variación entre puntos (108 a 158) es lo que dibuja los
// picos y valles DURANTE el barrido, aunque al final todos superen el 100%
// y quede completamente revelado.
const RIDGE_X = [0, 100, 100, 92, 82, 72, 64, 56, 48, 40, 32, 24, 16, 8, 0];
const RIDGE_Y = [0, 0, 152, 128, 150, 138, 122, 145, 108, 130, 152, 118, 148, 158, 150];

function ridgePolygon(progress: number, fromBelow: boolean): string {
  // fromBelow=true: nada visible al principio (revela desde abajo);
  // fromBelow=false: todo visible al principio (se retira hacia abajo).
  const p = fromBelow ? progress : 1 - progress;
  const points = RIDGE_X.map((x, i) => `${x}% ${(100 - RIDGE_Y[i] * p).toFixed(1)}%`);
  return `polygon(${points.join(", ")})`;
}

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setTimeout(() => setLoading(false), remaining);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--granite)]"
          >
            {/* Resplandor ambiental detrás del logo, crece y se disuelve —
                el toque "épico": el logo no solo aparece, entra con peso. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.35, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="pointer-events-none absolute h-[min(60vw,300px)] w-[min(60vw,300px)] rounded-full bg-[var(--gorse)] blur-3xl"
            />

            {/* El único efecto: el logo revelado por una silueta de sierra
                que sube desde abajo, como si saliera de detrás de la
                montaña. Sin layoutId ni "vuelo" hacia la cabecera — el
                logo aparece centrado y se disuelve donde está. */}
            <div className="relative w-[min(70vw,340px)] drop-shadow-[0_8px_32px_rgba(28,70,32,0.35)]">
              <motion.div
                initial={{ clipPath: ridgePolygon(0, true), scale: 0.92 }}
                animate={{ clipPath: ridgePolygon(1, true), scale: 1 }}
                exit={{ clipPath: ridgePolygon(1, false) }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <LogoMark role="img" aria-label="GredosActivo" className="h-auto w-full" />
              </motion.div>
            </div>

            <span className="sr-only">Cargando GredosActivo</span>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
