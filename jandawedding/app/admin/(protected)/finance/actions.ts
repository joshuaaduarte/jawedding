"use server";

import { revalidatePath } from "next/cache";
import {
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "@/lib/budget-store";

function money(formData: FormData, key: string): number {
  const raw = (formData.get(key) as string) ?? "";
  const n = parseFloat(raw.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export async function addBudgetItemAction(formData: FormData) {
  const category = (formData.get("category") as string)?.trim() || "General";
  const vendor = (formData.get("vendor") as string)?.trim() ?? "";
  const description = (formData.get("description") as string)?.trim() ?? "";
  if (!vendor && !description) return;
  await createBudgetItem({
    category,
    vendor,
    description,
    estimated: money(formData, "estimated"),
    actual: money(formData, "actual"),
    paid: money(formData, "paid"),
    dueDate: (formData.get("dueDate") as string) || null,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/finance");
}

export async function updateBudgetItemAction(id: string, formData: FormData) {
  await updateBudgetItem(id, {
    category: (formData.get("category") as string)?.trim() || "General",
    vendor: (formData.get("vendor") as string)?.trim() ?? "",
    description: (formData.get("description") as string)?.trim() ?? "",
    estimated: money(formData, "estimated"),
    actual: money(formData, "actual"),
    paid: money(formData, "paid"),
    dueDate: (formData.get("dueDate") as string) || null,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/finance");
}

export async function deleteBudgetItemAction(id: string) {
  await deleteBudgetItem(id);
  revalidatePath("/admin/finance");
}
