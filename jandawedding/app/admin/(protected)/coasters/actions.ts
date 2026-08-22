"use server";

import { revalidatePath } from "next/cache";
import {
  syncCoastersFromConfirmed,
  updateCoaster,
  createCoaster,
  deleteCoaster,
} from "@/lib/coaster-store";

export async function syncCoastersAction() {
  await syncCoastersFromConfirmed();
  revalidatePath("/admin/coasters");
}

export async function setCoasterPhotoAction(id: string, hasPhoto: boolean) {
  await updateCoaster(id, { hasPhoto });
  revalidatePath("/admin/coasters");
}

export async function setCoasterDoneAction(id: string, isDone: boolean) {
  await updateCoaster(id, { isDone });
  revalidatePath("/admin/coasters");
}

export async function updateCoasterNotesAction(id: string, formData: FormData) {
  await updateCoaster(id, { notes: (formData.get("notes") as string)?.trim() ?? "" });
  revalidatePath("/admin/coasters");
}

export async function addCoasterAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  await createCoaster({
    name,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/coasters");
}

export async function deleteCoasterAction(id: string) {
  await deleteCoaster(id);
  revalidatePath("/admin/coasters");
}
