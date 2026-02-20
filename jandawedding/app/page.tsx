import Image from "next/image";
import { TEMP_IMAGES } from "@/lib/temp-images";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home() {
  const locale = await getLocale();
  const t = locale === "es"
    ? {
        saveDate: "Reserva La Fecha",
        guestLogin: "Ingreso Invitados",
        adminLogin: "Ingreso Admin",
        weMarried: "Nos vamos a casar.",
        date: "Fecha",
        mainLocation: "Ubicación Principal",
        ceremony: "Ceremonia",
        reception: "Recepción",
        photoWall: "Nuestros Momentos",
        photoHint: "Espacios para tus fotos favoritas.",
      }
    : {
        saveDate: "Save The Date",
        guestLogin: "Guest Login",
        adminLogin: "Admin Login",
        weMarried: "We are getting married.",
        date: "Date",
        mainLocation: "Main Location",
        ceremony: "Ceremony",
        reception: "Reception",
        photoWall: "Our Photo Wall",
        photoHint: "Spots for your favorite moments together.",
      };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fbf4e8_0%,#f5f5f3_42%,#edf1ee_100%)] text-stone-800">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-8 sm:px-10 md:pt-14">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between md:px-5">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
            {t.saveDate}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <a
              href="/login"
              className="inline-flex h-10 items-center rounded-full bg-stone-800 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              {t.guestLogin}
            </a>
            <a href="/admin/login" className="inline-flex h-10 items-center px-2 text-xs uppercase tracking-[0.18em] text-stone-600 hover:text-stone-800">
              {t.adminLogin}
            </a>
          </div>
        </header>

        <div className="relative h-[560px] overflow-hidden rounded-[2.2rem] border border-stone-200 shadow-[0_18px_50px_rgba(59,39,20,0.14)]">
          <Image
            src={TEMP_IMAGES.hero}
            alt="Wedding hero placeholder"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
          <div className="absolute bottom-10 left-8 right-8 text-white sm:left-12 sm:right-12">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-100">
              Jane & Alex
            </p>
            <h1 className="mt-2 font-serif text-5xl leading-tight sm:text-6xl md:text-7xl">
              {t.weMarried}
            </h1>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.date}</p>
            <p className="mt-2 text-sm text-stone-700">Saturday, July 12, 2026</p>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
              {t.mainLocation}
            </p>
            <p className="mt-2 text-sm text-stone-700">Monterey, CA</p>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.ceremony}</p>
            <p className="mt-2 text-sm text-stone-700">
              West Garden, Monterey • 4:00 PM
            </p>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.reception}</p>
            <p className="mt-2 text-sm text-stone-700">Glasshouse, Monterey • 6:00 PM</p>
          </article>
        </div>

        <section className="mt-10 rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-500">♡</p>
              <h2 className="mt-1 font-serif text-3xl text-stone-900">{t.photoWall}</h2>
              <p className="mt-1 text-sm text-stone-600">{t.photoHint}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-12">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-stone-200 shadow-sm md:col-span-5 md:h-72">
              <Image src={TEMP_IMAGES.moment1} alt="Photo slot 1" fill className="object-cover" />
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl border border-stone-200 shadow-sm md:col-span-7 md:h-72">
              <Image src={TEMP_IMAGES.moment2} alt="Photo slot 2" fill className="object-cover" />
            </div>
            {[TEMP_IMAGES.moment3, TEMP_IMAGES.moment4, TEMP_IMAGES.moment5, TEMP_IMAGES.moment6].map(
              (imageSrc, index) => (
                <div
                  key={imageSrc}
                  className={`relative h-44 overflow-hidden rounded-2xl border border-stone-200 shadow-sm md:col-span-3 ${
                    index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
                  }`}
                >
                  <Image
                    src={imageSrc}
                    alt={`Wedding preview ${index + 3}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[TEMP_IMAGES.coast, TEMP_IMAGES.venue, TEMP_IMAGES.portrait].map((imageSrc, index) => (
            <div key={imageSrc} className="relative h-44 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image src={imageSrc} alt={`Wedding preview ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
