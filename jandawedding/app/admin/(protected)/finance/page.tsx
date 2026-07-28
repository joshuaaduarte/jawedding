import { getAllBudgetItems } from "@/lib/budget-store";
import { FinanceBoard } from "./finance-board";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AdminFinancePage() {
  const items = await getAllBudgetItems();

  const estimated = items.reduce((s, i) => s + i.estimated, 0);
  const actual = items.reduce((s, i) => s + i.actual, 0);
  const paid = items.reduce((s, i) => s + i.paid, 0);
  // Outstanding uses actual where set, otherwise the estimate.
  const committed = items.reduce(
    (s, i) => s + (i.actual > 0 ? i.actual : i.estimated),
    0,
  );
  const remaining = committed - paid;

  const stats = [
    { label: "Estimated", value: usd.format(estimated), color: "text-stone-800" },
    { label: "Actual", value: usd.format(actual), color: "text-stone-800" },
    { label: "Paid", value: usd.format(paid), color: "text-emerald-700" },
    { label: "Still Owed", value: usd.format(remaining), color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Finance</h1>
        <p className="mt-1 text-sm text-stone-600">
          {items.length} line {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
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
          </div>
        ))}
      </section>

      <FinanceBoard items={items} />
    </div>
  );
}
