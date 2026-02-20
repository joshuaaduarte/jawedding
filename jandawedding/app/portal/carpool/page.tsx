import { CarpoolBoard } from "@/components/carpool-board";
import { getAllCarpoolEntries } from "@/lib/carpool-store";
import Image from "next/image";
import { TEMP_IMAGES } from "@/lib/temp-images";
import { getLocale } from "@/lib/locale";

export default async function CarpoolPage() {
  const entries = await getAllCarpoolEntries();
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        carpool: "Auto Compartido",
        title: "Centro De Viajes Compartidos",
        intro:
          "La boda es en Monterey, CA, y muchos invitados volarán a SFO, OAK o SJC. Si tienes espacio en tu auto o necesitas transporte, coordina aquí.",
        routePhotos: "Fotos de la ruta",
      }
    : {
        carpool: "Carpool",
        title: "Ride Share Hub",
        intro:
          "The wedding is in Monterey, CA, and many guests may fly into SFO, OAK, or SJC before driving over. If you have extra seats or want to share a ride, post below and coordinate directly.",
        routePhotos: "Route photos",
      };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.carpool}</p>
            <h2 className="mt-2 font-serif text-4xl text-stone-900">{t.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              {t.intro}
            </p>
          </div>
          <div className="relative h-44 overflow-hidden rounded-2xl border border-stone-200">
            <Image src={TEMP_IMAGES.coast} alt="Carpool placeholder" fill className="object-cover" />
          </div>
        </div>
        <div className="mt-7">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.routePhotos}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {[TEMP_IMAGES.moment1, TEMP_IMAGES.moment2, TEMP_IMAGES.moment4].map((imageSrc, index) => (
              <div key={imageSrc} className="relative h-36 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <Image src={imageSrc} alt={`Carpool route ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CarpoolBoard initialEntries={entries} locale={locale} />
    </div>
  );
}
