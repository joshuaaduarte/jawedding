import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getGuestById, updateGuest, deleteGuest, getAllGroups, type GuestGroup } from "@/lib/guest-data";
import { AdminSubmitButton } from "@/components/admin-submit-button";

type Props = { params: Promise<{ id: string }> };

export default async function EditGuestPage({ params }: Props) {
  const { id } = await params;
  const [guest, groups] = await Promise.all([getGuestById(id), getAllGroups()]);
  if (!guest) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateGuest(id, {
      firstName: (formData.get("firstName") as string).trim(),
      lastName: (formData.get("lastName") as string).trim(),
      email: (formData.get("email") as string).trim(),
      group: (formData.get("group") as GuestGroup),
      anecdote: (formData.get("anecdote") as string).trim(),
      anecdoteEs: (formData.get("anecdoteEs") as string).trim(),
      inviteCode: (formData.get("inviteCode") as string).trim().toUpperCase(),
      displayName: (formData.get("displayName") as string).trim(),
      familyName: (formData.get("familyName") as string).trim(),
      partyMembers: (formData.get("partyMembers") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    redirect("/admin/guests");
  }

  async function handleDelete() {
    "use server";
    await deleteGuest(id);
    redirect("/admin/guests");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Guests</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">
          {guest.firstName} {guest.lastName}
        </h1>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <form action={handleUpdate} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                First Name *
              </label>
              <input
                name="firstName"
                type="text"
                required
                defaultValue={guest.firstName}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Last Name *
              </label>
              <input
                name="lastName"
                type="text"
                required
                defaultValue={guest.lastName}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={guest.email}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Invite Code *
              </label>
              <input
                name="inviteCode"
                type="text"
                required
                defaultValue={guest.inviteCode}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Display Name <span className="normal-case text-stone-400">(optional — overrides first name in greeting)</span>
              </label>
              <input
                name="displayName"
                type="text"
                defaultValue={guest.displayName}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder='e.g. "The Lima Family" or "Ana &amp; Jorge"'
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Family Name{" "}
                <span className="normal-case text-stone-400">
                  (optional — used for locale-aware greeting: EN &quot;the Lima Family&quot; / ES &quot;la familia Lima&quot;)
                </span>
              </label>
              <input
                name="familyName"
                type="text"
                defaultValue={guest.familyName}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="e.g. Lima"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Guest Group
              </label>
              <select
                name="group"
                defaultValue={guest.group}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              >
                {groups.map((g) => (
                  <option key={g.name} value={g.name}>{g.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Personal Note (English)
              </label>
              <textarea
                name="anecdote"
                rows={4}
                defaultValue={guest.anecdote}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Write a personal note for this guest..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Personal Note (Spanish — optional)
              </label>
              <p className="mt-1 text-xs text-stone-500">
                Leave blank to fall back to the English note.
              </p>
              <textarea
                name="anecdoteEs"
                rows={4}
                defaultValue={guest.anecdoteEs}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Escribe una nota personal en español..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Party Members{" "}
                <span className="normal-case text-stone-400">
                  (comma-separated names, e.g. "Joshua, Ana" — used for Travel Board dropdown)
                </span>
              </label>
              <input
                name="partyMembers"
                type="text"
                defaultValue={guest.partyMembers.join(", ")}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="e.g. Joshua, Ana"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <AdminSubmitButton label="Save Changes" />
            <Link href="/admin/guests" className="text-sm text-stone-600 underline hover:text-stone-900">
              Cancel
            </Link>
          </div>
        </form>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="text-sm font-semibold text-rose-800">Danger Zone</h2>
        <p className="mt-1 text-xs text-rose-700">
          Deleting a guest will also remove their RSVP and carpool entry. This cannot be undone.
        </p>
        <form action={handleDelete} className="mt-4">
          <AdminSubmitButton label="Delete Guest" pendingLabel="Deleting..." />
        </form>
      </section>
    </div>
  );
}
