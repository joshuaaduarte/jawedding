import { NextResponse } from "next/server";
import { getAuthenticatedGuest } from "@/lib/auth";
import {
  getVisibleTravelPosts,
  getMyTravelPosts,
  createTravelPost,
} from "@/lib/travel-store";
import type { TravelMode } from "@/lib/travel-store";

const VALID_MODES = new Set<string>(["flying", "driving", "other"]);

export async function GET() {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [posts, myPosts] = await Promise.all([
    getVisibleTravelPosts(),
    getMyTravelPosts(guest.id),
  ]);

  return NextResponse.json({ posts, myPosts });
}

export async function POST(request: Request) {
  const guest = await getAuthenticatedGuest();
  if (!guest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const post = await createTravelPost({
    guest,
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
