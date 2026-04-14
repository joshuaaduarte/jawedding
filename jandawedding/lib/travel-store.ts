import { getSupabase } from "@/lib/supabase";
import type { Guest } from "@/lib/guest-data";

export type TravelMode = "flying" | "driving" | "other";

export type TravelPost = {
  id: string;
  guestId: string;
  guestName: string;
  inviteCode: string;
  travelerName: string;
  travelMode: TravelMode;
  flyingFrom: string;
  flyingTo: string;
  arrivalDate: string;
  departureDate: string;
  contact: string;
  notes: string;
  isVisible: boolean;
  createdAt: string;
};

function mapPost(row: Record<string, unknown>): TravelPost {
  return {
    id: row.id as string,
    guestId: row.guest_id as string,
    guestName: row.guest_name as string,
    inviteCode: row.invite_code as string,
    travelerName: (row.traveler_name as string) ?? "",
    travelMode: (row.travel_mode as TravelMode) ?? "flying",
    flyingFrom: (row.flying_from as string) ?? "",
    flyingTo: (row.flying_to as string) ?? "",
    arrivalDate: (row.arrival_date as string) ?? "",
    departureDate: (row.departure_date as string) ?? "",
    contact: (row.contact as string) ?? "",
    notes: (row.notes as string) ?? "",
    isVisible: (row.is_visible as boolean) ?? false,
    createdAt: row.created_at as string,
  };
}

export async function getVisibleTravelPosts(): Promise<TravelPost[]> {
  const { data } = await getSupabase()
    .from("travel_posts")
    .select("*")
    .eq("is_visible", true)
    .order("arrival_date", { ascending: true });
  return (data ?? []).map(mapPost);
}

export async function getMyTravelPosts(guestId: string): Promise<TravelPost[]> {
  const { data } = await getSupabase()
    .from("travel_posts")
    .select("*")
    .eq("guest_id", guestId)
    .order("created_at", { ascending: true });
  return (data ?? []).map(mapPost);
}

export async function createTravelPost(input: {
  guest: Guest;
  travelerName: string;
  travelMode: TravelMode;
  flyingFrom: string;
  flyingTo: string;
  arrivalDate: string;
  departureDate: string;
  contact: string;
  notes: string;
  isVisible: boolean;
}): Promise<TravelPost> {
  const { data, error } = await getSupabase()
    .from("travel_posts")
    .insert({
      guest_id: input.guest.id,
      guest_name: `${input.guest.firstName} ${input.guest.lastName}`,
      invite_code: input.guest.inviteCode,
      traveler_name: input.travelerName,
      travel_mode: input.travelMode,
      flying_from: input.flyingFrom,
      flying_to: input.flyingTo,
      arrival_date: input.arrivalDate,
      departure_date: input.departureDate,
      contact: input.contact,
      notes: input.notes,
      is_visible: input.isVisible,
    })
    .select()
    .single();
  if (error) throw error;
  return mapPost(data);
}

export async function updateTravelPost(
  id: string,
  guestId: string,
  fields: {
    travelerName: string;
    travelMode: TravelMode;
    flyingFrom: string;
    flyingTo: string;
    arrivalDate: string;
    departureDate: string;
    contact: string;
    notes: string;
    isVisible: boolean;
  }
): Promise<TravelPost> {
  const { data, error } = await getSupabase()
    .from("travel_posts")
    .update({
      traveler_name: fields.travelerName,
      travel_mode: fields.travelMode,
      flying_from: fields.flyingFrom,
      flying_to: fields.flyingTo,
      arrival_date: fields.arrivalDate,
      departure_date: fields.departureDate,
      contact: fields.contact,
      notes: fields.notes,
      is_visible: fields.isVisible,
    })
    .eq("id", id)
    .eq("guest_id", guestId)
    .select()
    .single();
  if (error) throw error;
  return mapPost(data);
}

export async function deleteTravelPost(id: string, guestId: string): Promise<void> {
  const { error } = await getSupabase()
    .from("travel_posts")
    .delete()
    .eq("id", id)
    .eq("guest_id", guestId);
  if (error) throw error;
}

// ── Admin functions ──────────────────────────────────────────────────────────

export async function getAllTravelPosts(): Promise<TravelPost[]> {
  const { data } = await getSupabase()
    .from("travel_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapPost);
}

export async function getTravelPostById(id: string): Promise<TravelPost | null> {
  const { data } = await getSupabase()
    .from("travel_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ? mapPost(data) : null;
}

export async function adminUpdateTravelPost(
  id: string,
  fields: Partial<{
    travelerName: string;
    travelMode: TravelMode;
    flyingFrom: string;
    flyingTo: string;
    arrivalDate: string;
    departureDate: string;
    contact: string;
    notes: string;
    isVisible: boolean;
  }>
): Promise<void> {
  const update: Record<string, unknown> = {};
  if (fields.travelerName !== undefined) update.traveler_name = fields.travelerName;
  if (fields.travelMode !== undefined) update.travel_mode = fields.travelMode;
  if (fields.flyingFrom !== undefined) update.flying_from = fields.flyingFrom;
  if (fields.flyingTo !== undefined) update.flying_to = fields.flyingTo;
  if (fields.arrivalDate !== undefined) update.arrival_date = fields.arrivalDate;
  if (fields.departureDate !== undefined) update.departure_date = fields.departureDate;
  if (fields.contact !== undefined) update.contact = fields.contact;
  if (fields.notes !== undefined) update.notes = fields.notes;
  if (fields.isVisible !== undefined) update.is_visible = fields.isVisible;

  const { error } = await getSupabase()
    .from("travel_posts")
    .update(update)
    .eq("id", id);
  if (error) throw error;
}

export async function adminDeleteTravelPost(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("travel_posts")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
