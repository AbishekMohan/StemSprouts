import bcrypt from "bcryptjs"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export type AdminUser = { id: string; username: string; passwordHash: string }

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("admin_users")
    .select("id, username, password_hash")
    .eq("username", username)
    .maybeSingle()

  if (!data) return null
  return { id: data.id, username: data.username, passwordHash: data.password_hash }
}

export async function countAdminUsers(): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { count } = await supabase.from("admin_users").select("id", { count: "exact", head: true })
  return count ?? 0
}

export async function createAdminUser(username: string, password: string): Promise<AdminUser> {
  const passwordHash = await bcrypt.hash(password, 12)
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("admin_users")
    .insert({ username, password_hash: passwordHash })
    .select("id, username, password_hash")
    .single()

  if (error) throw new Error(error.message)
  return { id: data.id, username: data.username, passwordHash: data.password_hash }
}
