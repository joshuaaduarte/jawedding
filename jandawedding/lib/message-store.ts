import { getSupabase } from "./supabase";

export type GuestMessage = {
  id: string;
  guestId: string;
  inviteCode: string;
  guestName: string;
  body: string;
  submittedAt: string;
};

function mapMessage(row: Record<string, unknown>): GuestMessage {
  return {
    id: row.id as string,
    guestId: row.guest_id as string,
    inviteCode: row.invite_code as string,
    guestName: row.guest_name as string,
    body: row.body as string,
    submittedAt: row.submitted_at as string,
  };
}

export async function saveMessage(input: {
  guestId: string;
  inviteCode: string;
  guestName: string;
  body: string;
}): Promise<GuestMessage> {
  const { data, error } = await getSupabase()
    .from("messages")
    .insert({
      guest_id: input.guestId,
      invite_code: input.inviteCode,
      guest_name: input.guestName,
      body: input.body,
    })
    .select()
    .single();
  if (error) throw error;
  return mapMessage(data as Record<string, unknown>);
}

export async function getAllMessages(): Promise<GuestMessage[]> {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapMessage(row as Record<string, unknown>));
}
