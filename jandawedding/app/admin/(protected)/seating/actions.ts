"use server";

import { revalidatePath } from "next/cache";
import {
  createSeatingTable,
  updateSeatingTable,
  deleteSeatingTable,
  assignSeats,
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
