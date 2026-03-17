import { redirect } from "next/navigation";
import Image from "next/image";
import { getAuthenticatedGuest } from "@/lib/auth";
import { eventsForGuestGroup } from "@/lib/guest-data";
import { getRsvpByGuestId } from "@/lib/rsvp-store";
import { RsvpForm } from "@/components/rsvp-form";
import { PHOTOS } from "@/lib/photos";
import { getLocale } from "@/lib/locale";

export default async function PortalPage() {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const [events, existingRsvp, locale] = await Promise.all([
    eventsForGuestGroup(guest.group),
    getRsvpByGuestId(guest.id),
    getLocale(),
  ]);

  const t =
    locale === "es"
      ? {
          note: "Un Mensaje Para Ti",
          rsvp: "Confirmación",
          at: "en",
          gallery: "Galería Del Fin De Semana",
          galleryHint: "Espacios para subir fotos de ustedes y sus invitados.",
          rsvpText:
            "Por favor confirma antes del 31 de julio de 2026. Puedes actualizar tu respuesta cuando quieras.",
        }
      : {
          note: "A Note For You",
          rsvp: "RSVP",
          at: "at",
          gallery: "Weekend Gallery",
          galleryHint: "Slots for your couple photos and guest moments.",
          rsvpText:
            "Please submit your RSVP by July 31, 2026. You can return and update your response anytime.",
        };

  return (
    <div className="space-y-6">
      {/* Personalised note */}
      {guest.anecdote ? (
        <section className="grid gap-4 rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.note}</p>
            <p className="mt-3 text-sm leading-7 text-stone-700">{guest.anecdote}</p>
          </div>
          <div className="relative h-44 overflow-hidden rounded-2xl border border-stone-200">
            <Image src={PHOTOS.venue} alt="Guest note" fill className="object-cover" />
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm">
        <h2 className="font-serif text-3xl text-stone-900">{t.gallery}</h2>
        <p className="mt-1 text-sm text-stone-600">{t.galleryHint}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {([PHOTOS.moment1, PHOTOS.moment2, PHOTOS.moment3, PHOTOS.moment4] as const).map(
            (src, index) => (
              <div
                key={src}
                className={`relative h-40 overflow-hidden rounded-2xl border border-stone-200 shadow-sm ${
                  index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
                }`}
              >
                <Image src={src} alt={`Gallery ${index + 1}`} fill className="object-cover" />
              </div>
            ),
          )}
        </div>
      </section>

      {/* Event timeline */}
      {events.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-stone-200 bg-white p-5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                {event.dayLabel} · {event.eventDate}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-stone-900">{event.title}</h2>
              <p className="mt-2 text-sm leading-7 text-stone-700">
                {event.time} {t.at} {event.location}
              </p>
            </article>
          ))}
        </section>
      ) : null}

      {/* RSVP */}
      <section className="rounded-3xl border border-stone-800 bg-stone-800 p-8 text-stone-50">
        <h2 className="font-serif text-4xl">{t.rsvp}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-200">{t.rsvpText}</p>
        <RsvpForm defaultRecord={existingRsvp} locale={locale} />
      </section>
    </div>
  );
}
