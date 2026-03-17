import { supabase } from "@/lib/supabase";

export type GuestGroup = "all" | "family" | "bridal-party" | "parents";

export type Guest = {
  id: string;
  inviteCode: string;
  firstName: string;
  lastName: string;
  email: string;
  group: GuestGroup;
  anecdote: string;
};

export type WeddingEvent = {
  id: string;
  dayLabel: string;
  eventDate: string;
  title: string;
  time: string;
  location: string;
  groups: string[];
  sortOrder: number;
};

// ---------- helpers ----------

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function mapGuest(row: Record<string, unknown>): Guest {
  return {
    id: row.id as string,
    inviteCode: row.invite_code as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: (row.email as string) ?? "",
    group: (row.group as GuestGroup) ?? "all",
    anecdote: (row.anecdote as string) ?? "",
  };
}

function mapEvent(row: Record<string, unknown>): WeddingEvent {
  return {
    id: row.id as string,
    dayLabel: row.day_label as string,
    eventDate: row.event_date as string,
    title: row.title as string,
    time: row.time as string,
    location: row.location as string,
    groups: (row.groups as string[]) ?? ["all"],
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

// ---------- guest queries ----------

export async function findGuestByInvite(
  inviteCode: string,
  lastName: string,
): Promise<Guest | null> {
  const normalized = normalizeCode(inviteCode);
  const { data } = await supabase
    .from("guests")
    .select("*")
    .ilike("last_name", lastName.trim());

  if (!data) return null;
  const match = data.find(
    (g) => normalizeCode(g.invite_code as string) === normalized,
  );
  return match ? mapGuest(match) : null;
}

export async function findGuestByCode(inviteCode: string): Promise<Guest | null> {
  const normalized = normalizeCode(inviteCode);
  const { data } = await supabase.from("guests").select("*");
  if (!data) return null;
  const match = data.find(
    (g) => normalizeCode(g.invite_code as string) === normalized,
  );
  return match ? mapGuest(match) : null;
}

export async function getAllGuests(): Promise<(Guest & { rsvp: { attendance: string; guestCount: number; submittedAt: string } | null })[]> {
  const { data } = await supabase
    .from("guests")
    .select("*, rsvps(attendance, guest_count, submitted_at)")
    .order("last_name", { ascending: true });

  return (data ?? []).map((row) => {
    const rsvpRow = Array.isArray(row.rsvps) ? row.rsvps[0] : row.rsvps;
    return {
      ...mapGuest(row),
      rsvp: rsvpRow
        ? {
            attendance: rsvpRow.attendance as string,
            guestCount: rsvpRow.guest_count as number,
            submittedAt: rsvpRow.submitted_at as string,
          }
        : null,
    };
  });
}

export async function getGuestById(id: string): Promise<Guest | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();
  return data ? mapGuest(data) : null;
}

export async function createGuest(input: {
  firstName: string;
  lastName: string;
  email: string;
  group: GuestGroup;
  anecdote: string;
  inviteCode: string;
}): Promise<Guest> {
  const { data, error } = await supabase
    .from("guests")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      group: input.group,
      anecdote: input.anecdote,
      invite_code: input.inviteCode,
    })
    .select()
    .single();
  if (error) throw error;
  return mapGuest(data);
}

export async function updateGuest(
  id: string,
  input: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    group: GuestGroup;
    anecdote: string;
    inviteCode: string;
  }>,
): Promise<Guest> {
  const patch: Record<string, unknown> = {};
  if (input.firstName !== undefined) patch.first_name = input.firstName;
  if (input.lastName !== undefined) patch.last_name = input.lastName;
  if (input.email !== undefined) patch.email = input.email;
  if (input.group !== undefined) patch.group = input.group;
  if (input.anecdote !== undefined) patch.anecdote = input.anecdote;
  if (input.inviteCode !== undefined) patch.invite_code = input.inviteCode;

  const { data, error } = await supabase
    .from("guests")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapGuest(data);
}

export async function deleteGuest(id: string): Promise<void> {
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) throw error;
}

export async function getNextInviteCode(): Promise<string> {
  const { data } = await supabase
    .from("guests")
    .select("invite_code")
    .ilike("invite_code", "AJD-%");

  let max = 0;
  for (const row of data ?? []) {
    const m = (row.invite_code as string).match(/AJD-(\d+)/i);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `AJD-${String(max + 1).padStart(4, "0")}`;
}

// ---------- event queries ----------

export async function getAllEvents(): Promise<WeddingEvent[]> {
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map(mapEvent);
}

export async function eventsForGuestGroup(group: GuestGroup): Promise<WeddingEvent[]> {
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? [])
    .map(mapEvent)
    .filter((e) => e.groups.includes("all") || e.groups.includes(group));
}

export async function getEventById(id: string): Promise<WeddingEvent | null> {
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  return data ? mapEvent(data) : null;
}

export async function createEvent(input: {
  dayLabel: string;
  eventDate: string;
  title: string;
  time: string;
  location: string;
  groups: string[];
  sortOrder: number;
}): Promise<WeddingEvent> {
  const { data, error } = await supabase
    .from("events")
    .insert({
      day_label: input.dayLabel,
      event_date: input.eventDate,
      title: input.title,
      time: input.time,
      location: input.location,
      groups: input.groups,
      sort_order: input.sortOrder,
    })
    .select()
    .single();
  if (error) throw error;
  return mapEvent(data);
}

export async function updateEvent(
  id: string,
  input: Partial<{
    dayLabel: string;
    eventDate: string;
    title: string;
    time: string;
    location: string;
    groups: string[];
    sortOrder: number;
  }>,
): Promise<WeddingEvent> {
  const patch: Record<string, unknown> = {};
  if (input.dayLabel !== undefined) patch.day_label = input.dayLabel;
  if (input.eventDate !== undefined) patch.event_date = input.eventDate;
  if (input.title !== undefined) patch.title = input.title;
  if (input.time !== undefined) patch.time = input.time;
  if (input.location !== undefined) patch.location = input.location;
  if (input.groups !== undefined) patch.groups = input.groups;
  if (input.sortOrder !== undefined) patch.sort_order = input.sortOrder;

  const { data, error } = await supabase
    .from("events")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapEvent(data);
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}
