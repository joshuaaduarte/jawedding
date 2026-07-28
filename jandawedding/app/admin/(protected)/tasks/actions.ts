"use server";

import { revalidatePath } from "next/cache";
import {
  createTask,
  updateTask,
  deleteTask,
  type TaskAssignee,
  type TaskStatus,
} from "@/lib/task-store";

export async function addTaskAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;
  await createTask({
    title,
    category: (formData.get("category") as string)?.trim() || "General",
    status: ((formData.get("status") as string) || "open") as TaskStatus,
    assignee: ((formData.get("assignee") as string) || "") as TaskAssignee,
    dueDate: (formData.get("dueDate") as string) || null,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/tasks");
}

export async function updateTaskAction(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;
  await updateTask(id, {
    title,
    category: (formData.get("category") as string)?.trim() || "General",
    status: ((formData.get("status") as string) || "open") as TaskStatus,
    assignee: ((formData.get("assignee") as string) || "") as TaskAssignee,
    dueDate: (formData.get("dueDate") as string) || null,
    notes: (formData.get("notes") as string)?.trim() ?? "",
  });
  revalidatePath("/admin/tasks");
}

export async function setTaskStatusAction(id: string, status: TaskStatus) {
  await updateTask(id, { status });
  revalidatePath("/admin/tasks");
}

export async function deleteTaskAction(id: string) {
  await deleteTask(id);
  revalidatePath("/admin/tasks");
}
