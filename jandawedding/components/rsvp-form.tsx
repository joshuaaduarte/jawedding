"use client";

import { useState } from "react";
import type { RsvpAttendance, RsvpRecord } from "@/lib/rsvp-store";
import type { Guest } from "@/lib/guest-data";
import type { Locale } from "@/lib/locale";

type GuestState = {
  attendance: RsvpAttendance | "";
  notes: string;
};

type RsvpFormProps = {
  guests: Guest[];
  existingRsvps: Record<string, RsvpRecord>;
  locale: Locale;
};

export function RsvpForm({ guests, existingRsvps, locale }: RsvpFormProps) {
  const t =
    locale === "es"
      ? {
          selectAll: "Por favor selecciona asistencia para cada persona.",
          submitError: "No pudimos guardar tu confirmación. Inténtalo otra vez.",
          submitOk: "Confirmación guardada.",
          yes: "Asistiré",
          no: "No podré",
          notes: "Necesidades alimenticias o mensaje",
          hint: "Puedes actualizar tu confirmación después.",
          saving: "Guardando...",
          submit: "Enviar Confirmación",
        }
      : {
          selectAll: "Please select attendance for each person.",
          submitError: "Unable to submit RSVP. Please try again.",
          submitOk: "RSVP saved successfully.",
          yes: "Attending",
          no: "Declining",
          notes: "Dietary needs or message",
          hint: "Your RSVP can be updated later from this portal.",
          saving: "Saving...",
          submit: "Submit RSVP",
        };

  const [states, setStates] = useState<Record<string, GuestState>>(
    Object.fromEntries(
      guests.map((g) => [
        g.id,
        {
          attendance: existingRsvps[g.id]?.attendance ?? "",
          notes: existingRsvps[g.id]?.notes ?? "",
        },
      ]),
    ),
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function setAttendance(guestId: string, value: RsvpAttendance) {
    setStates((prev) => ({
      ...prev,
      [guestId]: { ...prev[guestId], attendance: value },
    }));
  }

  function setNotes(guestId: string, value: string) {
    setStates((prev) => ({
      ...prev,
      [guestId]: { ...prev[guestId], notes: value },
    }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const allSelected = guests.every((g) => states[g.id]?.attendance !== "");
    if (!allSelected) {
      setStatusMessage(t.selectAll);
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rsvps: guests.map((g) => ({
          guestId: g.id,
          attendance: states[g.id].attendance,
          notes: states[g.id].notes,
        })),
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setStatusMessage(t.submitError);
      return;
    }

    setStatusMessage(t.submitOk);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {guests.map((guest) => {
        const state = states[guest.id];
        return (
          <div
            key={guest.id}
            className="rounded-2xl border border-stone-700 bg-stone-900/40 p-5"
          >
            <p className="text-sm font-medium text-stone-100">
              {guest.firstName} {guest.lastName}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setAttendance(guest.id, "yes")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  state?.attendance === "yes"
                    ? "border border-emerald-600 bg-emerald-700 text-white"
                    : "border border-stone-600 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setAttendance(guest.id, "no")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  state?.attendance === "no"
                    ? "border border-stone-500 bg-stone-600 text-white"
                    : "border border-stone-600 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {t.no}
              </button>
            </div>
            <textarea
              rows={2}
              value={state?.notes ?? ""}
              onChange={(e) => setNotes(guest.id, e.target.value)}
              placeholder={t.notes}
              className="mt-3 w-full rounded-xl border border-stone-700 bg-stone-900/40 px-4 py-2 text-sm text-stone-100 placeholder:text-stone-500 outline-none ring-stone-600 transition focus:ring-1"
            />
          </div>
        );
      })}

      {statusMessage ? (
        <p className="text-xs uppercase tracking-[0.18em] text-stone-300">
          {statusMessage}
        </p>
      ) : (
        <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
          {t.hint}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full border border-stone-200 px-7 py-3 text-xs uppercase tracking-[0.2em] text-stone-50 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saving ? t.saving : t.submit}
      </button>
    </form>
  );
}
