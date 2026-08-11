"use client";

import { useState } from "react";
import { SeatingBoard } from "./seating-board";
import { FloorMap } from "./floor-map";
import type { SeatAssignment, SeatingTable } from "@/lib/seating-store";
import type { FloorFixture } from "@/lib/fixtures-store";

// Two views over the same seating_tables rows: the List (assign people to
// tables) and the Map (place tables on the floor plan). One source of truth —
// switching tabs never loses work.
export function SeatingView({
  tables,
  seats,
  fixtures,
}: {
  tables: SeatingTable[];
  seats: SeatAssignment[];
  fixtures: FloorFixture[];
}) {
  const [view, setView] = useState<"list" | "map">("list");

  const tab = (id: "list" | "map", label: string) => (
    <button
      type="button"
      onClick={() => setView(id)}
      className={`h-9 rounded-full px-5 text-xs uppercase tracking-[0.18em] transition ${
        view === id
          ? "bg-stone-800 text-white"
          : "border border-stone-300 text-stone-600 hover:bg-stone-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-stone-100/60 p-1">
        {tab("list", "List")}
        {tab("map", "Map")}
      </div>

      {view === "list" ? (
        <SeatingBoard tables={tables} seats={seats} />
      ) : (
        <FloorMap tables={tables} seats={seats} fixtures={fixtures} />
      )}
    </div>
  );
}
