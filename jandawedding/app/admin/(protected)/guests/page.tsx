import Link from "next/link";
import { getAllGuests } from "@/lib/guest-data";
import GuestsTable from "./guests-table";

export default async function AdminGuestsPage() {
  const guests = await getAllGuests();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
          <h1 className="mt-1 font-serif text-4xl text-stone-900">Guests</h1>
          <p className="mt-1 text-sm text-stone-600">{guests.length} guests registered</p>
        </div>
        <Link
          href="/admin/guests/new"
          className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          + Add Guests
        </Link>
      </div>

      {guests.length === 0 ? (
        <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="p-8 text-center">
            <p className="text-sm text-stone-600">No guests yet.</p>
            <Link href="/admin/guests/new" className="mt-4 inline-block text-sm underline">
              Add your first guest
            </Link>
          </div>
        </section>
      ) : (
        <GuestsTable guests={guests} />
      )}
    </div>
  );
}
