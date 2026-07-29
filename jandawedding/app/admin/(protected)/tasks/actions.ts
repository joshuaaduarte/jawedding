"use server";

import { revalidatePath } from "next/cache";
import {
  createTask,
  updateTask,
  deleteTask,
  createMilestone,
  updateMilestone,
  deleteMilestone,
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
  revalidatePath("/admin/calendar");
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
  revalidatePath("/admin/calendar");
}

export async function setTaskStatusAction(id: string, status: TaskStatus) {
  await updateTask(id, { status });
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}

export async function deleteTaskAction(id: string) {
  await deleteTask(id);
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}

export async function addMilestoneAction(taskId: string, formData: FormData) {
  const label = (formData.get("label") as string)?.trim();
  if (!label) return;
  await createMilestone({
    taskId,
    label,
    dueDate: (formData.get("dueDate") as string) || null,
  });
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}

export async function updateMilestoneAction(id: string, formData: FormData) {
  const label = (formData.get("label") as string)?.trim();
  if (!label) return;
  await updateMilestone(id, {
    label,
    dueDate: (formData.get("dueDate") as string) || null,
  });
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}

export async function setMilestoneDoneAction(id: string, done: boolean) {
  await updateMilestone(id, { done });
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}

export async function deleteMilestoneAction(id: string) {
  await deleteMilestone(id);
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/calendar");
}
