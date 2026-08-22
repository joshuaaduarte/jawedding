"use client";

import { useMemo, useState } from "react";
import {
  syncCoastersAction,
  setCoasterPhotoAction,
  setCoasterDoneAction,
  updateCoasterNotesAction,
  addCoasterAction,
  deleteCoasterAction,
} from "./actions";
import type { Coaster } from "@/lib/coaster-store";

const inputClass =
  "w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass = "block text-xs uppercase tracking-[0.16em] text-stone-600";

const UNGROUPED = "Other / manual";

type Filter = "all" | "need-photo" | "ready" | "done";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "need-photo", label: "Need photo" },
  { key: "ready", label: "Have photo · not made" },
  { key: "done", label: "Made" },
];

function matchesFilter(c: Coaster, filter: Filter): boolean {
  switch (filter) {
    case "need-photo":
      return !c.hasPhoto;
    case "ready":
      return c.hasPhoto && !c.isDone;
    case "done":
      return c.isDone;
    default:
      return true;
  }
}

// Build the plain-text list of everyone still missing a photo, grouped by
// household, for pasting into a message to Ana.
function buildPhotosNeededText(coasters: Coaster[]): string {
  const needing = coasters.filter((c) => !c.hasPhoto);
  if (needing.length === 0) return "All coasters have photos! 🎉";

  const groups = new Map<string, string[]>();
  for (const c of needing) {
    const key = c.partyLabel || UNGROUPED;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c.name);
  }

  const sortedGroups = [...groups.entries()].sort((a, b) =>
    a[0] === UNGROUPED ? 1 : b[0] === UNGROUPED ? -1 : a[0].localeCompare(b[0]),
  );

  const lines = [`Coasters still needing photos (${needing.length}):`, ""];
  for (const [group, names] of sortedGroups) {
    lines.push(group);
    for (const name of names.sort((a, b) => a.localeCompare(b))) {
      lines.push(`  - ${name}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}

function CheckButton({
  checked,
  onLabel,
  offLabel,
  action,
}: {
  checked: boolean;
  onLabel: string;
  offLabel: string;
  action: () => void;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
          checked
            ? "border-emerald-300 bg-emerald-100 text-emerald-800"
            : "border-stone-300 bg-white text-stone-500 hover:bg-stone-50"
        }`}
      >
        {checked ? onLabel : offLabel}
      </button>
    </form>
  );
}

export function CoasterBoard({ coasters }: { coasters: Coaster[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);
  const [adding, setAdding] = useState(false);

  const visible = useMemo(
    () => coasters.filter((c) => matchesFilter(c, filter)),
    [coasters, filter],
  );

  // Group the visible coasters by household for display.
  const grouped = useMemo(() => {
    const map = new Map<string, Coaster[]>();
    for (const c of visible) {
      const key = c.partyLabel || UNGROUPED;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return [...map.entries()].sort((a, b) =>
      a[0] === UNGROUPED ? 1 : b[0] === UNGROUPED ? -1 : a[0].localeCompare(b[0]),
    );
  }, [visible]);

  async function copyPhotosNeeded() {
    const text = buildPhotosNeededText(coasters);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — fall back to a prompt so
      // the list can still be copied by hand.
      window.prompt("Copy the list below:", text);
    }
  }

  const needPhotoCount = coasters.filter((c) => !c.hasPhoto).length;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 shadow-sm">
        <form action={syncCoastersAction}>
          <button
            type="submit"
            className="h-9 rounded-full bg-stone-800 px-4 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-stone-700"
          >
            Sync from RSVPs
          </button>
        </form>
        <button
          type="button"
          onClick={copyPhotosNeeded}
          className="h-9 rounded-full border border-stone-300 px-4 text-xs uppercase tracking-[0.16em] text-stone-700 transition hover:bg-stone-100"
        >
          {copied ? "Copied ✓" : `Copy photos-needed (${needPhotoCount})`}
        </button>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="h-9 rounded-full border border-stone-300 px-4 text-xs uppercase tracking-[0.16em] text-stone-700 transition hover:bg-stone-100"
        >
          {adding ? "Cancel" : "+ Add coaster"}
        </button>
      </div>

      {/* Manual add form */}
      {adding ? (
        <form
          action={async (formData) => {
            await addCoasterAction(formData);
            setAdding(false);
          }}
          className="grid gap-3 rounded-2xl border border-stone-200 bg-white/90 px-4 py-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        >
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" required className={`mt-1 ${inputClass}`} placeholder="Person's name" />
          </div>
          <div>
            <label className={labelClass}>Notes (optional)</label>
            <input name="notes" className={`mt-1 ${inputClass}`} placeholder="e.g. photographer, vendor" />
          </div>
          <button
            type="submit"
            className="h-10 rounded-full bg-stone-800 px-5 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-stone-700"
          >
            Add
          </button>
        </form>
      ) : null}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filter === f.key
                ? "border-stone-800 bg-stone-800 text-white"
                : "border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grouped list */}
      {grouped.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 px-4 py-10 text-center text-sm text-stone-500">
          {coasters.length === 0
            ? "No coasters yet. Click “Sync from RSVPs” to pull in everyone who’s confirmed attending."
            : "No coasters match this filter."}
        </p>
      ) : (
        <div className="space-y-5">
          {grouped.map(([group, people]) => (
            <div
              key={group}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white/90 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/60 px-4 py-2.5">
                <h2 className="font-serif text-lg text-stone-800">{group}</h2>
                <span className="text-xs text-stone-500">
                  {people.filter((p) => p.isDone).length}/{people.length} made
                </span>
              </div>
              <ul className="divide-y divide-stone-100">
                {people.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-stone-800">{c.name}</p>
                      <form
                        action={updateCoasterNotesAction.bind(null, c.id)}
                        className="mt-1"
                      >
                        <input
                          name="notes"
                          defaultValue={c.notes}
                          placeholder="Add a note…"
                          onBlur={(e) => {
                            if (e.currentTarget.value.trim() !== c.notes)
                              e.currentTarget.form?.requestSubmit();
                          }}
                          className="w-full max-w-xs rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-xs text-stone-500 outline-none transition hover:border-stone-200 focus:border-stone-300 focus:bg-white"
                        />
                      </form>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <CheckButton
                        checked={c.hasPhoto}
                        onLabel="📷 Photo ✓"
                        offLabel="📷 No photo"
                        action={setCoasterPhotoAction.bind(null, c.id, !c.hasPhoto)}
                      />
                      <CheckButton
                        checked={c.isDone}
                        onLabel="✅ Made"
                        offLabel="Mark made"
                        action={setCoasterDoneAction.bind(null, c.id, !c.isDone)}
                      />
                      <form action={deleteCoasterAction.bind(null, c.id)}>
                        <button
                          type="submit"
                          title="Remove coaster"
                          className="rounded-full border border-transparent px-2 py-1 text-xs text-stone-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
