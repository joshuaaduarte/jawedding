import { getSupabase } from "@/lib/supabase";

export type GuestGroup = string;

export type Group = {
  id: string;
  name: string;
  label: string;
  sortOrder: number;
};

export type Guest = {
  id: string;
  inviteCode: string;
  firstName: string;
  lastName: string;
  email: string;
  group: GuestGroup;
  anecdote: string;
  anecdoteEs: string;
  displayName: string;
  familyName: string;
  partyMembers: string[];
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
  startDatetime: string | null;
};

// ---------- helpers ----------

function mapGroup(row: Record<string, unknown>): Group {
  return {
    id: row.id as string,
    name: row.name as string,
    label: row.label as string,
    sortOrder: row.sort_order as number,
  };
}

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
    anecdoteEs: (row.anecdote_es as string) ?? "",
    displayName: (row.display_name as string) ?? "",
    familyName: (row.family_name as string) ?? "",
    partyMembers: (row.party_members as string[]) ?? [],
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
    startDatetime: (row.start_datetime as string) ?? null,
  };
}

// ---------- guest queries ----------

export async function findGuestByInvite(
  inviteCode: string,
  lastName: string,
): Promise<Guest | null> {
  const normalized = normalizeCode(inviteCode);
  const { data } = await getSupabase()
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
  const { data } = await getSupabase().from("guests").select("*");
  if (!data) return null;
  const match = data.find(
    (g) => normalizeCode(g.invite_code as string) === normalized,
  );
  return match ? mapGuest(match) : null;
}

export async function getAllGuests(): Promise<(Guest & { rsvp: { attendance: string; guestCount: number; submittedAt: string } | null })[]> {
  const { data } = await getSupabase()
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
  const { data } = await getSupabase()
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
  anecdoteEs?: string;
  inviteCode: string;
  displayName?: string;
  familyName?: string;
  partyMembers?: string[];
}): Promise<Guest> {
  const { data, error } = await getSupabase()
    .from("guests")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      group: input.group,
      anecdote: input.anecdote,
      anecdote_es: input.anecdoteEs ?? "",
      invite_code: input.inviteCode,
      display_name: input.displayName ?? "",
      family_name: input.familyName ?? "",
      party_members: input.partyMembers ?? [],
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
    anecdoteEs: string;
    inviteCode: string;
    displayName: string;
    familyName: string;
    partyMembers: string[];
  }>,
): Promise<Guest> {
  const patch: Record<string, unknown> = {};
  if (input.firstName !== undefined) patch.first_name = input.firstName;
  if (input.lastName !== undefined) patch.last_name = input.lastName;
  if (input.email !== undefined) patch.email = input.email;
  if (input.group !== undefined) patch.group = input.group;
  if (input.anecdote !== undefined) patch.anecdote = input.anecdote;
  if (input.anecdoteEs !== undefined) patch.anecdote_es = input.anecdoteEs;
  if (input.inviteCode !== undefined) patch.invite_code = input.inviteCode;
  if (input.displayName !== undefined) patch.display_name = input.displayName;
  if (input.familyName !== undefined) patch.family_name = input.familyName;
  if (input.partyMembers !== undefined) patch.party_members = input.partyMembers;

  const { data, error } = await getSupabase()
    .from("guests")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapGuest(data);
}

export async function createGuestsBatch(
  shared: {
    inviteCode: string;
    group: GuestGroup;
    displayName: string;
    familyName: string;
    anecdote: string;
    anecdoteEs: string;
  },
  members: {
    firstName: string;
    lastName: string;
    email: string;
    customAnecdote?: string;
    customAnecdoteEs?: string;
  }[],
): Promise<Guest[]> {
  const partyMembers = members.map((m) => m.firstName);

  const rows = members.map((m) => ({
    first_name: m.firstName,
    last_name: m.lastName,
    email: m.email,
    group: shared.group,
    invite_code: shared.inviteCode,
    display_name: shared.displayName,
    family_name: shared.familyName,
    anecdote: m.customAnecdote ?? shared.anecdote,
    anecdote_es: m.customAnecdoteEs ?? shared.anecdoteEs,
    party_members: partyMembers,
  }));

  const { data, error } = await getSupabase()
    .from("guests")
    .insert(rows)
    .select();
  if (error) throw error;
  return (data ?? []).map(mapGuest);
}

export async function deleteGuest(id: string): Promise<void> {
  const { error } = await getSupabase().from("guests").delete().eq("id", id);
  if (error) throw error;
}

export async function getNextInviteCode(): Promise<string> {
  const { data } = await getSupabase()
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

export async function getGuestsByInviteCode(inviteCode: string): Promise<Guest[]> {
  const normalized = normalizeCode(inviteCode);
  const { data } = await getSupabase()
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true });
  return (data ?? [])
    .filter((row) => normalizeCode(row.invite_code as string) === normalized)
    .map(mapGuest);
}

// ---------- group queries ----------

export async function getAllGroups(): Promise<Group[]> {
  const { data } = await getSupabase()
    .from("groups")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map(mapGroup);
}

export async function createGroup(input: { name: string; label: string }): Promise<Group> {
  const { data: existing } = await getSupabase()
    .from("groups")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const maxOrder = (existing?.[0]?.sort_order as number) ?? 0;

  const { data, error } = await getSupabase()
    .from("groups")
    .insert({ name: input.name, label: input.label, sort_order: maxOrder + 1 })
    .select()
    .single();
  if (error) throw error;
  return mapGroup(data);
}

export async function updateGroupLabel(id: string, label: string): Promise<Group> {
  const { data, error } = await getSupabase()
    .from("groups")
    .update({ label })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapGroup(data);
}

export async function deleteGroup(name: string): Promise<void> {
  const { error } = await getSupabase().from("groups").delete().eq("name", name);
  if (error) throw error;
}

export async function countGuestsInGroup(group: string): Promise<number> {
  const { count, error } = await getSupabase()
    .from("guests")
    .select("id", { count: "exact", head: true })
    .eq("group", group);
  if (error) throw error;
  return count ?? 0;
}

// ---------- event queries ----------

export async function getAllEvents(): Promise<WeddingEvent[]> {
  const { data } = await getSupabase()
    .from("events")
    .select("*")
    .order("start_datetime", { ascending: true, nullsFirst: false });
  return (data ?? []).map(mapEvent);
}

export async function eventsForGuestGroup(group: GuestGroup): Promise<WeddingEvent[]> {
  const { data } = await getSupabase()
    .from("events")
    .select("*")
    .order("start_datetime", { ascending: true, nullsFirst: false });
  return (data ?? [])
    .map(mapEvent)
    .filter((e) => e.groups.includes("all") || e.groups.includes(group));
}

export async function getEventById(id: string): Promise<WeddingEvent | null> {
  const { data } = await getSupabase()
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
  sortOrder?: number;
  startDatetime?: string | null;
}): Promise<WeddingEvent> {
  const { data, error } = await getSupabase()
    .from("events")
    .insert({
      day_label: input.dayLabel,
      event_date: input.eventDate,
      title: input.title,
      time: input.time,
      location: input.location,
      groups: input.groups,
      sort_order: input.sortOrder ?? 0,
      start_datetime: input.startDatetime ?? null,
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
    startDatetime: string | null;
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
  if ("startDatetime" in input) patch.start_datetime = input.startDatetime ?? null;

  const { data, error } = await getSupabase()
    .from("events")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapEvent(data);
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await getSupabase().from("events").delete().eq("id", id);
  if (error) throw error;
}
