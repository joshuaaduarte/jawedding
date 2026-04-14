import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import { updateTravelPost, deleteTravelPost } from "@/lib/travel-store";
import type { TravelMode } from "@/lib/travel-store";

type Params = { params: Promise<{ id: string }> };

const VALID_MODES = new Set<string>(["flying", "driving", "other"]);

export async function PUT(request: Request, { params }: Params) {
  const guest = await getAuthenticatedGuest();
  if (!guest) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json()) as {
    travelerName?: string;
    travelMode?: string;
    flyingFrom?: string;
    flyingTo?: string;
    arrivalDate?: string;
    departureDate?: string;
    contact?: string;
    notes?: string;
    isVisible?: boolean;
  };

  const travelMode = body.travelMode && VALID_MODES.has(body.travelMode)
    ? (body.travelMode as TravelMode)
    : "flying";

  const post = await updateTravelPost(id, guest.id, {
    travelerName: typeof body.travelerName === "string" ? body.travelerName.trim() : "",
    travelMode,
    flyingFrom: typeof body.flyingFrom === "string" ? body.flyingFrom.trim() : "",
    flyingTo: typeof body.flyingTo === "string" ? body.flyingTo.trim() : "",
    arrivalDate: typeof body.arrivalDate === "string" ? body.arrivalDate.trim() : "",
    departureDate: typeof body.departureDate === "string" ? body.departureDate.trim() : "",
    contact: typeof body.contact === "string" ? body.contact.trim() : "",
    notes: typeof body.notes === "string" ? body.notes.trim() : "",
    isVisible: body.isVisible === true,
  });

  return NextResponse.json({ ok: true, post });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guest = await getAuthenticatedGuest();
  if (!guest) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await deleteTravelPost(id, guest.id);
  return NextResponse.json({ ok: true });
}
