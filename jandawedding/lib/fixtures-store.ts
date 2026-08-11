import { getSupabase, isMissingTableError } from "./supabase";

// Floor-map fixtures are the non-seating furniture on the reception map — the
// bar, bev station, DJ/band, dance floor, dessert & cake, appetizer stations,
// and doorways. Like seating tables they carry fraction-of-width geometry, but
// they hold no guests. Size is shared per `kind` (both apps stations resize
// together); position and rotation are per-fixture.

export type FloorFixture = {
  id: string;
  kind: string;
  label: string;
  posX: number;
  posY: number;
  width: number;
  height: number;
  rotation: number;
  sortOrder: number;
  createdAt: string;
};

function mapFixture(row: Record<string, unknown>): FloorFixture {
  return {
    id: row.id as string,
    kind: row.kind as string,
    label: (row.label as string) ?? "",
    posX: (row.pos_x as number) ?? 0.5,
    posY: (row.pos_y as number) ?? 0.5,
    width: (row.width as number) ?? 0.12,
    height: (row.height as number) ?? 0.08,
    rotation: (row.rotation as number) ?? 0,
    sortOrder: (row.sort_order as number) ?? 0,
    createdAt: row.created_at as string,
  };
}

// The starting furniture layout, traced from the coordinator's venue map.
// Geometry is fraction-of-width; the room is drawn 10:7 so these also map
// cleanly to vertical position. Everything is draggable once seeded.
export const DEFAULT_FIXTURES: Omit<FloorFixture, "id" | "createdAt">[] = [
  { kind: "apps", label: "Apps", posX: 0.31, posY: 0.066, width: 0.12, height: 0.063, rotation: 0, sortOrder: 0 },
  { kind: "apps", label: "Apps", posX: 0.46, posY: 0.066, width: 0.12, height: 0.063, rotation: 0, sortOrder: 1 },
  { kind: "dessert", label: "Dessert & Cake (C)", posX: 0.892, posY: 0.103, width: 0.168, height: 0.137, rotation: 0, sortOrder: 2 },
  { kind: "bar", label: "Bar", posX: 0.12, posY: 0.493, width: 0.16, height: 0.271, rotation: 0, sortOrder: 3 },
  { kind: "bev", label: "Bev Station", posX: 0.12, posY: 0.723, width: 0.16, height: 0.131, rotation: 0, sortOrder: 4 },
  { kind: "dj", label: "DJ / Band", posX: 0.336, posY: 0.507, width: 0.072, height: 0.3, rotation: 0, sortOrder: 5 },
  { kind: "dance_floor", label: "Dance Floor", posX: 0.545, posY: 0.55, width: 0.27, height: 0.386, rotation: 0, sortOrder: 6 },
  { kind: "entrance", label: "Entrance", posX: 0.515, posY: 0.964, width: 0.13, height: 0.031, rotation: 0, sortOrder: 7 },
];

export async function getFloorFixtures(): Promise<FloorFixture[]> {
  const { data, error } = await getSupabase()
    .from("floor_fixtures")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }
  return (data ?? []).map((row) => mapFixture(row as Record<string, unknown>));
}

// Inserts the default furniture the first time the map is set up. Idempotent:
// does nothing once any fixtures exist, so it's safe to call from a button.
export async function seedDefaultFixtures(): Promise<number> {
  const existing = await getFloorFixtures();
  if (existing.length > 0) return 0;
  const rows = DEFAULT_FIXTURES.map((f) => ({
    kind: f.kind,
    label: f.label,
    pos_x: f.posX,
    pos_y: f.posY,
    width: f.width,
    height: f.height,
    rotation: f.rotation,
    sort_order: f.sortOrder,
  }));
  const { error } = await getSupabase().from("floor_fixtures").insert(rows);
  if (error) throw error;
  return rows.length;
}

// Persists a fixture's spot and angle on drop. Coordinates are fractions 0..1.
export async function updateFixtureTransform(
  id: string,
  posX: number,
  posY: number,
  rotation: number,
): Promise<void> {
  const { error } = await getSupabase()
    .from("floor_fixtures")
    .update({
      pos_x: Math.min(1, Math.max(0, posX)),
      pos_y: Math.min(1, Math.max(0, posY)),
      rotation,
    })
    .eq("id", id);
  if (error) throw error;
}

// Resizes every fixture of a kind together so grouped furniture (e.g. both apps
// stations) stays uniform.
export async function updateFixtureSizeByKind(
  kind: string,
  width: number,
  height: number,
): Promise<void> {
  const { error } = await getSupabase()
    .from("floor_fixtures")
    .update({
      width: Math.max(0.02, width),
      height: Math.max(0.02, height),
    })
    .eq("kind", kind);
  if (error) throw error;
}

export async function createFixture(input: {
  kind: string;
  label: string;
}): Promise<FloorFixture> {
  const existing = await getFloorFixtures();
  const nextOrder =
    existing.length > 0 ? Math.max(...existing.map((f) => f.sortOrder)) + 1 : 0;
  const { data, error } = await getSupabase()
    .from("floor_fixtures")
    .insert({ kind: input.kind, label: input.label, sort_order: nextOrder })
    .select()
    .single();
  if (error) throw error;
  return mapFixture(data as Record<string, unknown>);
}

export async function deleteFixture(id: string): Promise<void> {
  const { error } = await getSupabase().from("floor_fixtures").delete().eq("id", id);
  if (error) throw error;
}
