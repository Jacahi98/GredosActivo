"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // El navegador denegó el permiso de portapapeles; no hay nada más que intentar.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copiado` : `Copiar ${label}`}
      className="group inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-transparent text-[var(--text-faint)] transition-all hover:border-[var(--border)] hover:bg-[var(--granite-sunken)] hover:text-[var(--pine)] active:scale-90"
    >
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className="text-[var(--pine)]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
          className="transition-transform group-hover:scale-110"
        >
          <rect x="9" y="9" width="11" height="11" rx="1.5" />
          <path strokeLinecap="round" d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
      )}
    </button>
  );
}
