"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import {
  updateTableTransformAction,
  updateTableSizeAction,
  updateTableShapeAction,
  seedFixturesAction,
  updateFixtureTransformAction,
  updateFixtureSizeAction,
} from "./actions";
import type { SeatAssignment, SeatingTable } from "@/lib/seating-store";
import type { FloorFixture } from "@/lib/fixtures-store";

// The floor map is the spatial view of the reception. Every object — guest
// tables, the sweetheart, and the fixed furniture (bar, dj, dance floor, apps,
// doors) — can be dragged, rotated, and resized. Geometry is stored as
// fractions of the room's width (see the schema notes); because the room is
// drawn 10:7, a size in width-units renders square, so container query units
// (cqw) size every object consistently.
//
// Position and rotation are per-object. Size is shared per group: all round
// guest tables share one size, both apps stations share one, etc. Resizing any
// member updates the whole group at once, both on screen and in the database.

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const clampSize = (n: number) => Math.min(0.9, Math.max(0.02, n));

// Default diameter / dimensions (fraction of width) when a table hasn't been
// sized yet. Fixtures always arrive with a size from the database.
const DEFAULT_ROUND = 0.085;
const DEFAULT_RECT = { w: 0.16, h: 0.07 };

// Starting spots for tables not yet placed: a tidy two-row tray along the
// bottom, clear of the central fixtures. The first drag persists real coords.
function defaultTablePos(index: number): { x: number; y: number } {
  const perRow = 9;
  const col = index % perRow;
  const row = Math.floor(index / perRow);
  return { x: 0.09 + col * 0.095, y: 0.9 - row * 0.075 };
}

// One object on the map, whether it holds guests (a table) or not (a fixture).
type MapItem = {
  id: string;
  source: "table" | "fixture";
  label: string;
  round: boolean;
  // Size group: every item sharing this key resizes together.
  groupKey: string;
  posX: number | null;
  posY: number | null;
  width: number | null;
  height: number | null;
  rotation: number;
  // Tables only:
  capacity?: number;
  occupied?: number;
  shape?: "round" | "rect";
  kind?: string;
};

type DragState = {
  mode: "move" | "rotate" | "resize";
  item: MapItem;
  index: number;
  startClientX: number;
  startClientY: number;
  startPosX: number;
  startPosY: number;
  startRotation: number;
  startAngle: number;
  startWidth: number;
  startHeight: number;
  moved: boolean;
};

export function FloorMap({
  tables,
  seats,
  fixtures,
}: {
  tables: SeatingTable[];
  seats: SeatAssignment[];
  fixtures: FloorFixture[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [posOverride, setPosOverride] = useState<Record<string, { x: number; y: number }>>({});
  const [rotOverride, setRotOverride] = useState<Record<string, number>>({});
  const [sizeOverride, setSizeOverride] = useState<Record<string, { w: number; h: number }>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [seeding, startSeed] = useTransition();

  const occupancyByTable = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of seats) {
      if (!s.tableId) continue;
      map.set(s.tableId, (map.get(s.tableId) ?? 0) + 1);
    }
    return map;
  }, [seats]);

  // Unify tables and fixtures into one list, remembering each table's index so
  // unplaced ones fall into the bottom tray in a stable order.
  const items = useMemo<MapItem[]>(() => {
    const tableItems: MapItem[] = tables.map((t) => ({
      id: t.id,
      source: "table",
      label: t.name,
      round: t.shape !== "rect",
      groupKey: `table:${t.shape}`,
      posX: t.posX,
      posY: t.posY,
      width: t.width,
      height: t.height,
      rotation: t.rotation,
      capacity: t.capacity,
      occupied: occupancyByTable.get(t.id) ?? 0,
      shape: t.shape,
    }));
    const fixtureItems: MapItem[] = fixtures.map((f) => ({
      id: f.id,
      source: "fixture",
      label: f.label,
      round: false,
      groupKey: `fixture:${f.kind}`,
      posX: f.posX,
      posY: f.posY,
      width: f.width,
      height: f.height,
      rotation: f.rotation,
      kind: f.kind,
    }));
    // Fixtures first so tables sit on top and stay grabbable.
    return [...fixtureItems, ...tableItems];
  }, [tables, fixtures, occupancyByTable]);

  const tableIndex = useMemo(() => {
    const map = new Map<string, number>();
    tables.forEach((t, i) => map.set(t.id, i));
    return map;
  }, [tables]);

  const posFor = (item: MapItem) => {
    if (posOverride[item.id]) return posOverride[item.id];
    if (item.posX != null && item.posY != null) return { x: item.posX, y: item.posY };
    return defaultTablePos(tableIndex.get(item.id) ?? 0);
  };
  const rotFor = (item: MapItem) => rotOverride[item.id] ?? item.rotation;
  const sizeFor = (item: MapItem) => {
    if (sizeOverride[item.groupKey]) return sizeOverride[item.groupKey];
    if (item.width != null && item.height != null)
      return { w: item.width, h: item.height };
    return item.round
      ? { w: DEFAULT_ROUND, h: DEFAULT_ROUND }
      : { w: DEFAULT_RECT.w, h: DEFAULT_RECT.h };
  };

  function rect() {
    return containerRef.current?.getBoundingClientRect() ?? null;
  }

  function beginDrag(
    e: React.PointerEvent,
    item: MapItem,
    mode: DragState["mode"],
  ) {
    e.preventDefault();
    e.stopPropagation();
    const r = rect();
    if (!r) return;
    containerRef.current?.setPointerCapture(e.pointerId);
    const pos = posFor(item);
    const size = sizeFor(item);
    const centerX = r.left + pos.x * r.width;
    const centerY = r.top + pos.y * r.height;
    dragRef.current = {
      mode,
      item,
      index: tableIndex.get(item.id) ?? 0,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
      startRotation: rotFor(item),
      startAngle: (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI,
      startWidth: size.w,
      startHeight: size.h,
      moved: false,
    };
  }

  function onMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    const r = rect();
    if (!drag || !r) return;
    const dx = e.clientX - drag.startClientX;
    const dy = e.clientY - drag.startClientY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;

    if (drag.mode === "move") {
      const x = clamp01(drag.startPosX + dx / r.width);
      const y = clamp01(drag.startPosY + dy / r.height);
      setPosOverride((p) => ({ ...p, [drag.item.id]: { x, y } }));
    } else if (drag.mode === "rotate") {
      const centerX = r.left + drag.startPosX * r.width;
      const centerY = r.top + drag.startPosY * r.height;
      const angle = (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI;
      const rotation = Math.round(drag.startRotation + (angle - drag.startAngle));
      setRotOverride((p) => ({ ...p, [drag.item.id]: rotation }));
    } else {
      // resize — grouped, so the override is keyed by groupKey.
      if (drag.item.round) {
        const centerX = r.left + drag.startPosX * r.width;
        const centerY = r.top + drag.startPosY * r.height;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const d = clampSize((2 * dist) / r.width);
        setSizeOverride((p) => ({ ...p, [drag.item.groupKey]: { w: d, h: d } }));
      } else {
        // Map the pointer delta into the object's own (unrotated) frame so a
        // rotated fixture still resizes along its edges.
        const rad = (-drag.startRotation * Math.PI) / 180;
        const localDx = dx * Math.cos(rad) - dy * Math.sin(rad);
        const localDy = dx * Math.sin(rad) + dy * Math.cos(rad);
        const w = clampSize(drag.startWidth + (2 * localDx) / r.width);
        const h = clampSize(drag.startHeight + (2 * localDy) / r.width);
        setSizeOverride((p) => ({ ...p, [drag.item.groupKey]: { w, h } }));
      }
    }
  }

  function endDrag(e: React.PointerEvent) {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    containerRef.current?.releasePointerCapture?.(e.pointerId);

    if (!drag.moved) {
      setSelectedId((cur) => (cur === drag.item.id ? null : drag.item.id));
      return;
    }

    const { item } = drag;
    if (drag.mode === "resize") {
      const size = sizeOverride[item.groupKey] ?? sizeFor(item);
      if (item.source === "table") {
        startTransition(() =>
          updateTableSizeAction(item.shape === "rect" ? "rect" : "round", size.w, size.h),
        );
      } else {
        startTransition(() => updateFixtureSizeAction(item.kind ?? "", size.w, size.h));
      }
    } else {
      const pos = posOverride[item.id] ?? posFor(item);
      const rotation = rotOverride[item.id] ?? rotFor(item);
      if (item.source === "table") {
        startTransition(() =>
          updateTableTransformAction(item.id, pos.x, pos.y, rotation),
        );
      } else {
        startTransition(() =>
          updateFixtureTransformAction(item.id, pos.x, pos.y, rotation),
        );
      }
    }
  }

  function flipShape(item: MapItem) {
    const next = item.shape === "rect" ? "round" : "rect";
    startTransition(() => updateTableShapeAction(item.id, next));
  }

  const selected = selectedId ? items.find((i) => i.id === selectedId) ?? null : null;
  const selectedRoster =
    selected && selected.source === "table"
      ? seats
          .filter((s) => s.tableId === selected.id)
          .map((s) => s.name)
          .sort((a, b) => a.localeCompare(b))
      : [];

  const hasTables = tables.length > 0;
  const hasFixtures = fixtures.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-xs text-stone-500">
          Drag anything to move it. Select an object to rotate or resize it — resizing
          one table (or one apps station) resizes the whole group so they stay uniform.
          Everything saves automatically. Tap a table to see who&apos;s seated there.
        </p>
        {!hasFixtures ? (
          <button
            type="button"
            onClick={() => startSeed(() => seedFixturesAction())}
            disabled={seeding}
            className="inline-flex h-9 shrink-0 items-center rounded-full border border-stone-300 px-4 text-xs uppercase tracking-[0.16em] text-stone-700 transition hover:bg-stone-100 disabled:opacity-50"
          >
            {seeding ? "Adding…" : "+ Add venue furniture"}
          </button>
        ) : null}
      </div>

      <div
        ref={containerRef}
        onPointerDown={() => setSelectedId(null)}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        style={{ containerType: "size" }}
        className="relative aspect-[10/7] w-full touch-none select-none overflow-hidden rounded-2xl border-2 border-stone-400 bg-stone-50 shadow-sm"
      >
        {!hasTables && !hasFixtures ? (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-stone-500">
            Add tables in the List view and click “Add venue furniture” to start
            arranging your floor plan.
          </div>
        ) : null}

        {items.map((item) => {
          const pos = posFor(item);
          const size = sizeFor(item);
          const rotation = rotFor(item);
          const isSelected = item.id === selectedId;
          const isTable = item.source === "table";
          const over = isTable && (item.occupied ?? 0) > (item.capacity ?? 0);

          return (
            <div
              key={item.id}
              onPointerDown={(e) => beginDrag(e, item, "move")}
              style={{
                left: `${pos.x * 100}%`,
                top: `${pos.y * 100}%`,
                width: `${size.w * 100}cqw`,
                height: `${size.h * 100}cqw`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
              className={`absolute flex cursor-grab items-center justify-center border text-center leading-tight transition-colors active:cursor-grabbing ${
                item.round ? "rounded-full" : "rounded-lg"
              } ${
                isTable
                  ? over
                    ? "border-rose-300 bg-rose-50 text-rose-800 shadow-sm"
                    : "border-stone-300 bg-white text-stone-800 shadow-sm"
                  : item.kind === "bar"
                    ? "border-stone-400 bg-stone-300 text-stone-700"
                    : item.kind === "dance_floor"
                      ? "border-stone-300 bg-white/70 text-stone-500"
                      : "border-stone-300 bg-stone-100 text-stone-600"
              } ${isSelected ? "z-20 ring-2 ring-stone-800 ring-offset-1" : "z-10"}`}
            >
              <div className="flex flex-col items-center px-1">
                <span
                  className={`max-w-full truncate ${
                    isTable ? "text-[11px] font-medium" : "text-[10px] uppercase tracking-[0.08em]"
                  }`}
                >
                  {item.label}
                </span>
                {isTable ? (
                  <span
                    className={`text-[10px] tabular-nums ${over ? "text-rose-600" : "text-stone-500"}`}
                  >
                    {item.occupied}/{item.capacity}
                  </span>
                ) : null}
              </div>

              {isSelected ? (
                <>
                  {/* Rotate handle, above the object */}
                  <button
                    type="button"
                    aria-label="Rotate"
                    onPointerDown={(e) => beginDrag(e, item, "rotate")}
                    style={{ left: "50%", top: -26, transform: "translateX(-50%)" }}
                    className="absolute flex h-5 w-5 cursor-grab touch-none items-center justify-center rounded-full border border-stone-400 bg-white text-[10px] text-stone-600 shadow active:cursor-grabbing"
                  >
                    ⟳
                  </button>
                  {/* Resize handle, bottom-right corner */}
                  <button
                    type="button"
                    aria-label="Resize"
                    onPointerDown={(e) => beginDrag(e, item, "resize")}
                    style={{ right: -8, bottom: -8 }}
                    className="absolute h-4 w-4 cursor-nwse-resize touch-none rounded-sm border border-stone-400 bg-white shadow"
                  />
                </>
              ) : null}
            </div>
          );
        })}

        {/* Inline roster popover for the selected table */}
        {selected && selected.source === "table" ? (
          <div
            style={{
              left: `${clamp01(posFor(selected).x) * 100}%`,
              top: `${clamp01(posFor(selected).y) * 100}%`,
            }}
            className="pointer-events-none absolute z-30 -translate-x-1/2 translate-y-3 pt-6"
          >
            <div className="pointer-events-auto w-52 rounded-xl border border-stone-200 bg-white p-3 text-left shadow-lg">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate font-serif text-sm text-stone-900">{selected.label}</p>
                <span
                  className={`shrink-0 text-[11px] tabular-nums ${
                    (selected.occupied ?? 0) > (selected.capacity ?? 0)
                      ? "text-rose-600"
                      : "text-stone-500"
                  }`}
                >
                  {selected.occupied}/{selected.capacity}
                </span>
              </div>
              {selectedRoster.length === 0 ? (
                <p className="mt-1 text-xs text-stone-400">No one seated yet.</p>
              ) : (
                <ul className="mt-1.5 max-h-40 space-y-0.5 overflow-y-auto text-xs text-stone-700">
                  {selectedRoster.map((name, i) => (
                    <li key={i} className="truncate">
                      {name}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => flipShape(selected)}
                className="mt-2 text-[11px] text-stone-500 underline hover:text-stone-800"
              >
                {selected.shape === "rect" ? "Make round" : "Make rectangle"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
