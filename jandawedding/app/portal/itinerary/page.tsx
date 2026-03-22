import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { eventsForGuestGroup } from "@/lib/guest-data";
import { getLocale } from "@/lib/locale";

export default async function ItineraryPage() {
  const guest = await getAuthenticatedGuest();
  if (!guest) redirect("/login");

  const [events, locale] = await Promise.all([
    eventsForGuestGroup(guest.group),
    getLocale(),
  ]);

  const t =
    locale === "es"
      ? {
          label: "Ana & Joshua · Agenda",
          heading: "Tu Agenda",
          sub: "Los eventos que hemos preparado para ti durante el fin de semana.",
          at: "en",
          empty: "Tu agenda estará disponible próximamente.",
        }
      : {
          label: "Ana & Joshua · Itinerary",
          heading: "Your Itinerary",
          sub: "The events we've planned for you across the weekend.",
          at: "at",
          empty: "Your itinerary will be available soon.",
        };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="px-1">
        <p
          className="text-xs uppercase tracking-[0.32em]"
          style={{ color: "#c9a0a0" }}
        >
          {t.label}
        </p>
        <h1
          className="mt-2 font-serif italic"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#2d1f14" }}
        >
          {t.heading}
        </h1>
        <p className="mt-1 text-sm leading-6" style={{ color: "#8a7060" }}>
          {t.sub}
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-sm" style={{ color: "#8a7060" }}>
          {t.empty}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl p-6"
              style={{
                border: "1px solid #e8ddd4",
                background: "rgba(251, 244, 232, 0.92)",
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
              <div className="my-3 h-px" style={{ background: "#e8ddd4" }} />
              <h2
                className="font-serif italic"
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                  color: "#2d1f14",
                }}
              >
                {event.title}
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#6b5444" }}>
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
        </div>
      )}
    </div>
  );
}
