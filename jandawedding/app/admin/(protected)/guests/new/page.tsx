import Link from "next/link";
import { redirect } from "next/navigation";
import { getNextInviteCode, createGuest, type GuestGroup } from "@/lib/guest-data";
import { AdminSubmitButton } from "@/components/admin-submit-button";

export default async function NewGuestPage() {
  const nextCode = await getNextInviteCode();

  async function handleCreate(formData: FormData) {
    "use server";
    const firstName = (formData.get("firstName") as string).trim();
    const lastName = (formData.get("lastName") as string).trim();
    const email = (formData.get("email") as string).trim();
    const group = (formData.get("group") as GuestGroup) ?? "all";
    const anecdote = (formData.get("anecdote") as string).trim();
    const inviteCode = (formData.get("inviteCode") as string).trim().toUpperCase();

    if (!firstName || !lastName || !inviteCode) return;

    await createGuest({ firstName, lastName, email, group, anecdote, inviteCode });
    redirect("/admin/guests");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Guests</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Add Guest</h1>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <form action={handleCreate} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                First Name *
              </label>
              <input
                name="firstName"
                type="text"
                required
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
                defaultValue={nextCode}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Guest Group
              </label>
              <select
                name="group"
                defaultValue="all"
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
              <p className="mt-1 text-xs text-stone-500">
                This message is shown to the guest when they log in to the portal.
              </p>
              <textarea
                name="anecdote"
                rows={4}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Write a personal note for this guest..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <AdminSubmitButton label="Add Guest" />
            <Link
              href="/admin/guests"
              className="text-sm text-stone-600 underline hover:text-stone-900"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
