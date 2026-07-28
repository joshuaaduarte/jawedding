import { getSupabase, isMissingTableError } from "./supabase";
import { getAllGuests } from "./guest-data";
import { getAllRsvps } from "./rsvp-store";

export type SeatingTable = {
  id: string;
  name: string;
  capacity: number;
  notes: string;
  sortOrder: number;
  createdAt: string;
};

export type SeatAssignment = {
  id: string;
  guestId: string | null;
  seatIndex: number;
  name: string;
  tableId: string | null;
  notes: string;
  createdAt: string;
  // Derived from the guest the seat belongs to. Seats sharing a non-empty
  // inviteCode form one party that must be seated together. Manually-added
  // seats have no guest, so inviteCode is "" and each stands on its own.
  inviteCode: string;
  partyLabel: string;
};

function mapTable(row: Record<string, unknown>): SeatingTable {
  return {
    id: row.id as string,
    name: row.name as string,
    capacity: (row.capacity as number) ?? 0,
    notes: (row.notes as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
    createdAt: row.created_at as string,
  };
}

function mapSeat(
  row: Record<string, unknown>,
  party?: { inviteCode: string; label: string },
): SeatAssignment {
  return {
    id: row.id as string,
    guestId: (row.guest_id as string) ?? null,
    seatIndex: (row.seat_index as number) ?? 0,
    name: row.name as string,
    tableId: (row.table_id as string) ?? null,
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at as string,
    inviteCode: party?.inviteCode ?? "",
    partyLabel: party?.label ?? "",
  };
}

export async function getSeatingTables(): Promise<SeatingTable[]> {
  const { data, error } = await getSupabase()
    .from("seating_tables")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }
  return (data ?? []).map((row) => mapTable(row as Record<string, unknown>));
}

export async function getSeatAssignments(): Promise<SeatAssignment[]> {
  const { data, error } = await getSupabase()
    .from("seat_assignments")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }

  // Attach each seat's invite code + a friendly party label from its guest so
  // the UI can group and move whole households together.
  const guests = await getAllGuests();
  const partyByGuestId = new Map(
    guests.map((g) => [
      g.id,
      {
        inviteCode: g.inviteCode,
        label:
          g.familyName ||
          g.displayName ||
          `${g.firstName} ${g.lastName}`.trim(),
      },
    ]),
  );

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const guestId = (r.guest_id as string) ?? null;
    return mapSeat(r, guestId ? partyByGuestId.get(guestId) : undefined);
  });
}

export async function createSeatingTable(input: {
  name: string;
  capacity: number;
  notes?: string;
}): Promise<SeatingTable> {
  const existing = await getSeatingTables();
  const nextOrder =
    existing.length > 0 ? Math.max(...existing.map((t) => t.sortOrder)) + 1 : 0;
  const { data, error } = await getSupabase()
    .from("seating_tables")
    .insert({
      name: input.name,
      capacity: input.capacity,
      notes: input.notes ?? "",
      sort_order: nextOrder,
    })
    .select()
    .single();
  if (error) throw error;
  return mapTable(data as Record<string, unknown>);
}

export async function updateSeatingTable(
  id: string,
  input: { name?: string; capacity?: number; notes?: string },
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.capacity !== undefined) patch.capacity = input.capacity;
  if (input.notes !== undefined) patch.notes = input.notes;
  const { error } = await getSupabase()
    .from("seating_tables")
    .update(patch)
    .eq("id", id);
  if (error) throw error;
}

// Deleting a table sends its seats back to the unassigned pool (ON DELETE SET NULL).
export async function deleteSeatingTable(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("seating_tables")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// Moves one or more seats to a table (or to the unassigned pool when tableId is
// null) in a single update. Callers pass every seat in a party so a household is
// never split across tables.
export async function assignSeats(
  seatIds: string[],
  tableId: string | null,
): Promise<void> {
  if (seatIds.length === 0) return;
  const { error } = await getSupabase()
    .from("seat_assignments")
    .update({ table_id: tableId })
    .in("id", seatIds);
  if (error) throw error;
}

export async function createSeat(input: {
  name: string;
  tableId?: string | null;
  notes?: string;
}): Promise<SeatAssignment> {
  const { data, error } = await getSupabase()
    .from("seat_assignments")
    .insert({
      name: input.name,
      table_id: input.tableId || null,
      notes: input.notes ?? "",
      guest_id: null,
      seat_index: 0,
    })
    .select()
    .single();
  if (error) throw error;
  return mapSeat(data as Record<string, unknown>);
}

export async function updateSeat(
  id: string,
  input: { name?: string; notes?: string },
): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.notes !== undefined) patch.notes = input.notes;
  const { error } = await getSupabase()
    .from("seat_assignments")
    .update(patch)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSeat(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("seat_assignments")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

/**
 * Pulls confirmed attendees into the seat pool. For each guest who RSVP'd "yes",
 * creates one seat per attending head (their name first, then any named party
 * members, then generic "+N" fillers). Existing seats are never duplicated, and
 * assigned seats are never touched. Returns how many new seats were created.
 */
export async function syncSeatsFromConfirmed(): Promise<number> {
  const [guests, rsvps, existingSeats] = await Promise.all([
    getAllGuests(),
    getAllRsvps(),
    getSeatAssignments(),
  ]);

  const guestsById = new Map(guests.map((g) => [g.id, g]));
  const existingKeys = new Set(
    existingSeats
      .filter((s) => s.guestId)
      .map((s) => `${s.guestId}:${s.seatIndex}`),
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
        seat_index: i,
        name,
        table_id: null,
        notes: "",
      });
    }
  }

  if (rows.length === 0) return 0;
  const { error } = await getSupabase().from("seat_assignments").insert(rows);
  if (error) throw error;
  return rows.length;
}
