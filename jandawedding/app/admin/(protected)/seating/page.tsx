import { getSeatingTables, getSeatAssignments } from "@/lib/seating-store";
import { SeatingBoard } from "./seating-board";

export default async function AdminSeatingPage() {
  const [tables, seats] = await Promise.all([
    getSeatingTables(),
    getSeatAssignments(),
  ]);

  const assigned = seats.filter((s) => s.tableId).length;
  const totalCapacity = tables.reduce((s, t) => s + t.capacity, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Seating</h1>
        <p className="mt-1 text-sm text-stone-600">
          {assigned} of {seats.length} seated · {tables.length}{" "}
          {tables.length === 1 ? "table" : "tables"} · {totalCapacity} seats
        </p>
      </div>

      <SeatingBoard tables={tables} seats={seats} />
    </div>
  );
}
