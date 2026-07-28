"use client";

import { useMemo, useState } from "react";
import {
  addBudgetItemAction,
  updateBudgetItemAction,
  deleteBudgetItemAction,
} from "./actions";
import { BUDGET_CATEGORIES, type BudgetItem } from "@/lib/budget-store";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const inputClass =
  "w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass = "block text-xs uppercase tracking-[0.16em] text-stone-600";

function committedOf(item: BudgetItem): number {
  return item.actual > 0 ? item.actual : item.estimated;
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BudgetFields({ item }: { item?: BudgetItem }) {
  const categories = useMemo(() => {
    const set = new Set(BUDGET_CATEGORIES);
    if (item?.category) set.add(item.category);
    return [...set];
  }, [item]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass}>Category</label>
        <input
          name="category"
          type="text"
          list="budget-categories"
          defaultValue={item?.category ?? "General"}
          className={`mt-1.5 ${inputClass}`}
        />
        <datalist id="budget-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label className={labelClass}>Vendor</label>
        <input
          name="vendor"
          type="text"
          defaultValue={item?.vendor}
          placeholder="e.g. Fairview Laguna Seca"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Description</label>
        <input
          name="description"
          type="text"
          defaultValue={item?.description}
          placeholder="e.g. Reception venue rental"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Estimated ($)</label>
        <input
          name="estimated"
          type="number"
          step="0.01"
          min="0"
          defaultValue={item ? item.estimated : ""}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Actual ($)</label>
        <input
          name="actual"
          type="number"
          step="0.01"
          min="0"
          defaultValue={item ? item.actual : ""}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Paid so far ($)</label>
        <input
          name="paid"
          type="number"
          step="0.01"
          min="0"
          defaultValue={item ? item.paid : ""}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Next Payment Due</label>
        <input
          name="dueDate"
          type="date"
          defaultValue={item?.dueDate ?? ""}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea
          name="notes"
          rows={2}
          defaultValue={item?.notes}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: BudgetItem }) {
  const [editing, setEditing] = useState(false);
  const committed = committedOf(item);
  const owed = Math.max(0, committed - item.paid);

  if (editing) {
    return (
      <div className="rounded-xl border border-stone-300 bg-stone-50 p-4">
        <form
          action={async (formData) => {
            await updateBudgetItemAction(item.id, formData);
            setEditing(false);
          }}
          className="space-y-4"
        >
          <BudgetFields item={item} />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="h-9 rounded-full bg-stone-800 px-5 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-stone-600 underline hover:text-stone-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-800">
          {item.vendor || item.description || "Untitled"}
        </p>
        {item.vendor && item.description ? (
          <p className="text-xs text-stone-500">{item.description}</p>
        ) : null}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          {item.dueDate && owed > 0 ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">
              Due {formatDate(item.dueDate)}
            </span>
          ) : null}
          {owed === 0 && committed > 0 ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">
              Paid in full
            </span>
          ) : null}
          {item.notes ? <span className="text-stone-400">{item.notes}</span> : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        <div className="text-right text-xs">
          <p className="text-stone-500">
            {usd.format(item.paid)} paid of {usd.format(committed)}
          </p>
          <p className="font-medium text-stone-800">
            {owed > 0 ? `${usd.format(owed)} owed` : "Settled"}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-stone-600 underline hover:text-stone-900"
          >
            Edit
          </button>
          <form
            action={deleteBudgetItemAction.bind(null, item.id)}
            onSubmit={(e) => {
              if (!confirm("Delete this line item?")) e.preventDefault();
            }}
          >
            <button type="submit" className="text-rose-600 underline hover:text-rose-800">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function FinanceBoard({ items }: { items: BudgetItem[] }) {
  const [showAdd, setShowAdd] = useState(false);

  const categoryTotals = useMemo(() => {
    const map = new Map<string, { committed: number; paid: number }>();
    for (const i of items) {
      const cur = map.get(i.category) ?? { committed: 0, paid: 0 };
      cur.committed += committedOf(i);
      cur.paid += i.paid;
      map.set(i.category, cur);
    }
    return [...map.entries()].sort((a, b) => b[1].committed - a[1].committed);
  }, [items]);

  const upcoming = useMemo(
    () =>
      items
        .filter((i) => i.dueDate && committedOf(i) - i.paid > 0)
        .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? "")),
    [items],
  );

  const byCategory = useMemo(() => {
    const map = new Map<string, BudgetItem[]>();
    for (const i of items) {
      const list = map.get(i.category) ?? [];
      list.push(i);
      map.set(i.category, list);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => setShowAdd((v) => !v)}
        className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
      >
        {showAdd ? "Close" : "+ Add Line Item"}
      </button>

      {showAdd ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <form
            action={async (formData) => {
              await addBudgetItemAction(formData);
              setShowAdd(false);
            }}
            className="space-y-4"
          >
            <BudgetFields />
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Add Line Item
            </button>
          </form>
        </section>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          No budget items yet. Add your first line item to start tracking costs.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Left column: breakdown + upcoming */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-stone-900">By Category</h2>
              <div className="mt-4 space-y-4">
                {categoryTotals.map(([cat, t]) => {
                  const pct =
                    t.committed > 0
                      ? Math.min(100, Math.round((t.paid / t.committed) * 100))
                      : 0;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-700">{cat}</span>
                        <span className="text-stone-500">
                          {usd.format(t.paid)} / {usd.format(t.committed)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-stone-900">Upcoming Payments</h2>
              {upcoming.length === 0 ? (
                <p className="mt-3 text-sm text-stone-500">
                  Nothing outstanding with a due date.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {upcoming.map((i) => (
                    <li
                      key={i.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-stone-700">
                          {i.vendor || i.description || i.category}
                        </p>
                        <p className="text-xs text-amber-700">
                          {formatDate(i.dueDate as string)}
                        </p>
                      </div>
                      <span className="shrink-0 font-medium text-stone-800">
                        {usd.format(committedOf(i) - i.paid)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Right column: itemized list grouped by category */}
          <div className="space-y-6">
            {byCategory.map(([cat, list]) => (
              <section key={cat} className="space-y-2">
                <h2 className="flex items-center gap-3 font-serif text-2xl text-stone-900">
                  {cat}
                  <span className="text-sm font-sans text-stone-400">
                    {list.length}
                  </span>
                </h2>
                {list.map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
