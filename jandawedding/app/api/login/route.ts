import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { findGuestByInvite } from "@/lib/guest-data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const inviteCode = formData.get("inviteCode");
  const lastName = formData.get("lastName");

  const guest =
    typeof inviteCode === "string" && typeof lastName === "string"
      ? await findGuestByInvite(inviteCode, lastName)
      : null;

  if (!guest) {
    return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/portal", request.url), 303);
  response.cookies.set(AUTH_COOKIE_NAME, guest.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
