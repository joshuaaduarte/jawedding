import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getEventById, updateEvent, deleteEvent } from "@/lib/guest-data";

type Props = { params: Promise<{ id: string }> };

const ALL_GROUPS = ["all", "family", "bridal-party", "parents", "couple"] as const;
const GROUP_LABELS: Record<string, string> = {
  all: "All Guests",
  family: "Family",
  "bridal-party": "Bridal Party",
  parents: "Parents",
  couple: "Couple (Ana & Joshua)",
};

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const currentSortOrder = event.sortOrder;

  async function handleUpdate(formData: FormData) {
    "use server";
    const groups = ALL_GROUPS.filter((g) => formData.get(`group_${g}`) === "on");

    const rawDatetime = (formData.get("startDatetime") as string).trim();
    await updateEvent(id, {
      dayLabel: (formData.get("dayLabel") as string).trim(),
      eventDate: (formData.get("eventDate") as string).trim(),
      title: (formData.get("title") as string).trim(),
      time: (formData.get("time") as string).trim(),
      location: (formData.get("location") as string).trim(),
      groups: groups.length > 0 ? groups : ["all"],
      sortOrder: parseInt(formData.get("sortOrder") as string, 10) || currentSortOrder,
      startDatetime: rawDatetime || null,
    });
    redirect("/admin/events");
  }

  async function handleDelete() {
    "use server";
    await deleteEvent(id);
    redirect("/admin/events");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Events</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Edit Event</h1>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <form action={handleUpdate} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Day Label
              </label>
              <input
                name="dayLabel"
                type="text"
                required
                defaultValue={event.dayLabel}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Date
              </label>
              <input
                name="eventDate"
                type="text"
                required
                defaultValue={event.eventDate}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Event Title *
              </label>
              <input
                name="title"
                type="text"
                required
                defaultValue={event.title}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Time
              </label>
              <input
                name="time"
                type="text"
                required
                defaultValue={event.time}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Location
              </label>
              <input
                name="location"
                type="text"
                required
                defaultValue={event.location}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Start Date &amp; Time (Pacific)
              </label>
              <input
                name="startDatetime"
                type="datetime-local"
                defaultValue={event.startDatetime?.slice(0, 16) ?? ""}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
              <p className="mt-1 text-xs text-stone-400">
                Used for Add to Calendar links. Leave blank if TBD.
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Sort Order
              </label>
              <input
                name="sortOrder"
                type="number"
                defaultValue={event.sortOrder}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Visible To
              </label>
              <div className="mt-3 flex flex-wrap gap-4">
                {ALL_GROUPS.map((g) => (
                  <label key={g} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      name={`group_${g}`}
                      defaultChecked={event.groups.includes(g)}
                      className="h-4 w-4 rounded border-stone-300 accent-stone-800"
                    />
                    {GROUP_LABELS[g]}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Save Changes
            </button>
            <Link href="/admin/events" className="text-sm text-stone-600 underline hover:text-stone-900">
              Cancel
            </Link>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="text-sm font-semibold text-rose-800">Danger Zone</h2>
        <p className="mt-1 text-xs text-rose-700">
          Deleting this event will remove it from all guest portals immediately.
        </p>
        <form action={handleDelete} className="mt-4">
          <button
            type="submit"
            className="h-9 rounded-full border border-rose-400 bg-white px-5 text-xs uppercase tracking-[0.16em] text-rose-700 transition hover:bg-rose-100"
          >
            Delete Event
          </button>
        </form>
      </section>
    </div>
  );
}
