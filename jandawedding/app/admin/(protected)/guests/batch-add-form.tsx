"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { batchCreateGuests } from "./actions";

type MemberRow = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  customNotes: boolean;
  customAnecdote: string;
  customAnecdoteEs: string;
};

type GroupOption = { name: string; label: string };

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass = "block text-xs uppercase tracking-[0.16em] text-stone-600";

let nextId = 1;

function newMember(lastName: string): MemberRow {
  return {
    id: nextId++,
    firstName: "",
    lastName,
    email: "",
    customNotes: false,
    customAnecdote: "",
    customAnecdoteEs: "",
  };
}

export function BatchAddForm({ groups }: { groups: GroupOption[] }) {
  const [inviteCode, setInviteCode] = useState("");
  const [group, setGroup] = useState("all");
  const [displayName, setDisplayName] = useState("");
  const [anecdote, setAnecdote] = useState("");
  const [anecdoteEs, setAnecdoteEs] = useState("");
  const [familyLastName, setFamilyLastName] = useState("");
  const [members, setMembers] = useState<MemberRow[]>([newMember("")]);
  const [isPending, startTransition] = useTransition();

  function updateMember(id: number, patch: Partial<MemberRow>) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  }

  function removeMember(id: number) {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      return next.length === 0 ? [newMember(familyLastName)] : next;
    });
  }

  function addMember() {
    setMembers((prev) => [...prev, newMember(familyLastName)]);
  }

  function handleFamilyLastNameChange(value: string) {
    setFamilyLastName(value);
    // Update all member last names that haven't been customized (still match old family name or are empty)
    setMembers((prev) =>
      prev.map((m) =>
        m.lastName === familyLastName || m.lastName === ""
          ? { ...m, lastName: value }
          : m,
      ),
    );
  }

  function handleSubmit() {
    const payload = {
      inviteCode,
      group,
      displayName,
      anecdote,
      anecdoteEs,
      members: members.map((m) => ({
        firstName: m.firstName,
        lastName: m.lastName,
        email: m.email,
        customNotes: m.customNotes,
        customAnecdote: m.customAnecdote,
        customAnecdoteEs: m.customAnecdoteEs,
      })),
    };
    startTransition(() => batchCreateGuests(JSON.stringify(payload)));
  }

  const validCount = members.filter(
    (m) => m.firstName.trim() && m.lastName.trim(),
  ).length;

  return (
    <div className="space-y-6">
      {/* Shared fields */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-700">
          Shared Details
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          These fields apply to everyone in this batch.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Invite Code *</label>
            <input
              type="text"
              required
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="e.g. AJD-0012"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div>
            <label className={labelClass}>Family Last Name *</label>
            <input
              type="text"
              required
              value={familyLastName}
              onChange={(e) => handleFamilyLastNameChange(e.target.value)}
              placeholder="e.g. Lima"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-stone-400">
              Pre-fills last name for each person below
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>
              Display Name{" "}
              <span className="normal-case text-stone-400">
                (optional — overrides first name in greeting)
              </span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder='e.g. "The Lima Family" or "Ana & Jorge"'
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Guest Group</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className={inputClass}
            >
              {groups.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Shared Note (English)</label>
            <p className="mt-1 text-xs text-stone-500">
              Shown to all guests in this batch (unless overridden per person).
            </p>
            <textarea
              rows={3}
              value={anecdote}
              onChange={(e) => setAnecdote(e.target.value)}
              placeholder="Write a personal note for this group..."
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>
              Shared Note (Spanish — optional)
            </label>
            <textarea
              rows={3}
              value={anecdoteEs}
              onChange={(e) => setAnecdoteEs(e.target.value)}
              placeholder="Escribe una nota personal en español..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Member rows */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-stone-700">
              People
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              {members.length} {members.length === 1 ? "person" : "people"} in
              this batch
            </p>
          </div>
          <button
            type="button"
            onClick={addMember}
            className="inline-flex h-9 items-center rounded-full border border-stone-300 px-4 text-xs uppercase tracking-[0.14em] text-stone-700 transition hover:bg-stone-100"
          >
            + Add Person
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="rounded-xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Person {idx + 1}
                </span>
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-xs text-rose-600 underline hover:text-rose-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    required
                    value={member.firstName}
                    onChange={(e) =>
                      updateMember(member.id, { firstName: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    required
                    value={member.lastName}
                    onChange={(e) =>
                      updateMember(member.id, { lastName: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      updateMember(member.id, { email: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Custom notes toggle */}
              <div className="mt-3">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={member.customNotes}
                    onChange={(e) =>
                      updateMember(member.id, {
                        customNotes: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-stone-300 text-stone-800 focus:ring-stone-700"
                  />
                  <span className="text-xs text-stone-600">
                    Custom notes for this person
                  </span>
                </label>
              </div>

              {member.customNotes && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className={labelClass}>
                      Personal Note (English)
                    </label>
                    <textarea
                      rows={2}
                      value={member.customAnecdote}
                      onChange={(e) =>
                        updateMember(member.id, {
                          customAnecdote: e.target.value,
                        })
                      }
                      placeholder="Write a personal note for this person..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Personal Note (Spanish)
                    </label>
                    <textarea
                      rows={2}
                      value={member.customAnecdoteEs}
                      onChange={(e) =>
                        updateMember(member.id, {
                          customAnecdoteEs: e.target.value,
                        })
                      }
                      placeholder="Escribe una nota personal en español..."
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending || validCount === 0}
          className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Saving..."
            : `Add ${validCount} ${validCount === 1 ? "Guest" : "Guests"}`}
        </button>
        <Link
          href="/admin/guests"
          className="text-sm text-stone-600 underline hover:text-stone-900"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
