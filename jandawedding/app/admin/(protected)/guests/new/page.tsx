import { getAllGroups } from "@/lib/guest-data";
import { BatchAddForm } from "../batch-add-form";

export default async function NewGuestPage() {
  const groups = await getAllGroups();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin / Guests</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Add Guests</h1>
      </div>

      <BatchAddForm groups={groups.map((g) => ({ name: g.name, label: g.label }))} />
    </div>
  );
}
