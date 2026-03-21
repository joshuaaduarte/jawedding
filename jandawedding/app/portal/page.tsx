import { redirect } from "next/navigation";
import Image from "next/image";
import { getAuthenticatedGuest } from "@/lib/auth";
import { eventsForGuestGroup, getGuestsByInviteCode } from "@/lib/guest-data";
import { getRsvpsByGuestIds } from "@/lib/rsvp-store";
import { RsvpForm } from "@/components/rsvp-form";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

export default async function PortalPage() {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const [events, groupGuests, locale] = await Promise.all([
    eventsForGuestGroup(guest.group),
    getGuestsByInviteCode(guest.inviteCode),
    getLocale(),
  ]);
  const existingRsvps = await getRsvpsByGuestIds(groupGuests.map((g) => g.id));

  const t =
    locale === "es"
      ? {
          note: "Un Mensaje Para Ti",
          rsvp: "Confirmación",
          at: "en",
          gallery: "Galería",
          galleryHint: "Momentos que compartiremos juntos.",
          rsvpText:
            "Por favor confirma antes del 31 de julio de 2026. Puedes actualizar tu respuesta cuando quieras.",
        }
      : {
          note: "A Note For You",
          rsvp: "RSVP",
          at: "at",
          gallery: "Gallery",
          galleryHint: "Moments we'll share together.",
          rsvpText:
            "Please submit your RSVP by July 31, 2026. You can return and update your response anytime.",
        };

  return (
    <div className="space-y-5">
      {/* ── Personalised note ── */}
      {guest.anecdote ? (
        <section
          className="grid gap-0 overflow-hidden rounded-3xl md:grid-cols-[1fr_340px]"
          style={{
            border: "1px solid #e8ddd4",
            background: "rgba(251, 244, 232, 0.9)",
          }}
        >
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "#c9a0a0" }}
            >
              {t.note}
            </p>
            {/* Decorative quote mark */}
            <p
              className="mt-2 font-serif leading-none select-none"
              style={{ fontSize: "5rem", color: "#e8ddd4", lineHeight: 1 }}
              aria-hidden
            >
              &ldquo;
            </p>
            <p
              className="-mt-3 font-serif italic leading-8"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "#3d2b1f",
              }}
            >
              {guest.anecdote}
            </p>
          </div>
          <div className="relative hidden h-full min-h-[220px] md:block">
            <Image
              src={PHOTOS.venue}
              alt="Guest note"
              fill
              className="object-cover"
            />
          </div>
        </section>
      ) : null}

      {/* ── Gallery ── */}
      <section
        className="overflow-hidden rounded-3xl p-6 sm:p-8"
        style={{
          border: "1px solid #e8ddd4",
          background: "rgba(251, 244, 232, 0.9)",
        }}
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p
              className="text-xs uppercase tracking-[0.28em]"
              style={{ color: "#c9a0a0" }}
            >
              ✦ &nbsp; Ana &amp; Joshua
            </p>
            <h2
              className="mt-1 font-serif italic"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#2d1f14" }}
            >
              {t.gallery}
            </h2>
          </div>
          <p className="text-sm" style={{ color: "#8a7060" }}>
            {t.galleryHint}
          </p>
        </div>

        {/* 2+2 asymmetric grid */}
        <div className="grid grid-cols-12 gap-3">
          <div
            className="relative col-span-7 overflow-hidden rounded-2xl"
            style={{ height: "clamp(160px, 24vw, 320px)" }}
          >
            <Image
              src={PHOTOS.moment1}
              alt="Gallery 1"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="relative col-span-5 overflow-hidden rounded-2xl"
            style={{ height: "clamp(160px, 24vw, 320px)" }}
          >
            <Image
              src={PHOTOS.moment2}
              alt="Gallery 2"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="relative col-span-5 overflow-hidden rounded-2xl"
            style={{ height: "clamp(120px, 16vw, 210px)" }}
          >
            <Image
              src={PHOTOS.moment3}
              alt="Gallery 3"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="relative col-span-7 overflow-hidden rounded-2xl"
            style={{ height: "clamp(120px, 16vw, 210px)" }}
          >
            <Image
              src={PHOTOS.moment4}
              alt="Gallery 4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Event timeline ── */}
      {events.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl p-6"
              style={{
                border: "1px solid #e8ddd4",
                background: "rgba(251, 244, 232, 0.9)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: "#c9a0a0" }}
              >
                {event.dayLabel}
              </p>
              <p
                className="mt-0.5 text-xs uppercase tracking-[0.22em]"
                style={{ color: "#b08878" }}
              >
                {event.eventDate}
              </p>
              <div
                className="my-3 h-px"
                style={{ background: "#e8ddd4" }}
              />
              <h2
                className="font-serif italic"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "#2d1f14" }}
              >
                {event.title}
              </h2>
              <p
                className="mt-2 text-sm"
                style={{ color: "#6b5444" }}
              >
                {event.time}
                <span
                  className="mx-2 inline-block"
                  style={{ color: "#c9a0a0" }}
                  aria-hidden
                >
                  ·
                </span>
                {event.location}
              </p>
            </article>
          ))}
        </section>
      ) : null}

      {/* ── RSVP ── */}
      <section
        className="rounded-3xl p-8 sm:p-10"
        style={{ background: "#2d1f14" }}
      >
        <p
          className="text-xs uppercase tracking-[0.32em]"
          style={{ color: "#c9a0a0" }}
        >
          ✦ &nbsp; Ana &amp; Joshua
        </p>
        <h2
          className="mt-2 font-serif italic"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5ece0" }}
        >
          {t.rsvp}
        </h2>
        <p
          className="mt-3 max-w-2xl text-sm leading-7"
          style={{ color: "#c4a898" }}
        >
          {t.rsvpText}
        </p>
        <RsvpForm
          guests={groupGuests}
          existingRsvps={existingRsvps}
          locale={locale}
        />
      </section>
    </div>
  );
}
