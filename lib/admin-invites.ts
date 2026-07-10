import { randomBytes } from "crypto"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export type AdminInvite = {
  id: string
  token: string
  createdBy: string
  expiresAt: string
  usedAt: string | null
}

export async function createInvite(createdBy: string): Promise<AdminInvite> {
  const token = randomBytes(24).toString("base64url")
  const expiresAt = new Date(Date.now() + INVITE_TTL_MS).toISOString()

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("admin_invites")
    .insert({ token, created_by: createdBy, expires_at: expiresAt })
    .select("id, token, created_by, expires_at, used_at")
    .single()

  if (error) throw new Error(error.message)
  return { id: data.id, token: data.token, createdBy: data.created_by, expiresAt: data.expires_at, usedAt: data.used_at }
}

export async function getValidInvite(token: string): Promise<AdminInvite | null> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("admin_invites")
    .select("id, token, created_by, expires_at, used_at")
    .eq("token", token)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle()

  if (!data) return null
  return { id: data.id, token: data.token, createdBy: data.created_by, expiresAt: data.expires_at, usedAt: data.used_at }
}

export async function markInviteUsed(id: string) {
  const supabase = getSupabaseAdmin()
  await supabase.from("admin_invites").update({ used_at: new Date().toISOString() }).eq("id", id)
}
