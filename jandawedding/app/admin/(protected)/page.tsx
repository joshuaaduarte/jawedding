import Link from "next/link";
import { getAllRsvps } from "@/lib/rsvp-store";
import { getAllGuests } from "@/lib/guest-data";
import { getAllTasks } from "@/lib/task-store";
import { getAllBudgetItems } from "@/lib/budget-store";
import { getSeatAssignments } from "@/lib/seating-store";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AdminDashboard() {
  const [guests, rsvps, tasks, budgetItems, seats] = await Promise.all([
    getAllGuests(),
    getAllRsvps(),
    getAllTasks(),
    getAllBudgetItems(),
    getSeatAssignments(),
  ]);

  const openTasks = tasks.filter((t) => t.status !== "done").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter(
    (t) => t.status !== "done" && t.dueDate && new Date(t.dueDate) < today,
  ).length;
  const committed = budgetItems.reduce(
    (s, i) => s + (i.actual > 0 ? i.actual : i.estimated),
    0,
  );
  const paid = budgetItems.reduce((s, i) => s + i.paid, 0);
  const owed = committed - paid;
  const seatedCount = seats.filter((s) => s.tableId).length;

  const planningStats = [
    {
      label: "Open Tasks",
      value: openTasks,
      color: overdueTasks > 0 ? "text-amber-600" : "text-stone-800",
      sub: overdueTasks > 0 ? `${overdueTasks} overdue` : undefined,
    },
    { label: "Budget", value: usd.format(committed), color: "text-stone-800" },
    { label: "Still Owed", value: usd.format(owed), color: "text-amber-600" },
    {
      label: "Seated",
      value: `${seatedCount}/${seats.length}`,
      color: "text-stone-800",
    },
  ];

  const totalGuests = guests.length;
  const attending = rsvps.filter((r) => r.attendance === "yes").length;
  const declining = rsvps.filter((r) => r.attendance === "no").length;
  const pending = totalGuests - rsvps.length;
  const totalAttending = rsvps
    .filter((r) => r.attendance === "yes")
    .reduce((sum, r) => sum + r.guestCount, 0);
  const responseRate =
    totalGuests > 0 ? Math.round((rsvps.length / totalGuests) * 100) : 0;

  const stats = [
    { label: "Total Invited", value: totalGuests, color: "text-stone-800" },
    { label: "Attending", value: attending, color: "text-emerald-700" },
    { label: "Declining", value: declining, color: "text-rose-600" },
    { label: "No Response", value: pending, color: "text-amber-600" },
    { label: "Seats Confirmed", value: totalAttending, color: "text-stone-800" },
    { label: "Response Rate", value: `${responseRate}%`, color: "text-stone-800" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{s.label}</p>
            <p className={`mt-2 font-serif text-3xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </section>

      {/* Planning rollups */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {planningStats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
              {s.label}
            </p>
            <p className={`mt-2 font-serif text-2xl sm:text-3xl ${s.color}`}>
              {s.value}
            </p>
            {s.sub ? (
              <p className="mt-1 text-xs text-amber-600">{s.sub}</p>
            ) : null}
          </div>
        ))}
      </section>

      {/* Quick links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            href: "/admin/guests",
            title: "Guests →",
            label: "Manage",
            desc: "Add, edit, or remove guests and view their RSVP status.",
          },
          {
            href: "/admin/events",
            title: "Events →",
            label: "Manage",
            desc: "Add, edit, or remove wedding events and assign them to groups.",
          },
          {
            href: "/admin/tasks",
            title: "To-Do →",
            label: "Plan",
            desc: "Track open planning items by category, owner, and due date.",
          },
          {
            href: "/admin/finance",
            title: "Finance →",
            label: "Plan",
            desc: "Track estimates, actuals, and payments across every category.",
          },
          {
            href: "/admin/seating",
            title: "Seating →",
            label: "Plan",
            desc: "Assign confirmed guests to reception tables and watch capacity.",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm transition hover:border-stone-300"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {card.label}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-stone-900 transition group-hover:text-stone-700">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-stone-600">{card.desc}</p>
          </Link>
        ))}
      </section>

      {/* Recent RSVPs */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-stone-900">Recent RSVPs</h2>
        {rsvps.length === 0 ? (
          <p className="mt-4 text-sm text-stone-600">No RSVPs submitted yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.12em] text-stone-500">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Code</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Seats</th>
                  <th className="pb-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r) => (
                  <tr key={r.guestId} className="border-b border-stone-100 last:border-0">
                    <td className="py-3 pr-4">{r.fullName}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-stone-500">{r.inviteCode}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          r.attendance === "yes"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {r.attendance === "yes" ? "Attending" : "Declining"}
                      </span>
                    </td>
                    <td className="py-3 pr-4">{r.guestCount}</td>
                    <td className="py-3 text-xs text-stone-500">
                      {new Date(r.submittedAt).toLocaleDateString()}
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
