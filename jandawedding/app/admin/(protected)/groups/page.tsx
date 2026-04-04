import { redirect } from "next/navigation";
import { getAllGroups, createGroup, deleteGroup, countGuestsInGroup } from "@/lib/guest-data";

export default async function GroupsPage() {
  const groups = await getAllGroups();

  const counts = await Promise.all(
    groups.map(async (g) => [g.name, await countGuestsInGroup(g.name)] as const),
  );
  const countMap = Object.fromEntries(counts);

  async function handleCreate(formData: FormData) {
    "use server";
    const raw = (formData.get("name") as string).trim().toLowerCase();
    const name = raw.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const label = (formData.get("label") as string).trim();
    if (!name || !label) return;
    await createGroup({ name, label });
    redirect("/admin/groups");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const count = await countGuestsInGroup(name);
    if (count > 0) redirect("/admin/groups");
    await deleteGroup(name);
    redirect("/admin/groups");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Groups</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Guest Groups</h1>
        <p className="mt-2 text-sm text-stone-500">
          Groups control which events guests can see and are used to segment the guest list.
        </p>
      </div>

      {/* Group list */}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-[0.14em] text-stone-500">
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Label</th>
              <th className="px-6 py-4">Guests</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => {
              const guestCount = countMap[g.name] ?? 0;
              return (
                <tr key={g.id} className="border-b border-stone-50 last:border-0">
                  <td className="px-6 py-4 font-mono text-xs text-stone-600">{g.name}</td>
                  <td className="px-6 py-4 text-stone-900">{g.label}</td>
                  <td className="px-6 py-4 text-stone-500">{guestCount}</td>
                  <td className="px-6 py-4 text-right">
                    {guestCount === 0 ? (
                      <form action={handleDelete}>
                        <input type="hidden" name="name" value={g.name} />
                        <button
                          type="submit"
                          className="text-xs text-rose-600 underline hover:text-rose-800"
                        >
                          Delete
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs text-stone-400">In use</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Add group */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-700">
          Add Group
        </h2>
        <form action={handleCreate} className="mt-4 flex flex-wrap items-end gap-4">
          <div className="min-w-40 flex-1">
            <label className="block text-xs uppercase tracking-[0.14em] text-stone-500">
              Slug *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. close-friends"
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm outline-none ring-stone-700/30 transition focus:ring-2"
            />
            <p className="mt-1 text-xs text-stone-400">Lowercase letters and hyphens only. Cannot be changed later.</p>
          </div>
          <div className="min-w-40 flex-1">
            <label className="block text-xs uppercase tracking-[0.14em] text-stone-500">
              Display Label *
            </label>
            <input
              name="label"
              type="text"
              required
              placeholder="e.g. Close Friends"
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none ring-stone-700/30 transition focus:ring-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Add Group
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
