import { NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE_NAME, validateAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (typeof password !== "string" || !validateAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_AUTH_COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
