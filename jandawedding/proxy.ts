import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_AUTH_COOKIE_NAME, AUTH_COOKIE_NAME, validateAdminPassword } from "@/lib/auth";

// NOTE: Next.js middleware cannot use Node.js APIs (no Supabase here).
// Auth is checked server-side in each page/layout — this just provides
// a fast edge redirect for obvious unauthenticated requests.

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/portal")) {
    const inviteCode = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (inviteCode) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const adminCookie = request.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value;
    if (adminCookie && validateAdminPassword(adminCookie)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
