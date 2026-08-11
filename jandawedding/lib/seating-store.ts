import { getSupabase, isMissingTableError } from "./supabase";
import { getAllGuests } from "./guest-data";
import { getAllRsvps } from "./rsvp-store";

export type TableShape = "round" | "rect";

export type SeatingTable = {
  id: string;
  name: string;
  capacity: number;
  notes: string;
  sortOrder: number;
  // Floor-map placement: fractions 0..1 of the room, or null when the table
  // hasn't been dropped onto the map yet. width/height are fraction-of-width and
  // shared per shape; rotation is per-table (degrees). shape drives how it's drawn.
  posX: number | null;
  posY: number | null;
  width: number | null;
  height: number | null;
  rotation: number;
  shape: TableShape;
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
  // Occasional escape hatch: a detached seat is broken out of its invite-code
  // party so it can be seated at a different table on its own. The standard is
  // to keep a household together — this covers the rare exception.
  detached: boolean;
};

function mapTable(row: Record<string, unknown>): SeatingTable {
  return {
    id: row.id as string,
    name: row.name as string,
    capacity: (row.capacity as number) ?? 0,
    notes: (row.notes as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
    posX: (row.pos_x as number | null) ?? null,
    posY: (row.pos_y as number | null) ?? null,
    width: (row.width as number | null) ?? null,
    height: (row.height as number | null) ?? null,
    rotation: (row.rotation as number) ?? 0,
    shape: (row.shape as TableShape) === "rect" ? "rect" : "round",
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
    detached: (row.detached as boolean) ?? false,
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

// Persists a table's spot on the floor map. Coordinates are fractions 0..1 of
// the room; the client clamps them before calling. Passing null for both lifts
// the table back off the map (returns it to the "unplaced" tray).
export async function updateTablePosition(
  id: string,
  posX: number | null,
  posY: number | null,
): Promise<void> {
  const clamp = (n: number | null) =>
    n === null ? null : Math.min(1, Math.max(0, n));
  const { error } = await getSupabase()
    .from("seating_tables")
    .update({ pos_x: clamp(posX), pos_y: clamp(posY) })
    .eq("id", id);
  if (error) throw error;
}

// Persists a table's spot and angle on drop (position fractions 0..1, rotation
// in degrees). Used by the floor map, which drags and rotates per-table.
export async function updateTableTransform(
  id: string,
  posX: number,
  posY: number,
  rotation: number,
): Promise<void> {
  const { error } = await getSupabase()
    .from("seating_tables")
    .update({
      pos_x: Math.min(1, Math.max(0, posX)),
      pos_y: Math.min(1, Math.max(0, posY)),
      rotation,
    })
    .eq("id", id);
  if (error) throw error;
}

// Resizes every table of a shape together so all round guest tables stay the
// same size (and the rect sweetheart resizes on its own). Sizes are
// fraction-of-width; round tables keep width = height.
export async function updateTableSizeByShape(
  shape: TableShape,
  width: number,
  height: number,
): Promise<void> {
  const { error } = await getSupabase()
    .from("seating_tables")
    .update({
      width: Math.max(0.02, width),
      height: Math.max(0.02, height),
    })
    .eq("shape", shape === "rect" ? "rect" : "round");
  if (error) throw error;
}

// Switches a table between a round guest table and a rectangular one (the
// sweetheart table). Purely how it's drawn on the map — capacity is unchanged.
export async function updateTableShape(
  id: string,
  shape: TableShape,
): Promise<void> {
  const { error } = await getSupabase()
    .from("seating_tables")
    .update({ shape: shape === "rect" ? "rect" : "round" })
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

// Breaks one seat out of its invite-code party so it can be seated on its own.
// The seat keeps its current table; the rest of the household is unaffected.
export async function splitSeat(seatId: string): Promise<void> {
  const { error } = await getSupabase()
    .from("seat_assignments")
    .update({ detached: true })
    .eq("id", seatId);
  if (error) throw error;
}

// Re-merges a detached seat into its party and snaps it back to the table the
// rest of the household is sitting at (falling back to unassigned if the group
// isn't seated). Manual seats with no invite code simply clear the flag.
export async function rejoinSeat(seatId: string): Promise<void> {
  const seats = await getSeatAssignments();
  const seat = seats.find((s) => s.id === seatId);
  if (!seat) return;

  let groupTableId: string | null = null;
  if (seat.inviteCode) {
    const sibling = seats.find(
      (s) => s.id !== seatId && !s.detached && s.inviteCode === seat.inviteCode,
    );
    groupTableId = sibling?.tableId ?? null;
  }

  const { error } = await getSupabase()
    .from("seat_assignments")
    .update({ detached: false, table_id: groupTableId })
    .eq("id", seatId);
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
