import { redirect } from "next/navigation";
import { getAuthenticatedGuest } from "@/lib/auth";
import { eventsForGuestGroup, WeddingEvent } from "@/lib/guest-data";
import { getLocale } from "@/lib/locale";

function parseLocalDatetime(dt: string) {
  const [datePart, timePart = "00:00"] = dt.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return { year, month, day, hour, minute };
}

function toCalDatetime(p: ReturnType<typeof parseLocalDatetime>): string {
  return (
    `${p.year}` +
    `${String(p.month).padStart(2, "0")}` +
    `${String(p.day).padStart(2, "0")}` +
    `T${String(p.hour).padStart(2, "0")}` +
    `${String(p.minute).padStart(2, "0")}00`
  );
}

function buildGoogleCalUrl(event: WeddingEvent): string | null {
  if (!event.startDatetime) return null;
  const start = parseLocalDatetime(event.startDatetime);
  const end = { ...start, hour: (start.hour + 2) % 24 };
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toCalDatetime(start)}/${toCalDatetime(end)}`,
    location: event.location,
    ctz: "America/Los_Angeles",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Group events by their eventDate string, preserving order */
function groupByDay(events: WeddingEvent[]): [string, string, WeddingEvent[]][] {
  const map = new Map<string, { dayLabel: string; events: WeddingEvent[] }>();
  for (const e of events) {
    const key = e.eventDate;
    if (!map.has(key)) map.set(key, { dayLabel: e.dayLabel, events: [] });
    map.get(key)!.events.push(e);
  }
  return Array.from(map.entries()).map(([date, { dayLabel, events }]) => [
    dayLabel,
    date,
    events,
  ]);
}

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
          empty: "Tu agenda estará disponible próximamente.",
          addGoogle: "Google Calendar",
          addApple: "Apple / Outlook",
        }
      : {
          label: "Ana & Joshua · Itinerary",
          heading: "Your Itinerary",
          sub: "The events we've planned for you across the weekend.",
          empty: "Your itinerary will be available soon.",
          addGoogle: "Google Calendar",
          addApple: "Apple / Outlook",
        };

  const days = groupByDay(events);

  return (
    <div className="space-y-10">
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
        <div className="space-y-12">
          {days.map(([dayLabel, eventDate, dayEvents]) => (
            <section key={eventDate}>
              {/* Day header */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex flex-col">
                  <span
                    className="text-xs uppercase tracking-[0.32em]"
                    style={{ color: "#c9a0a0" }}
                  >
                    {dayLabel}
                  </span>
                  <span
                    className="mt-0.5 font-serif italic"
                    style={{
                      fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
                      color: "#2d1f14",
                    }}
                  >
                    {eventDate}
                  </span>
                </div>
                <div
                  className="flex-1 h-px"
                  style={{ background: "#e8ddd4" }}
                />
              </div>

              {/* Events for this day */}
              <div className="space-y-3">
                {dayEvents.map((event) => {
                  const googleUrl = buildGoogleCalUrl(event);
                  return (
                    <article
                      key={event.id}
                      className="rounded-2xl p-6"
                      style={{
                        border: "1px solid #e8ddd4",
                        background: "rgba(251, 244, 232, 0.92)",
                      }}
                    >
                      <h2
                        className="font-serif italic"
                        style={{
                          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
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

                      {/* Address with map links */}
                      {event.address ? (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: "#8a7060" }}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className="shrink-0"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <a
                            href={`https://maps.apple.com/?q=${encodeURIComponent(event.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 transition hover:opacity-70"
                            style={{ color: "#8a5c5c" }}
                          >
                            {event.address}
                          </a>
                          <span className="mx-0.5" style={{ color: "#c9a0a0" }} aria-hidden>·</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 transition hover:opacity-70"
                            style={{ color: "#8a5c5c" }}
                          >
                            Google Maps
                          </a>
                        </p>
                      ) : (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: "#b0a090" }}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className="shrink-0"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {locale === "es" ? "Dirección por confirmar" : "Address TBD"}
                        </p>
                      )}

                      {googleUrl && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition"
                            style={{
                              border: "1px solid #c9a0a0",
                              color: "#8a5c5c",
                              background: "transparent",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {t.addGoogle}
                          </a>
                          <a
                            href={`/api/calendar/${event.id}`}
                            download
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition"
                            style={{
                              border: "1px solid #c9a0a0",
                              color: "#8a5c5c",
                              background: "transparent",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            {t.addApple}
                          </a>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
