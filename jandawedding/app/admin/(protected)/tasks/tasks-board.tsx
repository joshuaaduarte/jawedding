"use client";

import { useMemo, useState } from "react";
import {
  addTaskAction,
  updateTaskAction,
  setTaskStatusAction,
  deleteTaskAction,
} from "./actions";
import {
  TASK_CATEGORIES,
  type Task,
  type TaskStatus,
} from "@/lib/task-store";

const ASSIGNEE_LABEL: Record<string, string> = {
  "": "Unassigned",
  joshua: "Joshua",
  ana: "Ana",
  both: "Both",
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_STYLE: Record<TaskStatus, string> = {
  open: "bg-stone-100 text-stone-600",
  in_progress: "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
};

const inputClass =
  "w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-stone-700/30 transition focus:ring-2";
const labelClass =
  "block text-xs uppercase tracking-[0.16em] text-stone-600";

function isOverdue(task: Task): boolean {
  if (task.status === "done" || !task.dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate) < today;
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TaskFields({ task }: { task?: Task }) {
  const categories = useMemo(() => {
    const set = new Set(TASK_CATEGORIES);
    if (task?.category) set.add(task.category);
    return [...set];
  }, [task]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass}>Task *</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={task?.title}
          placeholder="e.g. Book the florist"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass}>Category</label>
        <input
          name="category"
          type="text"
          list="task-categories"
          defaultValue={task?.category ?? "General"}
          className={`mt-1.5 ${inputClass}`}
        />
        <datalist id="task-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label className={labelClass}>Owner</label>
        <select
          name="assignee"
          defaultValue={task?.assignee ?? ""}
          className={`mt-1.5 ${inputClass}`}
        >
          <option value="">Unassigned</option>
          <option value="joshua">Joshua</option>
          <option value="ana">Ana</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Status</label>
        <select
          name="status"
          defaultValue={task?.status ?? "open"}
          className={`mt-1.5 ${inputClass}`}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Due Date</label>
        <input
          name="dueDate"
          type="date"
          defaultValue={task?.dueDate ?? ""}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea
          name="notes"
          rows={2}
          defaultValue={task?.notes}
          className={`mt-1.5 ${inputClass}`}
        />
      </div>
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);
  const nextStatus: TaskStatus = task.status === "done" ? "open" : "done";

  if (editing) {
    return (
      <li className="rounded-xl border border-stone-300 bg-stone-50 p-4">
        <form
          action={async (formData) => {
            await updateTaskAction(task.id, formData);
            setEditing(false);
          }}
          className="space-y-4"
        >
          <TaskFields task={task} />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="h-9 rounded-full bg-stone-800 px-5 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-stone-600 underline hover:text-stone-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
      <form action={setTaskStatusAction.bind(null, task.id, nextStatus)} className="pt-0.5">
        <button
          type="submit"
          aria-label={task.status === "done" ? "Mark as open" : "Mark as done"}
          className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
            task.status === "done"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-stone-300 hover:border-stone-500"
          }`}
        >
          {task.status === "done" ? "✓" : ""}
        </button>
      </form>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            task.status === "done" ? "text-stone-400 line-through" : "text-stone-800"
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 ${STATUS_STYLE[task.status]}`}>
            {STATUS_LABEL[task.status]}
          </span>
          {task.assignee ? (
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">
              {ASSIGNEE_LABEL[task.assignee]}
            </span>
          ) : null}
          {task.dueDate ? (
            <span
              className={`rounded-full px-2 py-0.5 ${
                isOverdue(task)
                  ? "bg-rose-100 text-rose-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {isOverdue(task) ? "Overdue · " : "Due "}
              {formatDate(task.dueDate)}
            </span>
          ) : null}
        </div>
        {task.notes ? (
          <p className="mt-1.5 whitespace-pre-wrap text-xs text-stone-500">{task.notes}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-3 text-xs">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-stone-600 underline hover:text-stone-900"
        >
          Edit
        </button>
        <form
          action={deleteTaskAction.bind(null, task.id)}
          onSubmit={(e) => {
            if (!confirm("Delete this task?")) e.preventDefault();
          }}
        >
          <button type="submit" className="text-rose-600 underline hover:text-rose-800">
            Delete
          </button>
        </form>
      </div>
    </li>
  );
}

export function TasksBoard({ tasks }: { tasks: Task[] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | TaskStatus>(
    "active",
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const allCategories = useMemo(
    () => [...new Set(tasks.map((t) => t.category))].sort(),
    [tasks],
  );

  const filtered = tasks.filter((t) => {
    if (statusFilter === "active" && t.status === "done") return false;
    if (
      statusFilter !== "all" &&
      statusFilter !== "active" &&
      t.status !== statusFilter
    )
      return false;
    if (assigneeFilter !== "all" && t.assignee !== assigneeFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  });

  const byCategory = useMemo(() => {
    const groups = new Map<string, Task[]>();
    for (const t of filtered) {
      const list = groups.get(t.category) ?? [];
      list.push(t);
      groups.set(t.category, list);
    }
    // Sort tasks within a group: not-done first, then by due date, then title.
    for (const list of groups.values()) {
      list.sort((a, b) => {
        if ((a.status === "done") !== (b.status === "done"))
          return a.status === "done" ? 1 : -1;
        if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return a.title.localeCompare(b.title);
      });
    }
    return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const selectClass =
    "rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-700 outline-none";

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex h-10 items-center rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
        >
          {showAdd ? "Close" : "+ Add Task"}
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className={selectClass}
          >
            <option value="active">Active</option>
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">Anyone</option>
            <option value="joshua">Joshua</option>
            <option value="ana">Ana</option>
            <option value="both">Both</option>
            <option value="">Unassigned</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add form */}
      {showAdd ? (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <form
            action={async (formData) => {
              await addTaskAction(formData);
              setShowAdd(false);
            }}
            className="space-y-4"
          >
            <TaskFields />
            <button
              type="submit"
              className="h-10 rounded-full bg-stone-800 px-6 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
            >
              Add Task
            </button>
          </form>
        </section>
      ) : null}

      {/* Grouped list */}
      {byCategory.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
          No tasks match these filters.
        </div>
      ) : (
        byCategory.map(([category, list]) => (
          <section key={category} className="space-y-3">
            <h2 className="flex items-center gap-3 font-serif text-2xl text-stone-900">
              {category}
              <span className="text-sm font-sans text-stone-400">{list.length}</span>
            </h2>
            <ul className="space-y-2">
              {list.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
