import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import { saveRsvp } from "@/lib/rsvp-store";
import { sendRsvpNotification } from "@/lib/email";

export async function POST(request: Request) {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    attendance?: string;
    guestCount?: number;
    notes?: string;
  };

  if (body.attendance !== "yes" && body.attendance !== "no") {
    return NextResponse.json(
      { error: "Attendance must be yes or no." },
      { status: 400 },
    );
  }

  const parsedGuestCount =
    typeof body.guestCount === "number" && Number.isFinite(body.guestCount)
      ? Math.max(1, Math.min(10, Math.floor(body.guestCount)))
      : 1;

  let record;
  try {
    record = await saveRsvp({
      guest,
      attendance: body.attendance,
      guestCount: parsedGuestCount,
      notes: typeof body.notes === "string" ? body.notes.trim() : "",
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : (err as Record<string, unknown>)?.message
          ? String((err as Record<string, unknown>).message)
          : JSON.stringify(err);
    console.error("saveRsvp failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Fire-and-forget email notification to Joshua
  void sendRsvpNotification({
    guestName: record.fullName,
    inviteCode: record.inviteCode,
    attendance: record.attendance,
    guestCount: record.guestCount,
    notes: record.notes,
  });

  return NextResponse.json({ ok: true, record });
}
