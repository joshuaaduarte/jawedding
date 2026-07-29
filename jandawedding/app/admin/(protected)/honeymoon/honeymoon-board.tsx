"use client";

import { useMemo, useState } from "react";
import {
  addHoneymoonItemAction,
  updateHoneymoonItemAction,
  setHoneymoonStatusAction,
  deleteHoneymoonItemAction,
} from "./actions";
import {
  HONEYMOON_CITIES,
  HONEYMOON_CATEGORIES,
  type HoneymoonItem,
  type HoneymoonStatus,
} from "@/lib/honeymoon-store";

const STATUS_LABEL: Record<HoneymoonStatus, string> = {
  idea: "Idea",
  planned: "Planned",
  booked: "Booked",
};

const STATUS_STYLE: Record<HoneymoonStatus, string> = {
  idea: "bg-stone-100 text-stone-600",
  planned: "bg-amber-100 text-amber-800",
  booked: "bg-emerald-100 text-emerald-800",
};

const STATUS_CYCLE: Record<HoneymoonStatus, HoneymoonStatus> = {
  idea: "planned",
  planned: "booked",
  booked: "idea",
};

const inputClass =
  "w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass = "block text-xs uppercase tracking-[0.16em] text-stone-600";
const selectClass =
  "rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-700 outline-none";

// ── date + link helpers ─────────────────────────────────────────────────────

function formatDay(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatShort(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatCost(cost: number): string {
  return cost.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function addDays(date: string, n: number): string {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function inclusiveDays(start: string, end: string): number {
  const ms =
    new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime();
  return Math.round(ms / 86_400_000) + 1;
}

// An item spans multiple days when it has both a start and a later end date.
function isSpan(item: HoneymoonItem): boolean {
  return Boolean(item.itemDate && item.endDate && item.endDate > item.itemDate);
}

function mapsUrl(item: HoneymoonItem): string {
  const query = [item.address, item.city].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function AddressLink({ item }: { item: HoneymoonItem }) {
  if (!item.address) return null;
  return (
    <a
      href={mapsUrl(item)}
      target="_blank"
      rel="noreferrer"
      className="mt-1 inline-flex items-start gap-1 text-xs text-sky-700 underline hover:text-sky-900"
    >
      <span aria-hidden>📍</span>
      <span>{item.address}</span>
    </a>
  );
}

// ── form fields ─────────────────────────────────────────────────────────────

function ItemFields({ item }: { item?: HoneymoonItem }) {
  const cities = useMemo(() => {
    const set = new Set(HONEYMOON_CITIES);
    if (item?.city) set.add(item.city);
    return [...set];
  }, [item]);
  const categories = useMemo(() => {
    const set = new Set(HONEYMOON_CATEGORIES);
    if (item?.category) set.add(item.category);
    return [...set];
  }, [item]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass}>Activity *</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={item?.title}
          placeholder="e.g. Fushimi Inari shrine at sunrise"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>City</label>
        <input
          name="city"
          type="text"
          list="honeymoon-cities"
          defaultValue={item?.city}
          placeholder="Kyoto"
          className={`mt-1.5 ${inputClass}`}
        />
        <datalist id="honeymoon-cities">
          {cities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label className={labelClass}>Category</label>
        <input
          name="category"
          type="text"
          list="honeymoon-categories"
          defaultValue={item?.category ?? "Sightseeing"}
          className={`mt-1.5 ${inputClass}`}
        />
        <datalist id="honeymoon-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label className={labelClass}>Status</label>
        <select
          name="status"
          defaultValue={item?.status ?? "idea"}
          className={`mt-1.5 ${inputClass}`}
        >
          <option value="idea">Idea</option>
          <option value="planned">Planned</option>
          <option value="booked">Booked</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Time of day</label>
        <input
          name="timeLabel"
          type="text"
          defaultValue={item?.timeLabel}
          placeholder="Morning · 2:00 PM"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Date</label>
        <input
          name="itemDate"
          type="date"
          defaultValue={item?.itemDate ?? ""}
          className={`mt-1.5 ${inputClass}`}
        />
        <p className="mt-1 text-[11px] text-stone-400">Leave empty to keep as an idea.</p>
      </div>
      <div>
        <label className={labelClass}>End date</label>
        <input
          name="endDate"
          type="date"
          defaultValue={item?.endDate ?? ""}
          className={`mt-1.5 ${inputClass}`}
        />
        <p className="mt-1 text-[11px] text-stone-400">For multi-day stays (optional).</p>
      </div>
      <div>
        <label className={labelClass}>Est. cost (USD)</label>
        <input
          name="cost"
          type="number"
          min="0"
          step="1"
          defaultValue={item?.cost ? String(item.cost) : ""}
          placeholder="0"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Address</label>
        <input
          name="address"
          type="text"
          defaultValue={item?.address}
          placeholder="2-3-1 Asakusa, Taitō City, Tokyo"
          className={`mt-1.5 ${inputClass}`}
        />
        <p className="mt-1 text-[11px] text-stone-400">
          Becomes a tappable map link.
        </p>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Link</label>
        <input
          name="url"
          type="url"
          defaultValue={item?.url}
          placeholder="https://…"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea
          name="notes"
          rows={2}
          defaultValue={item?.notes}
          placeholder="Reservations, tips, who suggested it…"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
    </div>
  );
}

function EditForm({ item, onDone }: { item: HoneymoonItem; onDone: () => void }) {
  return (
    <form
      action={async (formData) => {
        await updateHoneymoonItemAction(item.id, formData);
        onDone();
      }}
      className="space-y-4"
    >
      <ItemFields item={item} />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="h-9 rounded-full bg-stone-800 px-5 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-sm text-stone-600 underline hover:text-stone-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function RowActions({ item, onEdit }: { item: HoneymoonItem; onEdit: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-3 text-xs">
      <button
        type="button"
        onClick={onEdit}
        className="text-stone-600 underline hover:text-stone-900"
      >
        Edit
      </button>
      <form
        action={deleteHoneymoonItemAction.bind(null, item.id)}
        onSubmit={(e) => {
          if (!confirm("Delete this item?")) e.preventDefault();
        }}
      >
        <button type="submit" className="text-rose-600 underline hover:text-rose-800">
          Delete
        </button>
      </form>
    </div>
  );
}

function StatusButton({ item }: { item: HoneymoonItem }) {
  return (
    <form
      action={setHoneymoonStatusAction.bind(null, item.id, STATUS_CYCLE[item.status])}
      className="pt-0.5"
    >
      <button
        type="submit"
        title={`Status: ${STATUS_LABEL[item.status]} — click to cycle`}
        className={`rounded-full px-2 py-0.5 text-[11px] transition hover:opacity-80 ${STATUS_STYLE[item.status]}`}
      >
        {STATUS_LABEL[item.status]}
      </button>
    </form>
  );
}

// ── single-day activity row ─────────────────────────────────────────────────

function ItemRow({ item }: { item: HoneymoonItem }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="rounded-xl border border-stone-300 bg-stone-50 p-4">
        <EditForm item={item} onDone={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
      <StatusButton item={item} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800">{item.title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          {item.city ? (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800">
              {item.city}
            </span>
          ) : null}
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">
            {item.category}
          </span>
          {item.timeLabel ? (
            <span className="text-stone-500">{item.timeLabel}</span>
          ) : null}
          {item.cost > 0 ? (
            <span className="text-stone-500">· {formatCost(item.cost)}</span>
          ) : null}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-sky-700 underline hover:text-sky-900"
            >
              Link ↗
            </a>
          ) : null}
        </div>
        <AddressLink item={item} />
        {item.notes ? (
          <p className="mt-1.5 whitespace-pre-wrap text-xs text-stone-500">{item.notes}</p>
        ) : null}
      </div>
      <RowActions item={item} onEdit={() => setEditing(true)} />
    </li>
  );
}

// ── multi-day span banner (rendered on each covered day) ────────────────────

const SPAN_ICON: Record<string, string> = {
  Lodging: "🏨",
  Travel: "🚄",
};

function SpanBanner({ item, day }: { item: HoneymoonItem; day: string }) {
  const [editing, setEditing] = useState(false);
  const total = inclusiveDays(item.itemDate!, item.endDate!);
  const index = inclusiveDays(item.itemDate!, day);
  const icon = SPAN_ICON[item.category] ?? "📌";

  if (editing) {
    return (
      <div className="rounded-xl border border-stone-300 bg-stone-50 p-4">
        <EditForm item={item} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-sky-200 bg-sky-50/60 px-4 py-2.5">
      <span className="text-base leading-5" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800">
          {item.title}
          <span className="ml-2 text-xs font-normal text-stone-500">
            Day {index} of {total}
          </span>
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          {item.city ? <span>{item.city}</span> : null}
          <span>
            {formatShort(item.itemDate!)} – {formatShort(item.endDate!)}
          </span>
          <StatusBadgeInline item={item} />
          {item.cost > 0 ? <span>· {formatCost(item.cost)}</span> : null}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-sky-700 underline hover:text-sky-900"
            >
              Link ↗
            </a>
          ) : null}
        </div>
        <AddressLink item={item} />
      </div>
      {/* Manage the stay from any covered day. */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <StatusButton item={item} />
        <RowActions item={item} onEdit={() => setEditing(true)} />
      </div>
    </div>
  );
}

function StatusBadgeInline({ item }: { item: HoneymoonItem }) {
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${STATUS_STYLE[item.status]}`}>
      {STATUS_LABEL[item.status]}
    </span>
  );
}

// ── board ───────────────────────────────────────────────────────────────────

export function HoneymoonBoard({ items }: { items: HoneymoonItem[] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | HoneymoonStatus>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const allCities = useMemo(
    () => [...new Set(items.map((i) => i.city).filter(Boolean))].sort(),
    [items],
  );
  const allCategories = useMemo(
    () => [...new Set(items.map((i) => i.category))].sort(),
    [items],
  );

  const filtered = items.filter((i) => {
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (cityFilter !== "all" && i.city !== cityFilter) return false;
    if (categoryFilter !== "all" && i.category !== categoryFilter) return false;
    return true;
  });

  // Build the day-by-day plan. Single-day items sit in their day's list;
  // multi-day spans (stays) surface as a banner on every day they cover, so a
  // day with only a stay still appears. Undated items fall to "Ideas".
  const { dayList, ideas } = useMemo(() => {
    const points = new Map<string, HoneymoonItem[]>();
    const spans: HoneymoonItem[] = [];
    const ideas: HoneymoonItem[] = [];
    const daySet = new Set<string>();

    for (const i of filtered) {
      if (!i.itemDate) {
        ideas.push(i);
      } else if (isSpan(i)) {
        spans.push(i);
        let d = i.itemDate;
        for (let guard = 0; d <= i.endDate! && guard < 400; guard++) {
          daySet.add(d);
          d = addDays(d, 1);
        }
      } else {
        const list = points.get(i.itemDate) ?? [];
        list.push(i);
        points.set(i.itemDate, list);
        daySet.add(i.itemDate);
      }
    }

    const dayList = [...daySet].sort().map((date) => ({
      date,
      spans: spans
        .filter((s) => s.itemDate! <= date && date <= s.endDate!)
        .sort((a, b) => a.itemDate!.localeCompare(b.itemDate!)),
      points: points.get(date) ?? [],
    }));

    return { dayList, ideas };
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          {showAdd ? "Close" : "+ Add Item"}
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="idea">Idea</option>
            <option value="planned">Planned</option>
            <option value="booked">Booked</option>
          </select>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All cities</option>
            {allCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add form */}
      {showAdd ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <form
            action={async (formData) => {
              await addHoneymoonItemAction(formData);
              setShowAdd(false);
            }}
            className="space-y-4"
          >
            <ItemFields />
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Add Item
            </button>
          </form>
        </section>
      ) : null}

      {dayList.length === 0 && ideas.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          No items yet. Add activities you want to do — give them a date to
          schedule them, or leave the date empty to keep them as ideas.
        </div>
      ) : null}

      {/* Day-by-day itinerary */}
      {dayList.map(({ date, spans, points }) => (
        <section key={date} className="space-y-2">
          <h2 className="flex items-baseline gap-3 font-serif text-2xl text-stone-900">
            {formatDay(date)}
            {points.length > 0 ? (
              <span className="text-sm font-sans text-stone-400">{points.length}</span>
            ) : null}
          </h2>
          {spans.map((s) => (
            <SpanBanner key={s.id} item={s} day={date} />
          ))}
          {points.length > 0 ? (
            <ul className="space-y-2">
              {points.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {/* Unscheduled ideas */}
      {ideas.length > 0 ? (
        <section className="space-y-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 p-5">
          <h2 className="flex items-baseline gap-3 font-serif text-2xl text-stone-900">
            Ideas · Unscheduled
            <span className="text-sm font-sans text-stone-400">{ideas.length}</span>
          </h2>
          <ul className="space-y-2">
            {ideas.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
