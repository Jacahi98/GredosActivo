import Image from "next/image";

// Sección de ganadería: una seña de identidad del negocio, no un servicio.
// Va deliberadamente como franja aparte y NO como tarjeta junto a las de
// turismo activo y gasolinera, y sin botón ni "más información →": esos
// elementos la leerían como un producto contratable, que no lo es. El fondo
// distinto y el ancho completo la separan del bloque comercial de arriba.

export function GanaderiaSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--granite-sunken)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--sky)]">
          Ganadería
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl leading-[1.15] text-[var(--ink)] sm:text-4xl">
          El pueblo también se sostiene pastando.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="space-y-4 text-justify text-[17px] leading-relaxed text-[var(--text-dim)]">
            <p>
              Junto al turismo activo y la estación de servicio, mantenemos ganado avileño en
              extensivo por los pastos de la sierra. La avileña-negra ibérica es la raza de aquí:
              de Ávila, criada durante siglos en estas mismas laderas porque aguanta el frío, la
              altura y el pasto duro de Gredos.
            </p>
            <p>
              El ganado que pasta suelto mantiene el monte abierto y los pastos vivos, y con ellos
              los muros de piedra y los caminos que llevan siglos ordenando estas laderas. Un monte
              cuidado arde menos y se recorre mejor: la misma sierra por la que vienen a rodar en
              bici o a tirarse por una tirolina.
            </p>
            <p>
              Detrás hay algo más simple: los pueblos se sostienen cuando hay con qué quedarse. Cada
              negocio que sigue abierto en Navarredonda —la gasolinera, las actividades, el
              ganado— es una razón menos para marcharse y una razón más para que el pueblo siga
              siendo un pueblo y no un sitio de paso.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src="/photos/ganaderia-dehesa.webp"
                alt="Pastos de la sierra de Gredos con muros de piedra seca y ganado al fondo"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src="/photos/ganaderia-vaca-ternero.webp"
                alt="Vaca avileña-negra ibérica con su ternero en el pasto"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src="/photos/ganaderia-pastando.webp"
                alt="Vaca avileña y su ternero caminando junto al muro de piedra"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
