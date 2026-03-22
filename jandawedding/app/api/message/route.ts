import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import { saveMessage } from "@/lib/message-store";
import { sendMessageNotification } from "@/lib/email";

export async function POST(request: Request) {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const text =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!text) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 },
    );
  }

  try {
    await saveMessage({
      guestId: guest.id,
      inviteCode: guest.inviteCode,
      guestName: `${guest.firstName} ${guest.lastName}`,
      body: text,
    });

    void sendMessageNotification({
      guestName: `${guest.firstName} ${guest.lastName}`,
      message: text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("saveMessage failed:", err);
    return NextResponse.json(
      { error: "Unable to save message." },
      { status: 500 },
    );
  }
}
