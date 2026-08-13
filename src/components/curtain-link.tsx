"use client";

import { useCurtainNavigate } from "@/components/mountain-curtain";

type CurtainLinkProps = React.ComponentPropsWithoutRef<"a"> & { href: string };

// Como next/link pero disparando la cortina de montañas (ver
// mountain-curtain.tsx) en vez de navegar al instante. Los clics
// modificados (cmd/ctrl/shift/alt, botón central) se dejan pasar sin
// interceptar, para no romper "abrir en pestaña nueva".
export function CurtainLink({ href, onClick, ...props }: CurtainLinkProps) {
  const navigate = useCurtainNavigate();

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
