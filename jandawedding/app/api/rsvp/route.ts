import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import { getGuestsByInviteCode } from "@/lib/guest-data";
import { saveRsvp } from "@/lib/rsvp-store";
import type { RsvpAttendance } from "@/lib/rsvp-store";
import { sendRsvpNotification } from "@/lib/email";

export async function POST(request: Request) {
  const authGuest = await getAuthenticatedGuest();
  if (!authGuest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all guests sharing this invite code
  const groupGuests = await getGuestsByInviteCode(authGuest.inviteCode);
  const validGuestIds = new Set(groupGuests.map((g) => g.id));

  const body = (await request.json()) as {
    rsvps?: { guestId: string; attendance: string; notes: string }[];
  };

  if (!Array.isArray(body.rsvps) || body.rsvps.length === 0) {
    return NextResponse.json({ error: "No RSVPs submitted." }, { status: 400 });
  }

  // Validate every submitted guestId belongs to this invite code group
  for (const item of body.rsvps) {
    if (!validGuestIds.has(item.guestId)) {
      return NextResponse.json({ error: "Unauthorized guest." }, { status: 403 });
    }
    if (item.attendance !== "yes" && item.attendance !== "no") {
      return NextResponse.json(
        { error: "Attendance must be yes or no." },
        { status: 400 },
      );
    }
  }

  let records;
  try {
    records = await Promise.all(
      body.rsvps.map((item) => {
        const guest = groupGuests.find((g) => g.id === item.guestId)!;
        return saveRsvp({
          guest,
          attendance: item.attendance as RsvpAttendance,
          guestCount: 1,
          notes: typeof item.notes === "string" ? item.notes.trim() : "",
        });
      }),
    );
  } catch (err) {
    console.error("saveRsvp failed:", err);
    return NextResponse.json({ error: "Unable to save RSVP." }, { status: 500 });
  }

  // Fire-and-forget notification summarising the whole group
  const attending = records.filter((r) => r.attendance === "yes");
  const declining = records.filter((r) => r.attendance === "no");
  const names = records.map((r) => r.fullName).join(", ");
  const notesSummary = records
    .map((r) => (r.notes ? `${r.fullName}: ${r.notes}` : ""))
    .filter(Boolean)
    .join(" | ");

  void sendRsvpNotification({
    guestName: names,
    inviteCode: authGuest.inviteCode,
    attendance: declining.length === 0 ? "yes" : attending.length === 0 ? "no" : "yes",
    guestCount: attending.length,
    notes: notesSummary,
  });

  return NextResponse.json({ ok: true, records });
}
