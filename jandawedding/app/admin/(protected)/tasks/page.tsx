import { getAllTasks, getAllMilestones, type Milestone } from "@/lib/task-store";
import { TasksBoard } from "./tasks-board";

export default async function AdminTasksPage() {
  const [tasks, milestones] = await Promise.all([
    getAllTasks(),
    getAllMilestones(),
  ]);

  const milestonesByTask = new Map<string, Milestone[]>();
  for (const m of milestones) {
    const list = milestonesByTask.get(m.taskId) ?? [];
    list.push(m);
    milestonesByTask.set(m.taskId, list);
  }

  const open = tasks.filter((t) => t.status !== "done").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = tasks.filter(
    (t) => t.status !== "done" && t.dueDate && new Date(t.dueDate) < today,
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">To-Do</h1>
        <p className="mt-1 text-sm text-stone-600">
          {open} open · {done} done
          {overdue > 0 ? (
            <span className="text-rose-600"> · {overdue} overdue</span>
          ) : null}
        </p>
      </div>

      <TasksBoard tasks={tasks} milestonesByTask={Object.fromEntries(milestonesByTask)} />
    </div>
  );
}
