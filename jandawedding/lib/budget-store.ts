import { getSupabase, isMissingTableError } from "./supabase";

export type BudgetItem = {
  id: string;
  category: string;
  vendor: string;
  description: string;
  estimated: number;
  actual: number;
  paid: number;
  dueDate: string | null;
  notes: string;
  createdAt: string;
};

export const BUDGET_CATEGORIES = [
  "Venue",
  "Catering",
  "Photography",
  "Attire",
  "Flowers",
  "Music",
  "Rentals",
  "Stationery",
  "Cake",
  "Transportation",
  "Honeymoon",
  "General",
];

function num(value: unknown): number {
  const n = typeof value === "string" ? parseFloat(value) : (value as number);
  return Number.isFinite(n) ? n : 0;
}

function mapBudgetItem(row: Record<string, unknown>): BudgetItem {
  return {
    id: row.id as string,
    category: (row.category as string) ?? "General",
    vendor: (row.vendor as string) ?? "",
    description: (row.description as string) ?? "",
    estimated: num(row.estimated),
    actual: num(row.actual),
    paid: num(row.paid),
    dueDate: (row.due_date as string) ?? null,
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at as string,
  };
}

export async function getAllBudgetItems(): Promise<BudgetItem[]> {
  const { data, error } = await getSupabase()
    .from("budget_items")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }
  return (data ?? []).map((row) => mapBudgetItem(row as Record<string, unknown>));
}

export async function createBudgetItem(input: {
  category: string;
  vendor: string;
  description: string;
  estimated: number;
  actual: number;
  paid: number;
  dueDate?: string | null;
  notes?: string;
}): Promise<BudgetItem> {
  const { data, error } = await getSupabase()
    .from("budget_items")
    .insert({
      category: input.category || "General",
      vendor: input.vendor,
      description: input.description,
      estimated: input.estimated,
      actual: input.actual,
      paid: input.paid,
      due_date: input.dueDate || null,
      notes: input.notes ?? "",
    })
    .select()
    .single();
  if (error) throw error;
  return mapBudgetItem(data as Record<string, unknown>);
}

export async function updateBudgetItem(
  id: string,
  input: {
    category?: string;
    vendor?: string;
    description?: string;
    estimated?: number;
    actual?: number;
    paid?: number;
    dueDate?: string | null;
    notes?: string;
  },
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.category !== undefined) patch.category = input.category || "General";
  if (input.vendor !== undefined) patch.vendor = input.vendor;
  if (input.description !== undefined) patch.description = input.description;
  if (input.estimated !== undefined) patch.estimated = input.estimated;
  if (input.actual !== undefined) patch.actual = input.actual;
  if (input.paid !== undefined) patch.paid = input.paid;
  if (input.dueDate !== undefined) patch.due_date = input.dueDate || null;
  if (input.notes !== undefined) patch.notes = input.notes;
  const { error } = await getSupabase()
    .from("budget_items")
    .update(patch)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteBudgetItem(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("budget_items")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
