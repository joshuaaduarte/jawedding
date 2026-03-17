import Link from "next/link";
import { getAllEvents } from "@/lib/guest-data";

const GROUP_LABELS: Record<string, string> = {
  all: "All",
  family: "Family",
  "bridal-party": "Bridal Party",
  parents: "Parents",
};

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
          <h1 className="mt-1 font-serif text-4xl text-stone-900">Events</h1>
          <p className="mt-1 text-sm text-stone-600">
            {events.length} events · displayed to guests based on their group
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          + Add Event
        </Link>
      </div>

      <section className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
            <p className="text-sm text-stone-600">No events yet.</p>
            <Link href="/admin/events/new" className="mt-4 inline-block text-sm underline">
              Add your first event
            </Link>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    {event.dayLabel} · {event.eventDate}
                  </p>
                  {event.groups.map((g) => (
                    <span
                      key={g}
                      className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
                    >
                      {GROUP_LABELS[g] ?? g}
                    </span>
                  ))}
                </div>
                <h2 className="mt-1 font-serif text-xl text-stone-900">{event.title}</h2>
                <p className="mt-1 text-sm text-stone-600">
                  {event.time} · {event.location}
                </p>
              </div>
              <Link
                href={`/admin/events/${event.id}`}
                className="shrink-0 text-xs text-stone-600 underline hover:text-stone-900"
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
