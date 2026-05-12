import Image from "next/image";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home() {
  const locale = await getLocale();
  const t =
    locale === "es"
      ? {
          saveDate: "Reserva La Fecha",
          guestLogin: "Entrar",
          weMarried: "Nos vamos a casar!",
          date: "Fecha",
          mainLocation: "Ubicación",
          ceremony: "Ceremonia",
          reception: "Recepción",
          photoWall: "Nuestros Momentos",
          photoHint: "Una colección de nuestros recuerdos favoritos.",
          rsvpDeadline: "Fecha Límite de RSVP",
          heroDate: "4 de Septiembre de 2026 · Monterey, California",
          dateValue: "Viernes, 4 de Septiembre de 2026",
          ceremonyValue: "Carmel Mission Basilica · 2:00 PM",
          receptionValue: "Fairview Laguna Seca · 5:00 PM",
          rsvpDeadlineValue: "31 de Julio de 2026",
        }
      : {
          saveDate: "Save The Date",
          guestLogin: "Login",
          weMarried: "We are getting married!",
          date: "Date",
          mainLocation: "Location",
          ceremony: "Ceremony",
          reception: "Reception",
          photoWall: "Our Moments",
          photoHint: "A collection of our favourite memories together.",
          rsvpDeadline: "RSVP Deadline",
          heroDate: "September 4, 2026 · Monterey, California",
          dateValue: "Friday, September 4, 2026",
          ceremonyValue: "Carmel Mission Basilica · 2:00 PM",
          receptionValue: "Fairview Laguna Seca · 5:00 PM",
          rsvpDeadlineValue: "July 31, 2026",
        };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #fbf4e8 0%, #f5f0e8 45%, #edf1ee 100%)",
      }}
    >
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-10">
        <header
          className="flex items-center justify-between rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 backdrop-blur-md"
          style={{
            border: "1px solid #e8ddd4",
            background: "rgba(251, 244, 232, 0.88)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.38em]"
            style={{ color: "#c9a0a0" }}
          >
            {t.saveDate}
          </p>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href="/login"
              className="inline-flex h-9 items-center rounded-full px-5 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-85"
              style={{ background: "#2d1f14" }}
            >
              {t.guestLogin}
            </a>
          </div>
        </header>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-28 sm:px-10">
        {/* ── Hero ── */}
        <section
          className="relative mt-4 overflow-hidden rounded-[2.5rem]"
          style={{
            minHeight: "75vh",
            boxShadow: "0 28px 72px rgba(45,31,20,0.22)",
          }}
        >
          <Image
            src={PHOTOS.hero}
            alt="Ana & Joshua"
            fill
            priority
            quality={90}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20,10,5,0.84) 0%, rgba(20,10,5,0.28) 55%, rgba(20,10,5,0.05) 100%)",
            }}
          />

          {/* Corner label */}
          <div className="absolute left-8 top-8 sm:left-12 sm:top-10">
            <p
              className="text-xs uppercase tracking-[0.38em]"
              style={{ color: "#ddc8b4" }}
            >
              Ana &amp; Joshua
            </p>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-10 left-8 right-8 sm:bottom-14 sm:left-14 sm:right-14">
            <p
              className="mb-4 text-xs uppercase tracking-[0.32em]"
              style={{ color: "#c9a8a0" }}
            >
              {t.heroDate}
            </p>
            <h1
              className="font-serif italic leading-[1.06] text-white"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
            >
              {t.weMarried}
            </h1>
          </div>
        </section>

        {/* ── Info cards ── */}
        <section className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: t.date, value: t.dateValue },
            { label: t.ceremony, value: t.ceremonyValue },
            { label: t.reception, value: t.receptionValue },
            { label: t.rsvpDeadline, value: t.rsvpDeadlineValue },
          ].map((card) => (
            <article
              key={card.label}
              className="rounded-2xl p-5"
              style={{
                border: "1px solid #e8ddd4",
                background: "rgba(240, 228, 214, 0.42)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.24em]"
                style={{ color: "#c9a0a0" }}
              >
                {card.label}
              </p>
              <div className="my-3 h-px" style={{ background: "#e0d2c4" }} />
              <p className="text-sm leading-6" style={{ color: "#3d2b1f" }}>
                {card.value}
              </p>
            </article>
          ))}
        </section>

        {/* ── Photo wall ── */}
        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="text-xs uppercase tracking-[0.32em]"
                style={{ color: "#c9a0a0" }}
              >
                ✦ &nbsp; Ana &amp; Joshua
              </p>
              <h2
                className="mt-2 font-serif italic leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#2d1f14" }}
              >
                {t.photoWall}
              </h2>
            </div>
            <p
              className="max-w-xs text-sm leading-6"
              style={{ color: "#8a7060" }}
            >
              {t.photoHint}
            </p>
          </div>

          {/* Portrait-friendly masonry grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {/* Tall feature — spans 2 rows */}
            <div
              className="relative col-span-1 row-span-2 overflow-hidden rounded-[1.5rem]"
              style={{ minHeight: "clamp(360px, 52vw, 620px)" }}
            >
              <Image
                src={PHOTOS.moment1}
                alt="Featured moment"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Top-right portraits */}
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment11}
                alt="Golden Gate Bridge selfie"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment3}
                alt="Boat kiss at sunset"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment7}
                alt="Engagement ring at Texas A&M"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Bottom row portraits */}
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment4}
                alt="Berkeley graduation"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment5}
                alt="Texas A&M graduation"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem]"
              style={{ height: "clamp(170px, 25vw, 300px)" }}
            >
              <Image
                src={PHOTOS.moment8}
                alt="Marathon golden sign"
                fill
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Lower portrait strip */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {([PHOTOS.moment6, PHOTOS.coast, PHOTOS.portrait] as const).map(
              (src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: "clamp(180px, 28vw, 340px)" }}
                >
                  <Image
                    src={src}
                    alt={`Portrait ${i + 1}`}
                    fill
                    quality={90}
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </section>

        {/* ── Footer whisper ── */}
        <p
          className="mt-16 text-center text-xs uppercase tracking-[0.38em]"
          style={{ color: "#c9a0a0" }}
        >
          Ana Lima &amp; Joshua Duarte &nbsp;·&nbsp; {locale === "es" ? "4 de Septiembre de 2026" : "September 4, 2026"}
        </p>
      </div>
    </main>
  );
}
