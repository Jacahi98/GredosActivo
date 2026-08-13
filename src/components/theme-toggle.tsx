"use client";

import { useRef } from "react";

function applyTheme(next: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("gredos-theme", next);
}

// Silueta de sierra (no un círculo, a propósito — GredosActivo necesita su
// propia identidad frente al círculo de DesafioPicota) que barre la
// pantalla de arriba abajo revelando el tema nuevo, como el perfil de la
// Sierra de Gredos recortado contra el cielo al amanecer/atardecer.
// Los puntos van A MANO, no generados al azar — una primera versión con
// alturas aleatorias alternaba demasiado brusco entre puntos vecinos y
// parecía goteo de agua, no una sierra. Aquí hay tres picos reconocibles
// (uno dominante en el centro, dos satélite más bajos) con transiciones
// graduales entre puntos vecinos, como una silueta de montaña de verdad.
// START: los mismos puntos en x, todos a y=0% — nada revelado. END: los
// mismos puntos en x con la altura de cada pico/valle — todos rebasan 100%
// para garantizar cobertura completa al final. Ambos estados comparten
// número y orden de puntos para que el navegador interpole cada uno por
// separado (los navegadores sí interpolan basic-shape polygon() punto a
// punto cuando la estructura coincide).
const RIDGE_X = [0, 100, 100, 92, 82, 72, 64, 56, 48, 40, 32, 24, 16, 8, 0];
const RIDGE_END_Y = [0, 0, 152, 128, 150, 138, 122, 145, 108, 130, 152, 118, 148, 155, 150];

function polygonAt(progress: number): string {
  const points = RIDGE_X.map((x, i) => `${x}% ${(RIDGE_END_Y[i] * progress).toFixed(1)}%`);
  return `polygon(${points.join(", ")})`;
}

export function useThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      applyTheme(next);
      return;
    }

    const transition = document.startViewTransition(() => applyTheme(next));

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [polygonAt(0), polygonAt(1)] },
        { duration: 900, easing: "ease-in-out", fill: "forwards", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return { buttonRef, toggleTheme };
}

export function ThemeToggle() {
  const { buttonRef, toggleTheme } = useThemeToggle();

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar entre modo claro y oscuro"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-dim)] transition-colors hover:border-[var(--pine)] hover:text-[var(--pine)]"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="icon-light"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="icon-dark"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.5" />
        <path
          strokeLinecap="round"
          d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
        />
      </svg>
    </button>
  );
}
