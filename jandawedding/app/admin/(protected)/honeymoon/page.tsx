import { getAllHoneymoonItems } from "@/lib/honeymoon-store";
import { HoneymoonBoard } from "./honeymoon-board";

export default async function AdminHoneymoonPage() {
  const items = await getAllHoneymoonItems();

  const booked = items.filter((i) => i.status === "booked").length;
  const planned = items.filter((i) => i.status === "planned").length;
  const ideas = items.filter((i) => i.status === "idea").length;
  const totalCost = items.reduce((sum, i) => sum + i.cost, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Honeymoon · Japan 🇯🇵</h1>
        <p className="mt-1 text-sm text-stone-600">
          {booked} booked · {planned} planned · {ideas} ideas
          {totalCost > 0 ? (
            <span>
              {" "}
              ·{" "}
              {totalCost.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}{" "}
              est.
            </span>
          ) : null}
        </p>
      </div>

      <HoneymoonBoard items={items} />
    </div>
  );
}
