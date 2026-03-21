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
          submitOk: "Confirmación guardada. ¡Nos vemos pronto!",
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
          submitOk: "RSVP saved. We can't wait to see you!",
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
  const [statusOk, setStatusOk] = useState(false);
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
      setStatusOk(false);
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
      setStatusOk(false);
      return;
    }

    setStatusMessage(t.submitOk);
    setStatusOk(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {guests.map((guest) => {
        const state = states[guest.id];
        return (
          <div
            key={guest.id}
            className="rounded-2xl p-5"
            style={{
              border: "1px solid rgba(201,160,160,0.2)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <p
              className="font-serif italic"
              style={{ fontSize: "1.1rem", color: "#f0e0d0" }}
            >
              {guest.firstName} {guest.lastName}
            </p>

            <div className="mt-4 flex gap-2">
              {/* Attending */}
              <button
                type="button"
                onClick={() => setAttendance(guest.id, "yes")}
                className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.18em] transition"
                style={
                  state?.attendance === "yes"
                    ? {
                        background: "#2d6a4f",
                        border: "1px solid #3d8a68",
                        color: "#d4f1e4",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(201,160,160,0.35)",
                        color: "#c4a898",
                      }
                }
              >
                {t.yes}
              </button>

              {/* Declining */}
              <button
                type="button"
                onClick={() => setAttendance(guest.id, "no")}
                className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.18em] transition"
                style={
                  state?.attendance === "no"
                    ? {
                        background: "#6b3a3a",
                        border: "1px solid #8a5050",
                        color: "#f0d4d4",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(201,160,160,0.35)",
                        color: "#c4a898",
                      }
                }
              >
                {t.no}
              </button>
            </div>

            <textarea
              rows={2}
              value={state?.notes ?? ""}
              onChange={(e) => setNotes(guest.id, e.target.value)}
              placeholder={t.notes}
              className="mt-4 w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{
                border: "1px solid rgba(201,160,160,0.2)",
                background: "rgba(255,255,255,0.04)",
                color: "#f0e0d0",
              }}
            />
          </div>
        );
      })}

      {/* Status message */}
      {statusMessage ? (
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: statusOk ? "#7ec8a0" : "#e0a0a0" }}
        >
          {statusMessage}
        </p>
      ) : (
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: "#8a7060" }}
        >
          {t.hint}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full px-8 py-3 text-xs uppercase tracking-[0.24em] transition disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          border: "1px solid #c9a0a0",
          color: "#f0e0d0",
          background: "transparent",
        }}
      >
        {saving ? t.saving : t.submit}
      </button>
    </form>
  );
}
