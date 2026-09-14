"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_PANEL_HEIGHT = 64;
// Lado del icono en reposo. En movil se recorta con max-w-* desde
// dock-nav.tsx para que los seis quepan en 320 px de ancho.
const BASE_WIDTH = 40;
// El icono de la pagina en la que estas va siempre mas grande, tambien en
// tactil: es lo unico que dice "estas aqui" junto al color y el punto. Se
// queda por debajo de la altura util de la pildora (54 px) para no asomar
// por arriba como hace la magnificacion al pasar el raton.
const ACTIVE_WIDTH = 52;

export type DockProps = {
  children: React.ReactNode;
  className?: string;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

export type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  /** El de la pagina actual: se queda ampliado de forma permanente. */
  active?: boolean;
};

export type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

export type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

export type DocContextType = {
  spring: SpringOptions;
  magnification: number;
  hoverCapable: boolean;
};

export type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

// Un dedo no tiene hover. iOS dispara mousemove y pointerenter sinteticos al
// tocar, pero nunca el mouseleave correspondiente, asi que el icono que
// pulsabas para navegar se quedaba ampliado y con su etiqueta abierta al
// llegar a la pagina nueva. La magnificacion solo existe donde hay un puntero
// de verdad; en tactil el dock se queda quieto.
//
// Arranca en false para que el HTML del servidor sea el estado en reposo, que
// es el mismo que se ve hasta que alguien pasa el raton: no hay salto al
// hidratar.
function useHoverCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCapable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return capable;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within an DockProvider");
  }
  return context;
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const hoverCapable = useHoverCapable();
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4);
  }, [magnification]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{
        height: height,
        scrollbarWidth: "none",
      }}
      className="mx-2 flex max-w-full items-end overflow-visible"
    >
      <motion.div
        onMouseEnter={hoverCapable ? () => isHovered.set(1) : undefined}
        onMouseLeave={hoverCapable ? () => isHovered.set(0) : undefined}
        className={cn(
          // items-center, no el stretch por defecto: los DockItem llevan
          // aspect-square y los motores no se ponen de acuerdo en si eso gana
          // al estirado. Chrome los estiraba a los 54 px de la fila y los
          // centraba de rebote; Safari respetaba la proporcion, dejaba la caja
          // en 36x36 y la pegaba arriba, con el hueco debajo. Centrando a mano
          // los dos hacen lo mismo.
          "mx-auto flex w-fit items-center gap-1.5 rounded-2xl px-3 sm:gap-4 sm:px-4",
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ spring, magnification, hoverCapable }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className, onClick, active = false }: DockItemProps) {
  const { magnification, spring, hoverCapable } = useDock();

  const isHovered = useMotionValue(0);

  const reposo = active ? ACTIVE_WIDTH : BASE_WIDTH;

  // Solo se amplia el icono senalado. Antes la anchura salia de la distancia
  // al puntero, asi que los dos o tres de al lado crecian tambien; en una fila
  // de seis eso desplaza a todos los demas y se lee como si el dock se hubiera
  // descentrado, en vez de como un elemento destacandose.
  const widthTransform = useTransform(
    isHovered,
    [0, 1],
    [reposo, hoverCapable ? magnification : reposo]
  );

  const width = useSpring(widthTransform, spring);

  return (
    <motion.div
      style={{ width }}
      onHoverStart={hoverCapable ? () => isHovered.set(1) : undefined}
      onHoverEnd={hoverCapable ? () => isHovered.set(0) : undefined}
      onFocus={hoverCapable ? () => isHovered.set(1) : undefined}
      onBlur={hoverCapable ? () => isHovered.set(0) : undefined}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      onClick={onClick}
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { width, isHovered } as object)
      )}
    </motion.div>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps["isHovered"] as MotionValue<number>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border px-2 py-0.5 text-xs",
            className
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps["width"] as MotionValue<number>;

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn("flex items-center justify-center", className)}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
