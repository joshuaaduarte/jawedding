import Link from "next/link";
import { getAllTravelPosts } from "@/lib/travel-store";

const MODE_LABELS = { flying: "Flying", driving: "Driving", other: "Other" };

export default async function AdminTravelPage() {
  const posts = await getAllTravelPosts();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Travel Board</h1>
        <p className="mt-1 text-sm text-stone-600">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone-500">No travel posts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.12em] text-stone-500">
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">From / To</th>
                  <th className="px-4 py-3">Arrives</th>
                  <th className="px-4 py-3">Departs</th>
                  <th className="px-4 py-3">Visible</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 font-medium">{post.guestName}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">{MODE_LABELS[post.travelMode]}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">
                      {post.travelMode === "flying"
                        ? [post.flyingFrom, post.flyingTo].filter(Boolean).join(" → ") || "—"
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-600">{post.arrivalDate || "—"}</td>
                    <td className="px-4 py-3 text-xs text-stone-600">{post.departureDate || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.isVisible
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {post.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate text-xs text-stone-600">
                      {post.notes || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/travel/${post.id}`}
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
