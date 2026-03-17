import { getSupabase } from "@/lib/supabase";
import type { Guest } from "@/lib/guest-data";

export type RsvpAttendance = "yes" | "no";

export type RsvpRecord = {
  guestId: string;
  inviteCode: string;
  fullName: string;
  email: string;
  attendance: RsvpAttendance;
  guestCount: number;
  notes: string;
  submittedAt: string;
};

function mapRsvp(row: Record<string, unknown>): RsvpRecord {
  return {
    guestId: row.guest_id as string,
    inviteCode: row.invite_code as string,
    fullName: row.full_name as string,
    email: (row.email as string) ?? "",
    attendance: row.attendance as RsvpAttendance,
    guestCount: row.guest_count as number,
    notes: (row.notes as string) ?? "",
    submittedAt: row.submitted_at as string,
  };
}

export async function getAllRsvps(): Promise<RsvpRecord[]> {
  const { data } = await getSupabase()
    .from("rsvps")
    .select("*")
    .order("submitted_at", { ascending: false });
  return (data ?? []).map(mapRsvp);
}

export async function getRsvpByGuestId(guestId: string): Promise<RsvpRecord | null> {
  const { data } = await getSupabase()
    .from("rsvps")
    .select("*")
    .eq("guest_id", guestId)
    .maybeSingle();
  return data ? mapRsvp(data) : null;
}

export async function saveRsvp(input: {
  guest: Guest;
  attendance: RsvpAttendance;
  guestCount: number;
  notes: string;
}): Promise<RsvpRecord> {
  const { data, error } = await getSupabase()
    .from("rsvps")
    .upsert(
      {
        guest_id: input.guest.id,
        invite_code: input.guest.inviteCode,
        full_name: `${input.guest.firstName} ${input.guest.lastName}`,
        email: input.guest.email,
        attendance: input.attendance,
        guest_count: input.guestCount,
        notes: input.notes,
        submitted_at: new Date().toISOString(),
      },
      { onConflict: "guest_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return mapRsvp(data);
}
