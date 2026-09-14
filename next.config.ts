import type { NextConfig } from "next";
import pkg from "./package.json";

const nextConfig: NextConfig = {
  // La versión se publica desde package.json, que es la única fuente de
  // verdad. Escribirla también a mano en un fichero de código es justo lo que
  // se desincroniza: pasó en otro proyecto, con el package-lock quedándose una
  // versión por detrás del resto. Al ir por env se sustituye en tiempo de
  // build, sin meter package.json entero en el bundle del cliente.
  env: { NEXT_PUBLIC_APP_VERSION: pkg.version },
};

export default nextConfig;
