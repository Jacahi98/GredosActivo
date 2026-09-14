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
// Lado del icono en reposo. En movil se recorta a 36 px con max-w-9 desde
// dock-nav.tsx para que los seis quepan en 320 px de ancho.
const BASE_WIDTH = 40;

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
          "mx-auto flex w-fit gap-2 rounded-2xl px-3 sm:gap-4 sm:px-4",
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

function DockItem({ children, className, onClick }: DockItemProps) {
  const { magnification, spring, hoverCapable } = useDock();

  const isHovered = useMotionValue(0);

  // Solo se amplia el icono senalado. Antes la anchura salia de la distancia
  // al puntero, asi que los dos o tres de al lado crecian tambien; en una fila
  // de seis eso desplaza a todos los demas y se lee como si el dock se hubiera
  // descentrado, en vez de como un elemento destacandose.
  const widthTransform = useTransform(
    isHovered,
    [0, 1],
    [BASE_WIDTH, hoverCapable ? magnification : BASE_WIDTH]
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
