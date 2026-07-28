import { createClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = ReturnType<typeof createClient<any>>;
let _client: SupabaseClient | undefined;

// Call this inside async functions — never at module level.
// Keeps build-time static analysis happy; only throws at runtime
// if env vars are missing.
export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Copy .env.local.example to .env.local and fill in the values.",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _client = createClient<any>(url, key, { auth: { persistSession: false } });
  return _client;
}

// True when a query failed only because the table hasn't been created yet
// (i.e. the schema migration in supabase/schema.sql hasn't been run). Lets
// read paths degrade to an empty result instead of hard-crashing the page.
export function isMissingTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: string }).code;
  // PGRST205: PostgREST schema cache miss. 42P01: Postgres "undefined_table".
  return code === "PGRST205" || code === "42P01";
}
