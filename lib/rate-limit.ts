import { getSupabaseAdmin } from "@/lib/supabase-admin"

// Backed by Supabase rather than an in-memory counter: this app runs as
// serverless functions on Vercel, where each invocation can land on a
// different instance with its own memory, so an in-memory counter would
// not reliably catch a brute-force attempt spread across cold starts.

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
export const MAX_ATTEMPTS = 5
export const WINDOW_SECONDS = WINDOW_MS / 1000

/** Client IP from the standard forwarding header Vercel sets. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}

/** Whether `key` (typically an IP) has hit the failed-attempt limit within the current window. */
export async function isRateLimited(key: string): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString()
  const { count } = await supabase
    .from("login_attempts")
    .select("id", { count: "exact", head: true })
    .eq("ip", key)
    .gte("created_at", windowStart)
  return (count ?? 0) >= MAX_ATTEMPTS
}

/** Records a failed attempt for `key`, and opportunistically clears its old rows. */
export async function recordFailedAttempt(key: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString()
  await supabase.from("login_attempts").delete().eq("ip", key).lt("created_at", windowStart)
  await supabase.from("login_attempts").insert({ ip: key })
}
