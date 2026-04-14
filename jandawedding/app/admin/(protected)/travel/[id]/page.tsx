import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTravelPostById, adminUpdateTravelPost, adminDeleteTravelPost } from "@/lib/travel-store";
import { AdminSubmitButton } from "@/components/admin-submit-button";

type Props = { params: Promise<{ id: string }> };

export default async function EditTravelPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getTravelPostById(id);
  if (!post) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const isVisible = formData.get("isVisible") === "on";
    const travelModeRaw = formData.get("travelMode") as string;
    const travelMode =
      travelModeRaw === "flying" || travelModeRaw === "driving" || travelModeRaw === "other"
        ? travelModeRaw
        : "flying";

    await adminUpdateTravelPost(id, {
      travelerName: (formData.get("travelerName") as string).trim(),
      travelMode,
      flyingFrom: (formData.get("flyingFrom") as string).trim(),
      flyingTo: (formData.get("flyingTo") as string).trim(),
      arrivalDate: (formData.get("arrivalDate") as string).trim(),
      departureDate: (formData.get("departureDate") as string).trim(),
      contact: (formData.get("contact") as string).trim(),
      notes: (formData.get("notes") as string).trim(),
      isVisible,
    });
    redirect("/admin/travel");
  }

  async function handleDelete() {
    "use server";
    await adminDeleteTravelPost(id);
    redirect("/admin/travel");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Travel Board</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">{post.guestName}</h1>
        <p className="mt-1 font-mono text-xs text-stone-400">{post.inviteCode}</p>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <form action={handleUpdate} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Traveler Name{" "}
                <span className="normal-case text-stone-400">(leave blank to show guest name)</span>
              </label>
              <input
                name="travelerName"
                type="text"
                defaultValue={post.travelerName}
                placeholder="e.g. Joshua"
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Travel Mode
              </label>
              <select
                name="travelMode"
                defaultValue={post.travelMode}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              >
                <option value="flying">Flying</option>
                <option value="driving">Driving</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Flying From
              </label>
              <input
                name="flyingFrom"
                type="text"
                defaultValue={post.flyingFrom}
                placeholder="e.g. Los Angeles (LAX)"
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Flying To
              </label>
              <input
                name="flyingTo"
                type="text"
                defaultValue={post.flyingTo}
                placeholder="e.g. SFO, OAK, SJC"
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Arrival Date
              </label>
              <input
                name="arrivalDate"
                type="date"
                defaultValue={post.arrivalDate}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Departure Date
              </label>
              <input
                name="departureDate"
                type="date"
                defaultValue={post.departureDate}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Contact
              </label>
              <input
                name="contact"
                type="text"
                defaultValue={post.contact}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-stone-600">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                defaultValue={post.notes}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none ring-stone-700/30 transition focus:ring-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isVisible"
                  defaultChecked={post.isVisible}
                  className="h-4 w-4 rounded border-stone-300 accent-stone-800"
                />
                <span className="text-sm text-stone-700">Show on Travel Board</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <AdminSubmitButton label="Save Changes" />
            <Link href="/admin/travel" className="text-sm text-stone-600 underline hover:text-stone-900">
              Cancel
            </Link>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="text-sm font-semibold text-rose-800">Danger Zone</h2>
        <p className="mt-1 text-xs text-rose-700">
          Permanently deletes this travel post. The guest can re-submit if needed.
        </p>
        <form action={handleDelete} className="mt-4">
          <AdminSubmitButton label="Delete Post" pendingLabel="Deleting..." />
        </form>
      </section>
    </div>
  );
}
