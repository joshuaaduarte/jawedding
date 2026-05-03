import Link from "next/link";
import { getAllGuests } from "@/lib/guest-data";

const GROUP_LABELS: Record<string, string> = {
  all: "All Guests",
  family: "Family",
  "bridal-party": "Bridal Party",
  parents: "Parents",
};

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

      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        {guests.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-stone-600">No guests yet.</p>
            <Link href="/admin/guests/new" className="mt-4 inline-block text-sm underline">
              Add your first guest
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.12em] text-stone-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Invite Code</th>
                  <th className="px-4 py-3">Group</th>
                  <th className="px-4 py-3">RSVP</th>
                  <th className="px-4 py-3">Seats</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
