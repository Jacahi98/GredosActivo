// Versión de la web, para el pie de página.
//
// El número vive en package.json y next.config.ts lo inyecta en tiempo de
// build (env.NEXT_PUBLIC_APP_VERSION). Para subirla, cambiar SOLO package.json
// -- no escribirla a mano aquí, que es como se desincronizan.
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
