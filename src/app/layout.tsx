import type { Metadata } from "next";
import { Yeseva_One, Karla, JetBrains_Mono, Rubik } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { TopoLines } from "@/components/topo-lines";
import { PageLoader } from "@/components/page-loader";
import { MountainCurtainProvider } from "@/components/mountain-curtain";
import { DockNav } from "@/components/dock-nav";
import { Header } from "@/components/header";
import "./globals.css";

const yesevaOne = Yeseva_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const karla = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Solo para el logo vectorizado (ver logo-mark.tsx): Rubik Black es el tipo
// geométrico y muy pesado más cercano al "GREDOS" original (misma familia,
// en cursiva más ligera, para "activo" — letras sueltas, no una script
// unida). No se usan en ningún otro sitio del texto.
const rubik = Rubik({
  variable: "--font-logo-display",
  subsets: ["latin"],
  weight: ["600", "900"],
  style: ["normal", "italic"],
});

const SITE_DESCRIPTION =
  "Turismo activo en Navarredonda de Gredos, corazón de la Sierra de Gredos: bicicleta de montaña, parque de cuerda, paintball, tiro con arco y más.";

export const metadata: Metadata = {
  title: "GredosActivo",
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${yesevaOne.variable} ${karla.variable} ${jetbrainsMono.variable} ${rubik.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('gredos-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}",
          }}
        />
        <TopoLines />
        <MountainCurtainProvider>
          <MotionProvider>
            <PageLoader>
              <Header />
              {children}
            </PageLoader>
          </MotionProvider>
          <DockNav />
        </MountainCurtainProvider>
      </body>
    </html>
  );
}
