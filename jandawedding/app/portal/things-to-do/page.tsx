import Image from "next/image";
import { TEMP_IMAGES } from "@/lib/temp-images";
import { getLocale } from "@/lib/locale";

const THINGS_TO_DO = [
  {
    title: "17-Mile Drive",
    note: "Scenic coastal route with iconic ocean viewpoints.",
  },
  {
    title: "Monterey Bay Aquarium",
    note: "Perfect for family guests and ocean lovers.",
  },
  {
    title: "Carmel-by-the-Sea",
    note: "Walkable village with shops, coffee, and beach access.",
  },
  {
    title: "Point Lobos",
    note: "Great coastal trails and quick morning hikes.",
  },
];

export default async function ThingsToDoPage() {
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        section: "Qué Hacer",
        title: "Explora Monterey",
        intro:
          "Si vienes por el fin de semana, aquí tienes algunos lugares favoritos en Monterey y alrededores.",
        gallery: "Lugares lindos",
      }
    : {
        section: "Things To Do",
        title: "Explore Monterey",
        intro:
          "If you are making a weekend of it, here are a few favorite places in and around Monterey, CA.",
        gallery: "Cute spots",
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
          <Image src={TEMP_IMAGES.coast} alt="Monterey placeholder" fill className="object-cover" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {THINGS_TO_DO.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
          >
            <h3 className="font-serif text-2xl text-stone-900">{item.title}</h3>
            <p className="mt-2 text-sm text-stone-700">{item.note}</p>
          </article>
        ))}
      </div>
      <div className="mt-7">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.gallery}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {[TEMP_IMAGES.moment3, TEMP_IMAGES.moment5, TEMP_IMAGES.moment6].map((imageSrc, index) => (
            <div key={imageSrc} className="relative h-36 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image src={imageSrc} alt={`Things to do photo ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
