import { getSupabase } from "@/lib/supabase";
import type { Guest } from "@/lib/guest-data";

export type CarpoolAirport = "SFO" | "OAK" | "SJC";

export type CarpoolEntry = {
  id: string;
  guestId: string;
  guestName: string;
  inviteCode: string;
  airport: CarpoolAirport;
  arrivalDate: string;
  seatsAvailable: number;
  notes: string;
  contact: string;
  createdAt: string;
};

function mapEntry(row: Record<string, unknown>): CarpoolEntry {
  return {
    id: row.id as string,
    guestId: row.guest_id as string,
    guestName: row.guest_name as string,
    inviteCode: row.invite_code as string,
    airport: row.airport as CarpoolAirport,
    arrivalDate: row.arrival_date as string,
    seatsAvailable: row.seats_available as number,
    notes: (row.notes as string) ?? "",
    contact: row.contact as string,
    createdAt: row.created_at as string,
  };
}

export async function getAllCarpoolEntries(): Promise<CarpoolEntry[]> {
  const { data } = await getSupabase()
    .from("carpool_entries")
    .select("*")
    .order("arrival_date", { ascending: true });
  return (data ?? []).map(mapEntry);
}

export async function addCarpoolEntry(input: {
  guest: Guest;
  airport: CarpoolAirport;
  arrivalDate: string;
  seatsAvailable: number;
  notes: string;
  contact: string;
}): Promise<CarpoolEntry> {
  const { data, error } = await getSupabase()
    .from("carpool_entries")
    .insert({
      guest_id: input.guest.id,
      guest_name: `${input.guest.firstName} ${input.guest.lastName}`,
      invite_code: input.guest.inviteCode,
      airport: input.airport,
      arrival_date: input.arrivalDate,
      seats_available: input.seatsAvailable,
      notes: input.notes,
      contact: input.contact,
    })
    .select()
    .single();

  if (error) throw error;
  return mapEntry(data);
}
