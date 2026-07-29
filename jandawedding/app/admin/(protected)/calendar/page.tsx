import { getAllTasks, getAllMilestones } from "@/lib/task-store";
import { getAllEvents, type WeddingEvent } from "@/lib/guest-data";
import { CalendarBoard, type CalendarItem, WEDDING_DATE } from "./calendar-board";

// An event's `eventDate` is a free-text display label (e.g. "September 3"); the
// real machine-readable date lives in `startDatetime` (a datetime-local value).
// Prefer that, then fall back to parsing the label against the wedding year.
function eventDateKey(e: WeddingEvent): string | null {
  const m = e.startDatetime
    ? /^(\d{4})-(\d{2})-(\d{2})/.exec(e.startDatetime)
    : null;
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  const label = e.eventDate?.trim();
  if (label) {
    const parsed = new Date(`${label} ${WEDDING_DATE.slice(0, 4)}`);
    if (!Number.isNaN(parsed.getTime())) {
      return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
    }
  }
  return null;
}

export default async function AdminCalendarPage() {
  const [tasks, milestones, events] = await Promise.all([
    getAllTasks(),
    getAllMilestones(),
    getAllEvents(),
  ]);

  const taskById = new Map(tasks.map((t) => [t.id, t]));
  const items: CalendarItem[] = [];

  for (const t of tasks) {
    if (!t.dueDate) continue;
    items.push({
      id: `task-${t.id}`,
      date: t.dueDate,
      title: t.title,
      kind: "task",
      category: t.category,
      assignee: t.assignee,
      done: t.status === "done",
    });
  }

  for (const m of milestones) {
    if (!m.dueDate) continue;
    const parent = taskById.get(m.taskId);
    items.push({
      id: `milestone-${m.id}`,
      date: m.dueDate,
      title: m.label,
      kind: "milestone",
      category: parent?.category,
      parentTitle: parent?.title,
      done: m.done,
    });
  }

  const eventDates = new Set<string>();
  for (const e of events) {
    const date = eventDateKey(e);
    if (!date) continue;
    eventDates.add(date);
    items.push({
      id: `event-${e.id}`,
      date,
      title: e.title,
      kind: "event",
      time: e.time,
      location: e.location,
      done: false,
    });
  }

  // Anchor the countdown on the wedding day, but only if no real event already
  // sits on that date (the seeded ceremony/reception usually do).
  if (!eventDates.has(WEDDING_DATE)) {
    items.push({
      id: "wedding-day",
      date: WEDDING_DATE,
      title: "Wedding Day 💍",
      kind: "wedding",
      done: false,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Countdown</h1>
        <p className="mt-1 text-sm text-stone-600">
          Everything due between now and the wedding.
        </p>
      </div>

      <CalendarBoard items={items} />
    </div>
  );
}
