"use client";

import { useState } from "react";
import type { CarpoolEntry } from "@/lib/carpool-store";
import type { Locale } from "@/lib/locale";

type ApiResponse = {
  entries: CarpoolEntry[];
};

type CarpoolBoardProps = {
  initialEntries: CarpoolEntry[];
  locale: Locale;
};

export function CarpoolBoard({ initialEntries, locale }: CarpoolBoardProps) {
  const t = locale === "es"
    ? {
        addRideError: "No se pudo publicar el viaje. Inténtalo otra vez.",
        addRideOk: "Viaje publicado.",
        offerRide: "Ofrecer Un Viaje",
        seats: "Asientos disponibles",
        contact: "Contacto (teléfono/correo)",
        notes: "Notas (hora de llegada, espacio de maletas, etc.)",
        postRide: "Publicar Viaje",
        saving: "Guardando...",
        currentPosts: "Viajes Publicados",
        empty: "Aún no hay viajes publicados.",
        toMonterey: "a Monterey, CA",
        seatLabel: "asiento(s)",
        contactLabel: "Contacto",
      }
    : {
        addRideError: "Could not add your ride listing. Try again.",
        addRideOk: "Ride listing added.",
        offerRide: "Offer A Ride",
        seats: "Seats available",
        contact: "Contact info (phone/email)",
        notes: "Notes (arrival time, luggage room, etc.)",
        postRide: "Post Ride",
        saving: "Saving...",
        currentPosts: "Current Ride Posts",
        empty: "No ride posts yet.",
        toMonterey: "to Monterey, CA",
        seatLabel: "seat(s)",
        contactLabel: "Contact",
      };
  const [entries, setEntries] = useState<CarpoolEntry[]>(initialEntries);
  const [airport, setAirport] = useState("SFO");
  const [arrivalDate, setArrivalDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadEntries() {
    const response = await fetch("/api/carpool");
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as ApiResponse;
    setEntries(data.entries);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSaving(true);

    const response = await fetch("/api/carpool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        airport,
        arrivalDate,
        seatsAvailable,
        contact,
        notes,
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setStatus(t.addRideError);
      return;
    }

    setStatus(t.addRideOk);
    setContact("");
    setNotes("");
    setSeatsAvailable(1);
    setArrivalDate("");
    loadEntries();
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-stone-200 bg-white p-6"
      >
        <h2 className="font-serif text-3xl text-stone-900">{t.offerRide}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            value={airport}
            onChange={(event) => setAirport(event.target.value)}
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          >
            <option value="SFO">SFO</option>
            <option value="OAK">OAK</option>
            <option value="SJC">SJC</option>
          </select>
          <input
            type="date"
            value={arrivalDate}
            onChange={(event) => setArrivalDate(event.target.value)}
            required
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
          />
          <input
            type="number"
            min={1}
            max={6}
            value={seatsAvailable}
            onChange={(event) => setSeatsAvailable(Number(event.target.value))}
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
            placeholder={t.seats}
          />
          <input
            type="text"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
            placeholder={t.contact}
            required
          />
          <textarea
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="md:col-span-2 rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-800 outline-none ring-stone-700/30 focus:ring-2"
            placeholder={t.notes}
          />
        </div>
        {status ? <p className="mt-3 text-sm text-stone-700">{status}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-full border border-stone-800 bg-stone-800 px-6 py-3 text-xs uppercase tracking-[0.18em] text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? t.saving : t.postRide}
        </button>
      </form>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="font-serif text-3xl text-stone-900">{t.currentPosts}</h3>
        {entries.length === 0 ? (
          <p className="mt-4 text-sm text-stone-700">{t.empty}</p>
        ) : (
          <div className="mt-4 space-y-3">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-xl border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                  {entry.airport} {t.toMonterey}
                </p>
                <p className="mt-1 text-sm text-stone-800">
                  {entry.guestName} • {entry.arrivalDate} • {entry.seatsAvailable}{" "}
                  {t.seatLabel}
                </p>
                <p className="mt-1 text-sm text-stone-700">
                  {t.contactLabel}: {entry.contact}
                </p>
                {entry.notes ? (
                  <p className="mt-1 text-sm text-stone-700">{entry.notes}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
