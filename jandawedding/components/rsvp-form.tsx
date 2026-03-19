"use client";

import { useState } from "react";
import type { RsvpAttendance, RsvpRecord } from "@/lib/rsvp-store";
import type { Locale } from "@/lib/locale";

type RsvpFormProps = {
  defaultRecord: RsvpRecord | null;
  locale: Locale;
};

export function RsvpForm({ defaultRecord, locale }: RsvpFormProps) {
  const t = locale === "es"
    ? {
        selectAttendance: "Selecciona asistencia antes de enviar.",
        submitError: "No pudimos guardar tu confirmación. Inténtalo otra vez.",
        submitOk: "Confirmación guardada.",
        attendance: "Asistencia",
        yes: "Con gusto asistiré",
        no: "No podré asistir",
        guests: "Número de invitados",
        notes: "Necesidades alimenticias o mensaje",
        hint: "Puedes actualizar tu confirmación después.",
        saving: "Guardando...",
        submit: "Enviar Confirmación",
      }
    : {
        selectAttendance: "Select attendance before submitting.",
        submitError: "Unable to submit RSVP. Please try again.",
        submitOk: "RSVP saved successfully.",
        attendance: "Attendance",
        yes: "Happily attending",
        no: "Regretfully decline",
        guests: "Guest count",
        notes: "Dietary needs or message",
        hint: "Your RSVP can be updated later from this portal.",
        saving: "Saving...",
        submit: "Submit RSVP",
      };
  const [attendance, setAttendance] = useState<RsvpAttendance | "">(
    defaultRecord?.attendance ?? "",
  );
  const [guestCount, setGuestCount] = useState<number>(
    defaultRecord?.guestCount ?? 1,
  );
  const [notes, setNotes] = useState(defaultRecord?.notes ?? "");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!attendance) {
      setStatusMessage(t.selectAttendance);
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendance, guestCount, notes }),
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatusMessage(data.error ?? t.submitError);
      return;
    }

    setStatusMessage(t.submitOk);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
      <select
        name="attendance"
        value={attendance}
        onChange={(event) => setAttendance(event.target.value as RsvpAttendance)}
        className="rounded-xl border border-stone-300/40 bg-stone-900/35 px-4 py-3 text-sm text-stone-50 outline-none ring-stone-100/20 transition focus:ring-2"
      >
        <option value="" disabled>
          {t.attendance}
        </option>
        <option value="yes">{t.yes}</option>
        <option value="no">{t.no}</option>
      </select>

      <input
        type="number"
        min={1}
        max={10}
        value={guestCount}
        onChange={(event) => setGuestCount(Number(event.target.value))}
        className="rounded-xl border border-stone-300/40 bg-stone-900/35 px-4 py-3 text-sm text-stone-50 outline-none ring-stone-100/20 transition focus:ring-2"
        placeholder={t.guests}
      />

      <textarea
        name="notes"
        rows={4}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder={t.notes}
        className="md:col-span-2 rounded-xl border border-stone-300/40 bg-stone-900/35 px-4 py-3 text-sm text-stone-50 placeholder:text-stone-300/70 outline-none ring-stone-100/20 transition focus:ring-2"
      />

      {statusMessage ? (
        <p className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-stone-300">
          {statusMessage}
        </p>
      ) : (
        <p className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-stone-300">
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
