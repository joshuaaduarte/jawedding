"use server";

import { revalidatePath } from "next/cache";
import {
  createHoneymoonItem,
  updateHoneymoonItem,
  deleteHoneymoonItem,
  type HoneymoonStatus,
} from "@/lib/honeymoon-store";

function parseForm(formData: FormData) {
  return {
    title: (formData.get("title") as string)?.trim(),
    city: (formData.get("city") as string)?.trim() || "",
    category: (formData.get("category") as string)?.trim() || "Sightseeing",
    status: ((formData.get("status") as string) || "idea") as HoneymoonStatus,
    itemDate: (formData.get("itemDate") as string) || null,
    endDate: (formData.get("endDate") as string) || null,
    timeLabel: (formData.get("timeLabel") as string)?.trim() || "",
    cost: parseFloat(formData.get("cost") as string) || 0,
    address: (formData.get("address") as string)?.trim() || "",
    url: (formData.get("url") as string)?.trim() || "",
    notes: (formData.get("notes") as string)?.trim() || "",
  };
}

export async function addHoneymoonItemAction(formData: FormData) {
  const input = parseForm(formData);
  if (!input.title) return;
  await createHoneymoonItem(input);
  revalidatePath("/admin/honeymoon");
}

export async function updateHoneymoonItemAction(id: string, formData: FormData) {
  const input = parseForm(formData);
  if (!input.title) return;
  await updateHoneymoonItem(id, input);
  revalidatePath("/admin/honeymoon");
}

export async function setHoneymoonStatusAction(id: string, status: HoneymoonStatus) {
  await updateHoneymoonItem(id, { status });
  revalidatePath("/admin/honeymoon");
}

export async function deleteHoneymoonItemAction(id: string) {
  await deleteHoneymoonItem(id);
  revalidatePath("/admin/honeymoon");
}
