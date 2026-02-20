import Image from "next/image";
import { TEMP_IMAGES } from "@/lib/temp-images";

import { getLocale } from "@/lib/locale";

export default async function RegistryPage() {
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        registry: "Mesa De Regalos",
        title: "Regalos",
        intro:
          "Su presencia es nuestro mejor regalo. Si desean, aquí compartimos algunas opciones.",
        inspo: "Inspiración de regalos",
      }
    : {
        registry: "Registry",
        title: "Gift Registry",
        intro:
          "Your presence is the best gift. If you would like to celebrate with a gift, we have listed a few options below.",
        inspo: "Gift inspiration",
      };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.registry}</p>
          <h2 className="mt-2 font-serif text-4xl text-stone-900">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            {t.intro}
          </p>
        </div>
        <div className="relative h-44 overflow-hidden rounded-2xl border border-stone-200">
          <Image src={TEMP_IMAGES.hero} alt="Registry placeholder" fill className="object-cover" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <a
          href="#"
          className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-800"
        >
          Home Essentials Registry (placeholder link)
        </a>
        <a
          href="#"
          className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-800"
        >
          Honeymoon Fund (placeholder link)
        </a>
      </div>
      <div className="mt-7">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.inspo}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {[TEMP_IMAGES.moment2, TEMP_IMAGES.moment5, TEMP_IMAGES.moment6].map((imageSrc, index) => (
            <div key={imageSrc} className="relative h-36 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image src={imageSrc} alt={`Registry photo ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
