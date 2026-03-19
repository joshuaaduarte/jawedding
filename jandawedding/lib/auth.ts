import { cookies } from "next/headers";
import { getGuestById } from "@/lib/guest-data";

export const AUTH_COOKIE_NAME = "guest_portal_auth";
export const ADMIN_AUTH_COOKIE_NAME = "admin_portal_auth";

export async function getAuthenticatedGuest() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!guestId) return null;
  return getGuestById(guestId);
}

export async function isAuthenticated() {
  const guest = await getAuthenticatedGuest();
  return guest !== null;
}

function getAdminPassword() {
  return process.env.ADMIN_PORTAL_PASSWORD ?? "admin-temp-2026";
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_AUTH_COOKIE_NAME)?.value;
  return adminCookie === getAdminPassword();
}

export function validateAdminPassword(password: string) {
  return password === getAdminPassword();
}
