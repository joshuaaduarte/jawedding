import { getSupabase, isMissingTableError } from "./supabase";

export type HoneymoonStatus = "idea" | "planned" | "booked";

export type HoneymoonItem = {
  id: string;
  title: string;
  city: string;
  category: string;
  status: HoneymoonStatus;
  itemDate: string | null;
  endDate: string | null;
  timeLabel: string;
  cost: number;
  address: string;
  url: string;
  notes: string;
  sortOrder: number;
  createdAt: string;
};

// Suggested values surfaced in the UI (free-text still allowed).
export const HONEYMOON_CITIES = [
  "Tokyo",
  "Kyoto",
  "Osaka",
  "Nara",
  "Hakone",
  "Hiroshima",
  "Kanazawa",
  "Nikko",
];

export const HONEYMOON_CATEGORIES = [
  "Sightseeing",
  "Food & Drink",
  "Culture & Temples",
  "Nature",
  "Experience",
  "Shopping",
  "Relax",
  "Travel",
  "Lodging",
];

function num(value: unknown): number {
  const n = typeof value === "string" ? parseFloat(value) : (value as number);
  return Number.isFinite(n) ? n : 0;
}

function mapItem(row: Record<string, unknown>): HoneymoonItem {
  return {
    id: row.id as string,
    title: row.title as string,
    city: (row.city as string) ?? "",
    category: (row.category as string) ?? "Sightseeing",
    status: (row.status as HoneymoonStatus) ?? "idea",
    itemDate: (row.item_date as string) ?? null,
    endDate: (row.end_date as string) ?? null,
    timeLabel: (row.time_label as string) ?? "",
    cost: num(row.cost),
    address: (row.address as string) ?? "",
    url: (row.url as string) ?? "",
    notes: (row.notes as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
    createdAt: row.created_at as string,
  };
}

export async function getAllHoneymoonItems(): Promise<HoneymoonItem[]> {
  const { data, error } = await getSupabase()
    .from("honeymoon_items")
    .select("*")
    .order("item_date", { ascending: true, nullsFirst: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }
  return (data ?? []).map((row) => mapItem(row as Record<string, unknown>));
}

export async function createHoneymoonItem(input: {
  title: string;
  city?: string;
  category?: string;
  status?: HoneymoonStatus;
  itemDate?: string | null;
  endDate?: string | null;
  timeLabel?: string;
  cost?: number;
  address?: string;
  url?: string;
  notes?: string;
}): Promise<HoneymoonItem> {
  const { data, error } = await getSupabase()
    .from("honeymoon_items")
    .insert({
      title: input.title,
      city: input.city ?? "",
      category: input.category || "Sightseeing",
      status: input.status ?? "idea",
      item_date: input.itemDate || null,
      end_date: input.endDate || null,
      time_label: input.timeLabel ?? "",
      cost: input.cost ?? 0,
      address: input.address ?? "",
      url: input.url ?? "",
      notes: input.notes ?? "",
    })
    .select()
    .single();
  if (error) throw error;
  return mapItem(data as Record<string, unknown>);
}

export async function updateHoneymoonItem(
  id: string,
  input: {
    title?: string;
    city?: string;
    category?: string;
    status?: HoneymoonStatus;
    itemDate?: string | null;
    endDate?: string | null;
    timeLabel?: string;
    cost?: number;
    address?: string;
    url?: string;
    notes?: string;
  },
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.title !== undefined) patch.title = input.title;
  if (input.city !== undefined) patch.city = input.city;
  if (input.category !== undefined) patch.category = input.category || "Sightseeing";
  if (input.status !== undefined) patch.status = input.status;
  if (input.itemDate !== undefined) patch.item_date = input.itemDate || null;
  if (input.endDate !== undefined) patch.end_date = input.endDate || null;
  if (input.timeLabel !== undefined) patch.time_label = input.timeLabel;
  if (input.cost !== undefined) patch.cost = input.cost;
  if (input.address !== undefined) patch.address = input.address;
  if (input.url !== undefined) patch.url = input.url;
  if (input.notes !== undefined) patch.notes = input.notes;
  const { error } = await getSupabase()
    .from("honeymoon_items")
    .update(patch)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteHoneymoonItem(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("honeymoon_items")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
