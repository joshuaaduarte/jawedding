import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import { addCarpoolEntry, getAllCarpoolEntries } from "@/lib/carpool-store";

const ALLOWED_AIRPORTS = new Set(["SFO", "OAK", "SJC"]);

export async function GET() {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await getAllCarpoolEntries();
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    airport?: string;
    arrivalDate?: string;
    seatsAvailable?: number;
    notes?: string;
    contact?: string;
  };

  if (!body.airport || !ALLOWED_AIRPORTS.has(body.airport)) {
    return NextResponse.json({ error: "Invalid airport." }, { status: 400 });
  }

  if (!body.arrivalDate || Number.isNaN(Date.parse(body.arrivalDate))) {
    return NextResponse.json({ error: "Invalid arrival date." }, { status: 400 });
  }

  const seatsAvailable =
    typeof body.seatsAvailable === "number" && Number.isFinite(body.seatsAvailable)
      ? Math.max(1, Math.min(6, Math.floor(body.seatsAvailable)))
      : 1;

  const entry = await addCarpoolEntry({
    guest,
    airport: body.airport as "SFO" | "OAK" | "SJC",
    arrivalDate: body.arrivalDate,
    seatsAvailable,
    notes: typeof body.notes === "string" ? body.notes.trim() : "",
    contact: typeof body.contact === "string" ? body.contact.trim() : "",
  });

  return NextResponse.json({ ok: true, entry });
}

