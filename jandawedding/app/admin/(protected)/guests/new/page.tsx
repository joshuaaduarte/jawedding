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
    const anecdoteEs = (formData.get("anecdoteEs") as string).trim();
    const inviteCode = (formData.get("inviteCode") as string).trim().toUpperCase();
    const displayName = (formData.get("displayName") as string).trim();

    if (!firstName || !lastName || !inviteCode) return;

    await createGuest({ firstName, lastName, email, group, anecdote, anecdoteEs, inviteCode, displayName });
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
                Display Name <span className="normal-case text-stone-400">(optional — overrides first name in greeting)</span>
              </label>
              <input
                name="displayName"
                type="text"
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder='e.g. "The Lima Family" or "Ana &amp; Jorge"'
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
                <option value="couple">Couple — Ana &amp; Joshua</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Personal Note (English)
              </label>
              <p className="mt-1 text-xs text-stone-500">
                Shown to the guest on their portal home page.
              </p>
              <textarea
                name="anecdote"
                rows={4}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Write a personal note for this guest..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Personal Note (Spanish — optional)
              </label>
              <p className="mt-1 text-xs text-stone-500">
                Shown when the guest views in Spanish. Leave blank to fall back to the English note.
              </p>
              <textarea
                name="anecdoteEs"
                rows={4}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
                placeholder="Escribe una nota personal en español..."
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
