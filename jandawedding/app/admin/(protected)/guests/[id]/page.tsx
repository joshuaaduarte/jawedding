import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getGuestById, updateGuest, deleteGuest, type GuestGroup } from "@/lib/guest-data";

type Props = { params: Promise<{ id: string }> };

export default async function EditGuestPage({ params }: Props) {
  const { id } = await params;
  const guest = await getGuestById(id);
  if (!guest) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateGuest(id, {
      firstName: (formData.get("firstName") as string).trim(),
      lastName: (formData.get("lastName") as string).trim(),
      email: (formData.get("email") as string).trim(),
      group: (formData.get("group") as GuestGroup),
      anecdote: (formData.get("anecdote") as string).trim(),
      inviteCode: (formData.get("inviteCode") as string).trim().toUpperCase(),
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
                Guest Group
              </label>
              <select
                name="group"
                defaultValue={guest.group}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              >
                <option value="all">All Guests (Ceremony + Reception)</option>
                <option value="family">Family</option>
                <option value="bridal-party">Bridal Party (+ Rehearsal)</option>
                <option value="parents">Parents (+ Rehearsal)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Personal Note / Anecdote
              </label>
              <textarea
                name="anecdote"
                rows={4}
                defaultValue={guest.anecdote}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Write a personal note for this guest..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Save Changes
            </button>
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
          <button
            type="submit"
            className="h-9 rounded-full border border-rose-400 bg-white px-5 text-xs uppercase tracking-[0.16em] text-rose-700 transition hover:bg-rose-100"
          >
            Delete Guest
          </button>
        </form>
      </section>
    </div>
  );
}
