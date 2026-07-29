"use client";

import { useMemo, useState } from "react";

// Wedding anchor date (local). Keep in sync with the ceremony date.
export const WEDDING_DATE = "2026-09-04";

export type CalendarItem = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  kind: "task" | "milestone" | "event" | "wedding";
  category?: string;
  parentTitle?: string; // milestone's parent task title
  assignee?: string;
  time?: string; // event time-of-day label
  location?: string; // event location
  done: boolean;
};

// Only planning items can fall "overdue"; scheduled events/wedding cannot.
function canBeOverdue(kind: CalendarItem["kind"]): boolean {
  return kind === "task" || kind === "milestone";
}

const ASSIGNEE_LABEL: Record<string, string> = {
  joshua: "Joshua",
  ana: "Ana",
  both: "Both",
};

const KIND_DOT: Record<CalendarItem["kind"], string> = {
  task: "bg-stone-400",
  milestone: "bg-amber-400",
  event: "bg-teal-500",
  wedding: "bg-rose-500",
};

function toDate(date: string): Date {
  return new Date(`${date}T00:00:00`);
}

function todayStr(): string {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(
    t.getDate(),
  ).padStart(2, "0")}`;
}

function daysBetween(from: string, to: string): number {
  const ms = toDate(to).getTime() - toDate(from).getTime();
  return Math.round(ms / 86_400_000);
}

function formatFull(date: string): string {
  return toDate(date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function relativeLabel(date: string, today: string): string {
  const d = daysBetween(today, date);
  if (d < 0) return `${Math.abs(d)}d ago`;
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  return `in ${d}d`;
}

// ── Countdown header ────────────────────────────────────────────────────────

function Countdown({ today }: { today: string }) {
  const days = daysBetween(today, WEDDING_DATE);
  const isPast = days < 0;
  const weeks = Math.floor(Math.abs(days) / 7);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
        September 4, 2026 · Carmel Mission
      </p>
      <p className="mt-2 font-serif text-5xl text-stone-900">
        {isPast ? "🎉" : days}
        {!isPast ? (
          <span className="ml-2 text-2xl text-stone-500">
            {days === 1 ? "day" : "days"} to go
          </span>
        ) : (
          <span className="ml-2 text-2xl text-stone-500">Married!</span>
        )}
      </p>
      {!isPast && days > 7 ? (
        <p className="mt-1 text-sm text-stone-500">
          about {weeks} {weeks === 1 ? "week" : "weeks"} away
        </p>
      ) : null}
    </div>
  );
}

// ── Item row (shared by agenda + month detail) ──────────────────────────────

function ItemLine({ item, today }: { item: CalendarItem; today: string }) {
  const overdue =
    !item.done && canBeOverdue(item.kind) && daysBetween(today, item.date) < 0;
  return (
    <div className="flex items-start gap-2.5">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${KIND_DOT[item.kind]}`} />
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm ${
            item.done ? "text-stone-400 line-through" : "text-stone-800"
          }`}
        >
          {item.title}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
          {item.kind === "event" ? (
            <span className="rounded-full bg-teal-50 px-1.5 py-0.5 text-teal-700">
              Event
            </span>
          ) : null}
          {item.kind === "milestone" && item.parentTitle ? (
            <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-amber-700">
              {item.parentTitle}
            </span>
          ) : null}
          {item.time ? <span>{item.time}</span> : null}
          {item.location ? <span>· {item.location}</span> : null}
          {item.category ? <span>{item.category}</span> : null}
          {item.assignee && ASSIGNEE_LABEL[item.assignee] ? (
            <span>· {ASSIGNEE_LABEL[item.assignee]}</span>
          ) : null}
          {overdue ? <span className="text-rose-600">· Overdue</span> : null}
        </div>
      </div>
    </div>
  );
}

// ── Agenda view ─────────────────────────────────────────────────────────────

function AgendaView({
  items,
  today,
}: {
  items: CalendarItem[];
  today: string;
}) {
  const { overdue, byDate } = useMemo(() => {
    const overdue: CalendarItem[] = [];
    const upcoming = new Map<string, CalendarItem[]>();
    for (const it of items) {
      if (!it.done && canBeOverdue(it.kind) && daysBetween(today, it.date) < 0) {
        overdue.push(it);
      } else {
        const list = upcoming.get(it.date) ?? [];
        list.push(it);
        upcoming.set(it.date, list);
      }
    }
    overdue.sort((a, b) => a.date.localeCompare(b.date));
    const byDate = [...upcoming.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return { overdue, byDate };
  }, [items, today]);

  if (overdue.length === 0 && byDate.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
        Nothing scheduled yet. Add due dates to tasks (and milestones) to see them here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {overdue.length > 0 ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
            Overdue · {overdue.length}
          </h2>
          <div className="space-y-3">
            {overdue.map((it) => (
              <div key={it.id} className="flex items-start justify-between gap-3">
                <ItemLine item={it} today={today} />
                <span className="shrink-0 text-[11px] text-rose-600">
                  {formatFull(it.date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {byDate.map(([date, list]) => {
        const isWedding = date === WEDDING_DATE;
        return (
          <section
            key={date}
            className={`rounded-2xl border p-5 ${
              isWedding ? "border-rose-200 bg-rose-50/50" : "border-stone-200 bg-white"
            }`}
          >
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-serif text-lg text-stone-900">{formatFull(date)}</h2>
              <span className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
                {relativeLabel(date, today)}
              </span>
            </div>
            <div className="space-y-3">
              {list.map((it) => (
                <ItemLine key={it.id} item={it} today={today} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ── Month grid view ─────────────────────────────────────────────────────────

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function MonthView({
  items,
  today,
}: {
  items: CalendarItem[];
  today: string;
}) {
  const now = toDate(today);
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const byDate = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    for (const it of items) {
      const list = map.get(it.date) ?? [];
      list.push(it);
      map.set(it.date, list);
    }
    return map;
  }, [items]);

  const [selected, setSelected] = useState<string | null>(null);

  const firstOfMonth = new Date(cursor.year, cursor.month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const monthLabel = firstOfMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const cells: (string | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(
      `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    );
  }

  const shift = (delta: number) => {
    setSelected(null);
    setCursor((c) => {
      const next = new Date(c.year, c.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const navBtn =
    "flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition hover:bg-stone-100";
  const selectedItems = selected ? byDate.get(selected) ?? [] : [];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" onClick={() => shift(-1)} className={navBtn} aria-label="Previous month">
            ‹
          </button>
          <h2 className="font-serif text-xl text-stone-900">{monthLabel}</h2>
          <button type="button" onClick={() => shift(1)} className={navBtn} aria-label="Next month">
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.1em] text-stone-400">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="aspect-square" />;
            const dayNum = Number(date.slice(-2));
            const dayItems = byDate.get(date) ?? [];
            const isToday = date === today;
            const isWedding = date === WEDDING_DATE;
            const isSelected = date === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(dayItems.length ? date : null)}
                className={`flex aspect-square flex-col items-center justify-start gap-1 rounded-lg border p-1 text-left transition ${
                  isSelected
                    ? "border-stone-800 bg-stone-50"
                    : isWedding
                      ? "border-rose-200 bg-rose-50"
                      : isToday
                        ? "border-stone-400 bg-stone-50"
                        : "border-transparent hover:border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span
                  className={`text-xs ${
                    isToday ? "font-semibold text-stone-900" : "text-stone-600"
                  }`}
                >
                  {dayNum}
                </span>
                <span className="flex flex-wrap justify-center gap-0.5">
                  {dayItems.slice(0, 4).map((it) => (
                    <span
                      key={it.id}
                      className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[it.kind]} ${
                        it.done ? "opacity-30" : ""
                      }`}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-serif text-lg text-stone-900">{formatFull(selected)}</h3>
            <span className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
              {relativeLabel(selected, today)}
            </span>
          </div>
          <div className="space-y-3">
            {selectedItems.map((it) => (
              <ItemLine key={it.id} item={it} today={today} />
            ))}
          </div>
        </section>
      ) : (
        <p className="px-1 text-xs text-stone-500">
          Tap a day with a marker to see what’s due.
        </p>
      )}
    </div>
  );
}

// ── Board shell with view toggle ────────────────────────────────────────────

export function CalendarBoard({ items }: { items: CalendarItem[] }) {
  const today = todayStr();
  const [view, setView] = useState<"agenda" | "month">("agenda");
  const [hideDone, setHideDone] = useState(true);

  const shown = useMemo(
    () => (hideDone ? items.filter((it) => !it.done) : items),
    [items, hideDone],
  );

  const toggleBtn = (active: boolean) =>
    `h-9 rounded-full px-5 text-xs uppercase tracking-[0.16em] transition ${
      active ? "bg-stone-800 text-white" : "text-stone-600 hover:bg-stone-100"
    }`;

  return (
    <div className="space-y-6">
      <Countdown today={today} />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1">
          <button type="button" onClick={() => setView("agenda")} className={toggleBtn(view === "agenda")}>
            Agenda
          </button>
          <button type="button" onClick={() => setView("month")} className={toggleBtn(view === "month")}>
            Month
          </button>
        </div>

        <label className="ml-auto flex items-center gap-2 text-xs text-stone-600">
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300"
          />
          Hide completed
        </label>

        <div className="flex items-center gap-3 text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${KIND_DOT.task}`} /> Task
          </span>
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${KIND_DOT.milestone}`} /> Milestone
          </span>
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${KIND_DOT.event}`} /> Event
          </span>
        </div>
      </div>

      {view === "agenda" ? (
        <AgendaView items={shown} today={today} />
      ) : (
        <MonthView items={shown} today={today} />
      )}
    </div>
  );
}
