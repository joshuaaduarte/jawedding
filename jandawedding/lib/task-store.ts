import { getSupabase, isMissingTableError } from "./supabase";

export type TaskStatus = "open" | "in_progress" | "done";
export type TaskAssignee = "" | "joshua" | "ana" | "both";

export type Task = {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  assignee: TaskAssignee;
  dueDate: string | null;
  notes: string;
  sortOrder: number;
  createdAt: string;
};

// Suggested categories surfaced in the UI (free-text still allowed).
export const TASK_CATEGORIES = [
  "Venue",
  "Vendors",
  "Attire",
  "Ceremony",
  "Reception",
  "Guests",
  "Stationery",
  "Honeymoon",
  "Budget",
  "General",
];

function mapTask(row: Record<string, unknown>): Task {
  return {
    id: row.id as string,
    title: row.title as string,
    category: (row.category as string) ?? "General",
    status: (row.status as TaskStatus) ?? "open",
    assignee: (row.assignee as TaskAssignee) ?? "",
    dueDate: (row.due_date as string) ?? null,
    notes: (row.notes as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
    createdAt: row.created_at as string,
  };
}

export async function getAllTasks(): Promise<Task[]> {
  const { data, error } = await getSupabase()
    .from("tasks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }
  return (data ?? []).map((row) => mapTask(row as Record<string, unknown>));
}

export async function createTask(input: {
  title: string;
  category: string;
  status?: TaskStatus;
  assignee?: TaskAssignee;
  dueDate?: string | null;
  notes?: string;
}): Promise<Task> {
  const { data, error } = await getSupabase()
    .from("tasks")
    .insert({
      title: input.title,
      category: input.category || "General",
      status: input.status ?? "open",
      assignee: input.assignee ?? "",
      due_date: input.dueDate || null,
      notes: input.notes ?? "",
    })
    .select()
    .single();
  if (error) throw error;
  return mapTask(data as Record<string, unknown>);
}

export async function updateTask(
  id: string,
  input: {
    title?: string;
    category?: string;
    status?: TaskStatus;
    assignee?: TaskAssignee;
    dueDate?: string | null;
    notes?: string;
  },
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.title !== undefined) patch.title = input.title;
  if (input.category !== undefined) patch.category = input.category || "General";
  if (input.status !== undefined) patch.status = input.status;
  if (input.assignee !== undefined) patch.assignee = input.assignee;
  if (input.dueDate !== undefined) patch.due_date = input.dueDate || null;
  if (input.notes !== undefined) patch.notes = input.notes;
  const { error } = await getSupabase().from("tasks").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await getSupabase().from("tasks").delete().eq("id", id);
  if (error) throw error;
}
