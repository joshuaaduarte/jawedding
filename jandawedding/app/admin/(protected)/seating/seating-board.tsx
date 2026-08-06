"use client";

import { useMemo, useState, useTransition } from "react";
import {
  addTableAction,
  updateTableAction,
  deleteTableAction,
  assignSeatsAction,
  addSeatAction,
  updateSeatAction,
  deleteSeatAction,
  splitSeatAction,
  rejoinSeatAction,
  syncSeatsAction,
} from "./actions";
import type { SeatAssignment, SeatingTable } from "@/lib/seating-store";

const inputClass =
  "w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass = "block text-xs uppercase tracking-[0.16em] text-stone-600";

// A party is the unit of seating: every seat under one invite code moves
// together so a household is never split across tables. Manually-added seats
// (no invite code) each stand alone.
type Party = {
  key: string;
  inviteCode: string;
  label: string;
  seats: SeatAssignment[];
  tableId: string | null;
  // A one-person party created by splitting an individual out of their invite
  // code. It moves on its own and offers "Rejoin group" instead of "Split off".
  detached: boolean;
};

function buildParties(seats: SeatAssignment[]): Party[] {
  const groups = new Map<string, SeatAssignment[]>();
  for (const s of seats) {
    // A detached seat is keyed by its own id so it breaks out of its household
    // and gets its own table selector.
    const key = s.detached ? `solo:${s.id}` : s.inviteCode || `solo:${s.id}`;
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  }
  const parties: Party[] = [];
  for (const [key, list] of groups) {
    list.sort((a, b) => a.seatIndex - b.seatIndex || a.name.localeCompare(b.name));
    const first = list[0];
    const detached = first.detached;
    parties.push({
      key,
      inviteCode: first.inviteCode,
      // Detached people keep a "from <household>" trail so you don't lose track
      // of who they belong to.
      label: detached
        ? first.partyLabel
          ? `${first.name} · from ${first.partyLabel}`
          : first.name
        : first.partyLabel || first.name,
      seats: list,
      // Effective location: the whole party follows its first seat. Assignment
      // always moves every seat together, so this stays consistent.
      tableId: first.tableId,
      detached,
    });
  }
  return parties;
}

function SeatMember({
  seat,
  canSplit = false,
}: {
  seat: SeatAssignment;
  // Whether "Split off" is offered — only meaningful for a real household with
  // more than one member. Detached seats always offer "Rejoin group" instead.
  canSplit?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  if (editing) {
    return (
      <li className="rounded-lg border border-stone-300 bg-stone-50 p-2.5">
        <form
          action={async (formData) => {
            await updateSeatAction(seat.id, formData);
            setEditing(false);
          }}
          className="space-y-2"
        >
          <input name="name" defaultValue={seat.name} required className={inputClass} />
          <input
            name="notes"
            defaultValue={seat.notes}
            placeholder="Dietary / notes"
            className={inputClass}
          />
          <div className="flex items-center gap-3 text-xs">
            <button
              type="submit"
              className="h-8 rounded-full bg-stone-800 px-4 uppercase tracking-[0.16em] text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-stone-600 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`flex items-center gap-2 leading-tight ${pending ? "opacity-50" : ""}`}>
      <span className="min-w-0 flex-1 truncate text-sm text-stone-700">
        {seat.detached ? (
          <span aria-hidden className="mr-1 text-amber-500" title="Split from party">
            ⤴
          </span>
        ) : null}
        {seat.name}
        {seat.notes ? (
          <span className="ml-1.5 text-xs text-stone-400">{seat.notes}</span>
        ) : null}
      </span>
      {seat.detached ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => rejoinSeatAction(seat.id))}
          className="text-[11px] text-amber-600 underline opacity-80 transition hover:text-amber-800 hover:opacity-100 disabled:opacity-40"
        >
          Rejoin group
        </button>
      ) : canSplit ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => splitSeatAction(seat.id))}
          className="text-[11px] text-stone-400 underline opacity-70 transition hover:text-stone-700 hover:opacity-100 disabled:opacity-40"
        >
          Split off
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-[11px] text-stone-400 underline opacity-70 transition hover:text-stone-700 hover:opacity-100"
      >
        Edit
      </button>
      <form
        action={deleteSeatAction.bind(null, seat.id)}
        onSubmit={(e) => {
          if (!confirm(`Remove ${seat.name} from the seating list?`))
            e.preventDefault();
        }}
      >
        <button
          type="submit"
          className="text-[11px] text-rose-400 underline opacity-70 transition hover:text-rose-700 hover:opacity-100"
        >
          ✕
        </button>
      </form>
    </li>
  );
}

function PartyBlock({
  party,
  tables,
  seated = false,
}: {
  party: Party;
  tables: SeatingTable[];
  seated?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const seatIds = useMemo(() => party.seats.map((s) => s.id), [party]);

  const moveSelect = (
    <select
      value={party.tableId ?? ""}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => assignSeatsAction(seatIds, e.target.value || null))
      }
      className="max-w-[7rem] shrink-0 rounded-full border border-stone-300 bg-white px-2 py-0.5 text-xs text-stone-700 outline-none"
      aria-label={`Assign ${party.label} to a table`}
    >
      <option value="">Unassigned</option>
      {tables.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );

  // Splitting only makes sense inside a real household with more than one
  // member — you can't break a lone guest out of a party of one.
  const canSplit = !party.detached && party.seats.length > 1;
  const members = (
    <ul className="space-y-0.5">
      {party.seats.map((seat) => (
        <SeatMember
          key={seat.id}
          seat={seat}
          canSplit={canSplit && !!seat.inviteCode}
        />
      ))}
    </ul>
  );

  // Compact form used inside a table card — no nested border, just a caption.
  if (seated) {
    return (
      <div className={`py-1.5 ${pending ? "opacity-50" : ""}`}>
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-xs font-medium uppercase tracking-[0.08em] text-stone-500">
            {party.label}
            <span className="ml-1 text-stone-400">({party.seats.length})</span>
          </p>
          {moveSelect}
        </div>
        <div className="mt-0.5">{members}</div>
      </div>
    );
  }

  // Card form used in the unassigned pool.
  return (
    <div className={`rounded-xl border border-stone-200 bg-white p-2.5 ${pending ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-stone-800">{party.label}</p>
          <p className="text-xs text-stone-400">
            {party.inviteCode ? `${party.inviteCode} · ` : ""}
            {party.seats.length} {party.seats.length === 1 ? "guest" : "guests"}
          </p>
        </div>
        {moveSelect}
      </div>
      <div className="mt-2 border-t border-stone-100 pt-2">{members}</div>
    </div>
  );
}

function TableCard({
  table,
  parties,
  tables,
}: {
  table: SeatingTable;
  parties: Party[];
  tables: SeatingTable[];
}) {
  const [editing, setEditing] = useState(false);
  const occupied = parties.reduce((sum, p) => sum + p.seats.length, 0);
  const over = occupied > table.capacity;
  const openSeats = Math.max(0, table.capacity - occupied);

  return (
    <section className="w-full rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:w-72">
      {editing ? (
        <form
          action={async (formData) => {
            await updateTableAction(table.id, formData);
            setEditing(false);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className={labelClass}>Table Name</label>
              <input
                name="name"
                defaultValue={table.name}
                required
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div>
              <label className={labelClass}>Seats</label>
              <input
                name="capacity"
                type="number"
                min="0"
                defaultValue={table.capacity}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
          </div>
          <input
            name="notes"
            defaultValue={table.notes}
            placeholder="Notes (e.g. head table)"
            className={inputClass}
          />
          <div className="flex items-center gap-3 text-xs">
            <button
              type="submit"
              className="h-8 rounded-full bg-stone-800 px-4 uppercase tracking-[0.16em] text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-stone-600 underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              formAction={deleteTableAction.bind(null, table.id)}
              onClick={(e) => {
                if (
                  !confirm(
                    `Delete "${table.name}"? Its guests return to the unassigned pool.`,
                  )
                )
                  e.preventDefault();
              }}
              className="ml-auto text-rose-600 underline"
            >
              Delete table
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-lg text-stone-900">{table.name}</h3>
              {table.notes ? (
                <p className="truncate text-xs text-stone-500">{table.notes}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  over ? "bg-rose-100 text-rose-700" : "bg-stone-100 text-stone-600"
                }`}
              >
                {occupied}/{table.capacity}
                {over ? " over" : ""}
              </span>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs text-stone-500 underline hover:text-stone-800"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="mt-2 divide-y divide-stone-100">
            {parties.map((party) => (
              <PartyBlock key={party.key} party={party} tables={tables} seated />
            ))}
          </div>

          {/* Empty placeholders so a card's height reflects its capacity. */}
          {openSeats > 0 ? (
            <ul className={parties.length > 0 ? "mt-1.5 space-y-0.5" : "mt-2 space-y-0.5"}>
              {Array.from({ length: openSeats }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm italic leading-tight text-stone-300"
                >
                  <span aria-hidden className="not-italic text-stone-200">
                    ○
                  </span>
                  Open seat
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </section>
  );
}

export function SeatingBoard({
  tables,
  seats,
}: {
  tables: SeatingTable[];
  seats: SeatAssignment[];
}) {
  const [showAddTable, setShowAddTable] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [syncing, startSync] = useTransition();

  const parties = useMemo(() => buildParties(seats), [seats]);

  const unassigned = useMemo(
    () =>
      parties
        .filter((p) => !p.tableId)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [parties],
  );

  const partiesByTable = useMemo(() => {
    const map = new Map<string, Party[]>();
    for (const p of parties) {
      if (!p.tableId) continue;
      const list = map.get(p.tableId) ?? [];
      list.push(p);
      map.set(p.tableId, list);
    }
    for (const list of map.values()) list.sort((a, b) => a.label.localeCompare(b.label));
    return map;
  }, [parties]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => startSync(() => syncSeatsAction())}
          disabled={syncing}
          className="inline-flex h-10 items-center rounded-full border border-stone-300 px-5 text-xs uppercase tracking-[0.18em] text-stone-700 transition hover:bg-stone-100 disabled:opacity-50"
        >
          {syncing ? "Syncing…" : "↻ Sync Confirmed Guests"}
        </button>
        <button
          type="button"
          onClick={() => setShowAddTable((v) => !v)}
          className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          {showAddTable ? "Close" : "+ Add Table"}
        </button>
        <button
          type="button"
          onClick={() => setShowAddPerson((v) => !v)}
          className="inline-flex h-10 items-center rounded-full border border-stone-300 px-5 text-xs uppercase tracking-[0.18em] text-stone-700 transition hover:bg-stone-100"
        >
          {showAddPerson ? "Close" : "+ Add Person"}
        </button>
      </div>

      <p className="text-xs text-stone-500">
        Guests sharing an invite code are seated as one party — assigning moves the
        whole household together so a group is never split across tables. Need an
        exception? Use <span className="font-medium">Split off</span> on a person to
        seat them on their own, then <span className="font-medium">Rejoin group</span>{" "}
        to snap them back.
      </p>

      {showAddTable ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <form
            action={async (formData) => {
              await addTableAction(formData);
              setShowAddTable(false);
            }}
            className="grid gap-4 sm:grid-cols-4"
          >
            <div className="sm:col-span-2">
              <label className={labelClass}>Table Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Table 1 / Head Table"
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div>
              <label className={labelClass}>Seats</label>
              <input
                name="capacity"
                type="number"
                min="0"
                defaultValue={8}
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="h-10 w-full rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
              >
                Add Table
              </button>
            </div>
            <div className="sm:col-span-4">
              <label className={labelClass}>Notes</label>
              <input
                name="notes"
                placeholder="Optional (e.g. near the dance floor)"
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
          </form>
        </section>
      ) : null}

      {showAddPerson ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <form
            action={async (formData) => {
              await addSeatAction(formData);
              setShowAddPerson(false);
            }}
            className="grid gap-4 sm:grid-cols-4"
          >
            <div className="sm:col-span-2">
              <label className={labelClass}>Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Plus-one, vendor meal…"
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
            <div>
              <label className={labelClass}>Table</label>
              <select name="tableId" className={`mt-1.5 ${inputClass}`}>
                <option value="">Unassigned</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="h-10 w-full rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
              >
                Add Person
              </button>
            </div>
            <div className="sm:col-span-4">
              <label className={labelClass}>Notes</label>
              <input
                name="notes"
                placeholder="Dietary restrictions, etc."
                className={`mt-1.5 ${inputClass}`}
              />
            </div>
          </form>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        {/* Unassigned pool */}
        <section className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5 lg:sticky lg:top-4 lg:self-start">
          <h2 className="flex items-center gap-2 font-serif text-2xl text-stone-900">
            Unassigned
            <span className="text-sm font-sans text-stone-400">{unassigned.length}</span>
          </h2>
          {seats.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">
              No guests yet. Click{" "}
              <span className="font-medium">Sync Confirmed Guests</span> to pull in
              everyone who RSVP&apos;d yes, or add people manually.
            </p>
          ) : unassigned.length === 0 ? (
            <p className="mt-4 text-sm text-emerald-700">Every party has a table. 🎉</p>
          ) : (
            <div className="mt-4 space-y-2">
              {unassigned.map((party) => (
                <PartyBlock key={party.key} party={party} tables={tables} />
              ))}
            </div>
          )}
        </section>

        {/* Tables */}
        {tables.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
            No tables yet. Add your first table to start assigning guests.
          </div>
        ) : (
          <div className="flex flex-wrap items-start gap-4 self-start">
            {tables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                parties={partiesByTable.get(table.id) ?? []}
                tables={tables}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
