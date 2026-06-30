"use client";

import { useEffect, useState } from "react";
import type { RsvpAttendance, RsvpRecord } from "@/lib/rsvp-store";
import type { Guest } from "@/lib/guest-data";
import type { Locale } from "@/lib/locale";
import { useUnsavedChanges } from "@/components/unsaved-changes";

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
          submitOkAttending: "Confirmación guardada. ¡Nos vemos pronto!",
          submitOkDeclining: "Confirmación guardada. Lamentamos que no puedas acompañarnos. ¡Gracias por avisarnos!",
          submitOkMixed: "Confirmación guardada. ¡Gracias por responder!",
          yes: "Asistiré",
          no: "No podré",
          notes: "Necesidades alimenticias",
          hint: "Puedes actualizar tu confirmación después.",
          unsaved: "Tienes cambios sin guardar — ¡no olvides presionar Guardar!",
          saving: "Guardando...",
          submit: "Guardar Confirmación",
          savedLabel: "✓ Guardado",
        }
      : {
          selectAll: "Please select attendance for each person.",
          submitError: "Unable to submit RSVP. Please try again.",
          submitOkAttending: "RSVP saved. We can't wait to see you!",
          submitOkDeclining: "RSVP saved. We're sorry you can't make it — thank you for letting us know!",
          submitOkMixed: "RSVP saved. Thank you for responding!",
          yes: "Attending",
          no: "Declining",
          notes: "Dietary needs",
          hint: "Your RSVP can be updated later from this portal.",
          unsaved: "You have unsaved changes — don't forget to press Save!",
          saving: "Saving...",
          submit: "Save my RSVP",
          savedLabel: "✓ Saved",
        };

  const initialStates: Record<string, GuestState> = Object.fromEntries(
    guests.map((g) => [
      g.id,
      {
        attendance: existingRsvps[g.id]?.attendance ?? "",
        notes: existingRsvps[g.id]?.notes ?? "",
      },
    ]),
  );

  const [states, setStates] = useState<Record<string, GuestState>>(initialStates);
  // Baseline of what's persisted on the server, so we can detect unsaved edits.
  const [savedStates, setSavedStates] =
    useState<Record<string, GuestState>>(initialStates);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusOk, setStatusOk] = useState(false);
  const [saving, setSaving] = useState(false);

  const dirty = guests.some((g) => {
    const cur = states[g.id];
    const base = savedStates[g.id];
    return cur.attendance !== base.attendance || cur.notes !== base.notes;
  });
  const hasSaved = guests.some((g) => savedStates[g.id]?.attendance !== "");

  const unsavedChanges = useUnsavedChanges();

  // Native "Leave site?" warning for hard navigation (tab close / refresh).
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Publish dirty state so in-app portal nav can intercept tab switches.
  useEffect(() => {
    unsavedChanges?.setDirty(dirty);
    return () => unsavedChanges?.setDirty(false);
  }, [dirty, unsavedChanges]);

  function setAttendance(guestId: string, value: RsvpAttendance) {
    setStatusMessage(null);
    setStates((prev) => ({
      ...prev,
      [guestId]: { ...prev[guestId], attendance: value },
    }));
  }

  function setNotes(guestId: string, value: string) {
    setStatusMessage(null);
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

    // Selections are now persisted — reset the baseline so "unsaved" clears.
    setSavedStates(states);

    const anyAttending = guests.some((g) => states[g.id].attendance === "yes");
    const anyDeclining = guests.some((g) => states[g.id].attendance === "no");
    setStatusMessage(
      anyAttending && anyDeclining
        ? t.submitOkMixed
        : anyAttending
          ? t.submitOkAttending
          : t.submitOkDeclining,
    );
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
      ) : dirty ? (
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: "#e8c07a" }}
        >
          {t.unsaved}
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
        style={
          dirty
            ? {
                border: "1px solid #c9a0a0",
                color: "#2d1f14",
                background: "#e8c8a8",
                boxShadow: "0 0 0 4px rgba(232,192,122,0.18)",
              }
            : {
                border: "1px solid #c9a0a0",
                color: "#f0e0d0",
                background: "transparent",
              }
        }
      >
        {saving ? t.saving : !dirty && hasSaved ? t.savedLabel : t.submit}
      </button>
    </form>
  );
}
