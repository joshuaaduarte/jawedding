import { cookies } from "next/headers";

export type Locale = "en" | "es";

export const LOCALE_COOKIE_NAME = "site_locale";

export function normalizeLocale(value?: string | null): Locale {
  return value === "es" ? "es" : "en";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return normalizeLocale(value);
}

