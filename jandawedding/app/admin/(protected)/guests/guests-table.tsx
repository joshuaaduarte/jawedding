"use client";

import Link from "next/link";
import { useState } from "react";
import type { Guest } from "@/lib/guest-data";

type GuestWithRsvp = Guest & {
  rsvp?: { attendance: string; guestCount: number } | null;
};

const GROUP_LABELS: Record<string, string> = {
  all: "All Guests",
  family: "Family",
  "bridal-party": "Bridal Party",
  parents: "Parents",
};

const RSVP_OPTIONS = ["all", "attending", "declining", "pending"] as const;

export default function GuestsTable({ guests }: { guests: GuestWithRsvp[] }) {
  const [nameFilter, setNameFilter] = useState("");
  const [codeSort, setCodeSort] = useState<"none" | "asc" | "desc">("none");
  const [groupFilter, setGroupFilter] = useState("all");
  const [rsvpFilter, setRsvpFilter] = useState<(typeof RSVP_OPTIONS)[number]>("all");

  const groups = Array.from(new Set(guests.map((g) => g.group)));

  const filtered = guests.filter((g) => {
    if (nameFilter) {
      const q = nameFilter.toLowerCase();
      const fullName = `${g.firstName} ${g.lastName}`.toLowerCase();
      if (!fullName.includes(q)) return false;
    }
    if (groupFilter !== "all" && g.group !== groupFilter) return false;
    if (rsvpFilter !== "all") {
      const status = g.rsvp
        ? g.rsvp.attendance === "yes"
          ? "attending"
          : "declining"
        : "pending";
      if (status !== rsvpFilter) return false;
    }
    return true;
  });

  const sorted = codeSort === "none"
    ? filtered
    : [...filtered].sort((a, b) => {
        const numA = parseInt(a.inviteCode.replace(/\D/g, ""), 10);
        const numB = parseInt(b.inviteCode.replace(/\D/g, ""), 10);
        return codeSort === "asc" ? numA - numB : numB - numA;
      });

  const hasFilters = nameFilter || groupFilter !== "all" || rsvpFilter !== "all";

  const inputClass =
    "mt-1 w-full rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-700 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none";
  const selectClass =
    "mt-1 w-full rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-700 focus:border-stone-400 focus:outline-none";

  return (
    <>
      {hasFilters && (
        <p className="text-xs text-stone-500">
          Showing {sorted.length} of {guests.length} guests
        </p>
      )}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.12em] text-stone-500">
                <th className="px-4 py-3">
                  Name
                  <input
                    type="text"
                    placeholder="Search…"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className={inputClass}
                  />
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCodeSort((s) =>
                        s === "none" ? "asc" : s === "asc" ? "desc" : "none"
                      )
                    }
                    className="flex items-center gap-1 hover:text-stone-800 transition-colors"
                  >
                    Invite Code
                    <span className="text-[10px]">
                      {codeSort === "asc" ? "▲" : codeSort === "desc" ? "▼" : "⇅"}
                    </span>
                  </button>
                </th>
                <th className="px-4 py-3">
                  Group
                  <select
                    value={groupFilter}
                    onChange={(e) => setGroupFilter(e.target.value)}
                    className={selectClass}
                  >
                    <option value="all">All</option>
                    {groups.map((g) => (
                      <option key={g} value={g}>
                        {GROUP_LABELS[g] ?? g}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-3">
                  RSVP
                  <select
                    value={rsvpFilter}
                    onChange={(e) => setRsvpFilter(e.target.value as typeof rsvpFilter)}
                    className={selectClass}
                  >
                    <option value="all">All</option>
                    <option value="attending">Attending</option>
                    <option value="declining">Declining</option>
                    <option value="pending">Pending</option>
                  </select>
                </th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-stone-500">
                    No guests match your filters.
                  </td>
                </tr>
              ) : (
                sorted.map((guest) => (
                  <tr key={guest.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 font-medium">
                      {guest.firstName} {guest.lastName}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-500">
                      {guest.inviteCode}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-600">
                      {GROUP_LABELS[guest.group] ?? guest.group}
                    </td>
                    <td className="px-4 py-3">
                      {guest.rsvp ? (
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            guest.rsvp.attendance === "yes"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {guest.rsvp.attendance === "yes" ? "Attending" : "Declining"}
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {guest.rsvp?.guestCount ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/guests/${guest.id}`}
                        className="text-xs text-stone-600 underline hover:text-stone-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
