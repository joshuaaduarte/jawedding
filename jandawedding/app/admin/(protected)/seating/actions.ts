"use server";

import { revalidatePath } from "next/cache";
import {
  seedDefaultFixtures,
  updateFixtureTransform,
  updateFixtureSizeByKind,
  createFixture,
  deleteFixture,
} from "@/lib/fixtures-store";
import {
  createSeatingTable,
  updateSeatingTable,
  updateTablePosition,
  updateTableTransform,
  updateTableSizeByShape,
  updateTableShape,
  deleteSeatingTable,
  assignSeats,
  splitSeat,
  rejoinSeat,
  createSeat,
  updateSeat,
  deleteSeat,
  syncSeatsFromConfirmed,
} from "@/lib/seating-store";

export async function addTableAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  const capacity = parseInt((formData.get("capacity") as string) || "8", 10);
  await createSeatingTable({
    name,
    capacity: Number.isFinite(capacity) ? Math.max(0, capacity) : 8,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/seating");
}

export async function updateTableAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  const capacity = parseInt((formData.get("capacity") as string) || "8", 10);
  await updateSeatingTable(id, {
    name,
    capacity: Number.isFinite(capacity) ? Math.max(0, capacity) : 8,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/seating");
}

export async function updateTablePositionAction(
  id: string,
  posX: number | null,
  posY: number | null,
) {
  await updateTablePosition(id, posX, posY);
  revalidatePath("/admin/seating");
}

export async function updateTableTransformAction(
  id: string,
  posX: number,
  posY: number,
  rotation: number,
) {
  await updateTableTransform(id, posX, posY, rotation);
  revalidatePath("/admin/seating");
}

export async function updateTableSizeAction(
  shape: "round" | "rect",
  width: number,
  height: number,
) {
  await updateTableSizeByShape(shape, width, height);
  revalidatePath("/admin/seating");
}

export async function updateTableShapeAction(id: string, shape: "round" | "rect") {
  await updateTableShape(id, shape);
  revalidatePath("/admin/seating");
}

// ---- Floor-map fixtures (bar, dj, dance floor, apps, doors, …) ----

export async function seedFixturesAction() {
  await seedDefaultFixtures();
  revalidatePath("/admin/seating");
}

export async function updateFixtureTransformAction(
  id: string,
  posX: number,
  posY: number,
  rotation: number,
) {
  await updateFixtureTransform(id, posX, posY, rotation);
  revalidatePath("/admin/seating");
}

export async function updateFixtureSizeAction(
  kind: string,
  width: number,
  height: number,
) {
  await updateFixtureSizeByKind(kind, width, height);
  revalidatePath("/admin/seating");
}

export async function addFixtureAction(kind: string, label: string) {
  await createFixture({ kind, label });
  revalidatePath("/admin/seating");
}

export async function deleteFixtureAction(id: string) {
  await deleteFixture(id);
  revalidatePath("/admin/seating");
}

export async function deleteTableAction(id: string) {
  await deleteSeatingTable(id);
  revalidatePath("/admin/seating");
}

export async function assignSeatsAction(
  seatIds: string[],
  tableId: string | null,
) {
  await assignSeats(seatIds, tableId);
  revalidatePath("/admin/seating");
}

export async function splitSeatAction(id: string) {
  await splitSeat(id);
  revalidatePath("/admin/seating");
}

export async function rejoinSeatAction(id: string) {
  await rejoinSeat(id);
  revalidatePath("/admin/seating");
}

export async function addSeatAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  const tableId = (formData.get("tableId") as string) || null;
  await createSeat({
    name,
    tableId,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/seating");
}

export async function updateSeatAction(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  await updateSeat(id, {
    name,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/seating");
}

export async function deleteSeatAction(id: string) {
  await deleteSeat(id);
  revalidatePath("/admin/seating");
}

export async function syncSeatsAction() {
  await syncSeatsFromConfirmed();
  revalidatePath("/admin/seating");
}
