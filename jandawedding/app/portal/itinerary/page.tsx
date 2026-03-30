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
          addGoogle: "Google Calendar",
          addApple: "Apple / Outlook",
        }
      : {
          label: "Ana & Joshua · Itinerary",
          heading: "Your Itinerary",
          sub: "The events we've planned for you across the weekend.",
          at: "at",
          empty: "Your itinerary will be available soon.",
          addGoogle: "Google Calendar",
          addApple: "Apple / Outlook",
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
          {events.map((event) => {
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
      )}
    </div>
  );
}
