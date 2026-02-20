import { NextResponse } from "next/server";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/locale";

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: string };
  const locale = normalizeLocale(body.locale);

  const response = NextResponse.json({ ok: true, locale });
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

