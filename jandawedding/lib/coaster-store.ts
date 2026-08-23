import { getSupabase, isMissingTableError } from "./supabase";
import { getAllGuests } from "./guest-data";
import { getAllRsvps } from "./rsvp-store";
import { getSeatAssignments, getSeatingTables } from "./seating-store";

export type Coaster = {
  id: string;
  guestId: string | null;
  personIndex: number;
  name: string;
  hasPhoto: boolean;
  isDone: boolean;
  notes: string;
  createdAt: string;
  // Derived from the guest the coaster belongs to, so the UI can group people by
  // household and the export tells Ana which family a photo is for. Manually
  // added coasters have no guest, so partyLabel is "".
  partyLabel: string;
  // The seating-chart table this person is assigned to, matched from the seating
  // tool by the shared guest_id + person_index/seat_index key. null when the
  // person isn't seated yet (or is a manual coaster with no guest).
  tableName: string | null;
};

function mapCoaster(
  row: Record<string, unknown>,
  extra?: { partyLabel?: string; tableName?: string | null },
): Coaster {
  return {
    id: row.id as string,
    guestId: (row.guest_id as string) ?? null,
    personIndex: (row.person_index as number) ?? 0,
    name: row.name as string,
    hasPhoto: (row.has_photo as boolean) ?? false,
    isDone: (row.is_done as boolean) ?? false,
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at as string,
    partyLabel: extra?.partyLabel ?? "",
    tableName: extra?.tableName ?? null,
  };
}

export async function getCoasters(): Promise<Coaster[]> {
  const { data, error } = await getSupabase()
    .from("coasters")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }

  // Attach a friendly party label from each coaster's guest so the UI can group
  // whole households together and the export names the family for context, plus
  // the seating-chart table each person is assigned to (matched by the shared
  // guest_id + person_index/seat_index key used by both tools).
  const [guests, seats, tables] = await Promise.all([
    getAllGuests(),
    getSeatAssignments(),
    getSeatingTables(),
  ]);

  const labelByGuestId = new Map(
    guests.map((g) => [
      g.id,
      g.familyName || g.displayName || `${g.firstName} ${g.lastName}`.trim(),
    ]),
  );

  const tableNameById = new Map(tables.map((t) => [t.id, t.name]));
  const tableNameBySeatKey = new Map<string, string>();
  for (const seat of seats) {
    if (!seat.guestId || !seat.tableId) continue;
    const name = tableNameById.get(seat.tableId);
    if (name) tableNameBySeatKey.set(`${seat.guestId}:${seat.seatIndex}`, name);
  }

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const guestId = (r.guest_id as string) ?? null;
    const personIndex = (r.person_index as number) ?? 0;
    return mapCoaster(r, {
      partyLabel: guestId ? labelByGuestId.get(guestId) : undefined,
      tableName: guestId
        ? tableNameBySeatKey.get(`${guestId}:${personIndex}`) ?? null
        : null,
    });
  });
}

// Generate a coaster row for every person in a confirmed (attendance = "yes")
// party — the primary guest plus each named party member — mirroring the
// seat_assignments expansion so the same person keeps the same coaster row.
// Only inserts people who don't already have a row, so existing photo/done
// checkmarks are never disturbed. Returns the number of coasters added.
export async function syncCoastersFromConfirmed(): Promise<number> {
  const [guests, rsvps, existing] = await Promise.all([
    getAllGuests(),
    getAllRsvps(),
    getCoasters(),
  ]);

  const guestsById = new Map(guests.map((g) => [g.id, g]));
  const existingKeys = new Set(
    existing
      .filter((c) => c.guestId)
      .map((c) => `${c.guestId}:${c.personIndex}`),
  );

  const rows: Record<string, unknown>[] = [];
  for (const rsvp of rsvps) {
    if (rsvp.attendance !== "yes") continue;
    const guest = guestsById.get(rsvp.guestId);
    const partyMembers = guest?.partyMembers ?? [];
    const count = Math.max(1, rsvp.guestCount);

    for (let i = 0; i < count; i++) {
      const key = `${rsvp.guestId}:${i}`;
      if (existingKeys.has(key)) continue;

      let name: string;
      if (i === 0) {
        name = rsvp.fullName;
      } else if (partyMembers[i - 1]) {
        name = partyMembers[i - 1];
      } else {
        name = `${rsvp.fullName} +${i}`;
      }

      rows.push({
        guest_id: rsvp.guestId,
        person_index: i,
        name,
        has_photo: false,
        is_done: false,
        notes: "",
      });
    }
  }

  if (rows.length === 0) return 0;
  const { error } = await getSupabase().from("coasters").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function updateCoaster(
  id: string,
  fields: Partial<{ hasPhoto: boolean; isDone: boolean; notes: string; name: string }>,
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (fields.hasPhoto !== undefined) patch.has_photo = fields.hasPhoto;
  if (fields.isDone !== undefined) patch.is_done = fields.isDone;
  if (fields.notes !== undefined) patch.notes = fields.notes;
  if (fields.name !== undefined) patch.name = fields.name;
  if (Object.keys(patch).length === 0) return;

  const { error } = await getSupabase().from("coasters").update(patch).eq("id", id);
  if (error) throw error;
}

// Manually add a coaster that isn't tied to an RSVP (e.g. a vendor, a late
// add, or an extra keepsake). guest_id stays NULL so party syncs never touch it.
export async function createCoaster(input: {
  name: string;
  notes?: string;
}): Promise<void> {
  const { error } = await getSupabase().from("coasters").insert({
    name: input.name,
    notes: input.notes ?? "",
    person_index: 0,
    has_photo: false,
    is_done: false,
  });
  if (error) throw error;
}

export async function deleteCoaster(id: string): Promise<void> {
  const { error } = await getSupabase().from("coasters").delete().eq("id", id);
  if (error) throw error;
}
