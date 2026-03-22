import Image from "next/image";
import { TEMP_IMAGES } from "@/lib/temp-images";
import { getLocale } from "@/lib/locale";

const STAYS = [
  {
    name: "Monterey Plaza Hotel & Spa",
    area: "Cannery Row",
    areaEs: "Cannery Row",
    note: "Waterfront option, around 15 minutes from venue.",
    noteEs: "Opción frente al mar, a unos 15 minutos del venue.",
  },
  {
    name: "Portola Hotel & Spa",
    area: "Downtown Monterey",
    areaEs: "Centro de Monterey",
    note: "Great central option for groups and families.",
    noteEs: "Excelente opción central para grupos y familias.",
  },
  {
    name: "Carmel Mission Inn",
    area: "Carmel-by-the-Sea",
    areaEs: "Carmel junto al Mar",
    note: "Close to Carmel restaurants and a short drive to events.",
    noteEs: "Cerca de los restaurantes de Carmel y a poca distancia de los eventos.",
  },
];

export default async function StayPage() {
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        section: "Hospedaje",
        title: "Dónde Quedarse",
        intro:
          "Recomendamos alojarse en Monterey o Carmel para tener mejor acceso a los eventos.",
        look: "Vista previa del área",
      }
    : {
        section: "Places To Stay",
        title: "Lodging",
        intro:
          "We recommend staying in Monterey or Carmel for easiest access to the wedding weekend events.",
        look: "Area look",
      };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            {t.section}
          </p>
          <h2 className="mt-2 font-serif text-4xl text-stone-900">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            {t.intro}
          </p>
        </div>
        <div className="relative h-44 overflow-hidden rounded-2xl border border-stone-200">
          <Image src={TEMP_IMAGES.venue} alt="Lodging placeholder" fill className="object-cover" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {STAYS.map((stay) => (
          <article
            key={stay.name}
            className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
          >
            <h3 className="font-serif text-2xl text-stone-900">{stay.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">
              {locale === "es" ? stay.areaEs : stay.area}
            </p>
            <p className="mt-2 text-sm text-stone-700">
              {locale === "es" ? stay.noteEs : stay.note}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-7">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.look}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {[TEMP_IMAGES.coast, TEMP_IMAGES.moment1, TEMP_IMAGES.moment4].map((imageSrc, index) => (
            <div key={imageSrc} className="relative h-36 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image src={imageSrc} alt={`Stay photo ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
