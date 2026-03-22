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
          guestLogin: "Ingresar",
          weMarried: "Nos vamos a casar.",
          date: "Fecha",
          mainLocation: "Ubicación",
          ceremony: "Ceremonia",
          reception: "Recepción",
          photoWall: "Nuestros Momentos",
          photoHint: "Una colección de nuestros recuerdos favoritos.",
          rsvpDeadline: "Fecha Límite de RSVP",
        }
      : {
          saveDate: "Save The Date",
          guestLogin: "Guest Login",
          weMarried: "We are getting married.",
          date: "Date",
          mainLocation: "Location",
          ceremony: "Ceremony",
          reception: "Reception",
          photoWall: "Our Moments",
          photoHint: "A collection of our favourite memories together.",
          rsvpDeadline: "RSVP Deadline",
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
          className="flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-md"
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
              September 4, 2026 &nbsp;·&nbsp; Monterey, California
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
            { label: t.date, value: "Friday, September 4, 2026" },
            { label: t.ceremony, value: "Carmel Mission Basilica · 2:00 PM" },
            { label: t.reception, value: "Fairview Laguna Seca · 5:00 PM" },
            { label: t.rsvpDeadline, value: "July 31, 2026" },
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

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            {/* Large feature left */}
            <div
              className="relative overflow-hidden rounded-[1.5rem] md:col-span-7"
              style={{ height: "clamp(260px, 38vw, 490px)" }}
            >
              <Image
                src={PHOTOS.moment1}
                alt="Featured moment"
                fill
                className="object-cover"
              />
            </div>
            {/* Right column stacked */}
            <div className="flex flex-col gap-3 md:col-span-5">
              <div
                className="relative overflow-hidden rounded-[1.5rem]"
                style={{ height: "clamp(130px, 18vw, 238px)" }}
              >
                <Image
                  src={PHOTOS.moment2}
                  alt="Moment 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="relative overflow-hidden rounded-[1.5rem]"
                style={{ height: "clamp(130px, 18vw, 238px)" }}
              >
                <Image
                  src={PHOTOS.moment3}
                  alt="Moment 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Lower strip */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {([PHOTOS.moment4, PHOTOS.moment5, PHOTOS.moment6] as const).map(
              (src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: "clamp(100px, 14vw, 190px)" }}
                >
                  <Image
                    src={src}
                    alt={`Moment ${i + 4}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </section>

        {/* ── Cinematic bottom trio ── */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {([PHOTOS.coast, PHOTOS.venue, PHOTOS.portrait] as const).map(
            (src, i) => (
              <div
                key={src}
                className="relative overflow-hidden rounded-2xl"
                style={{ height: "clamp(100px, 14vw, 190px)" }}
              >
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ),
          )}
        </div>

        {/* ── Footer whisper ── */}
        <p
          className="mt-16 text-center text-xs uppercase tracking-[0.38em]"
          style={{ color: "#c9a0a0" }}
        >
          Ana Lima &amp; Joshua Duarte &nbsp;·&nbsp; September 4, 2026
        </p>
      </div>
    </main>
  );
}
