import { getCoasters } from "@/lib/coaster-store";
import { CoasterBoard } from "./coaster-board";

export default async function AdminCoastersPage() {
  const coasters = await getCoasters();

  const total = coasters.length;
  const withPhoto = coasters.filter((c) => c.hasPhoto).length;
  const done = coasters.filter((c) => c.isDone).length;
  const needPhoto = total - withPhoto;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-1 font-serif text-4xl text-stone-900">Coasters 🪵</h1>
        <p className="mt-1 text-sm text-stone-600">
          {total} coaster{total === 1 ? "" : "s"} · {withPhoto} with photos ·{" "}
          {done} made · {needPhoto} still need photos
        </p>
      </div>

      <CoasterBoard coasters={coasters} />
    </div>
  );
}
