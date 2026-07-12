import bcrypt from "bcryptjs"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import type { AdminRole } from "@/lib/auth"

export type AdminUser = { id: string; username: string; passwordHash: string; role: AdminRole }
export type AdminUserSummary = { id: string; username: string; role: AdminRole; createdAt: string }

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("admin_users")
    .select("id, username, password_hash, role")
    .eq("username", username)
    .maybeSingle()

  if (!data) return null
  return { id: data.id, username: data.username, passwordHash: data.password_hash, role: data.role }
}

export async function getAdminUserById(id: string): Promise<AdminUserSummary | null> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase.from("admin_users").select("id, username, role, created_at").eq("id", id).maybeSingle()

  if (!data) return null
  return { id: data.id, username: data.username, role: data.role, createdAt: data.created_at }
}

export async function countAdminUsers(): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { count } = await supabase.from("admin_users").select("id", { count: "exact", head: true })
  return count ?? 0
}

export async function countMainAdmins(): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { count } = await supabase
    .from("admin_users")
    .select("id", { count: "exact", head: true })
    .eq("role", "main_admin")
  return count ?? 0
}

export async function createAdminUser(username: string, password: string, role: AdminRole): Promise<AdminUser> {
  const passwordHash = await bcrypt.hash(password, 12)
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("admin_users")
    .insert({ username, password_hash: passwordHash, role })
    .select("id, username, password_hash, role")
    .single()

  if (error) throw new Error(error.message)
  return { id: data.id, username: data.username, passwordHash: data.password_hash, role: data.role }
}

export async function listAdminUsers(): Promise<AdminUserSummary[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, username, role, created_at")
    .order("created_at", { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []).map((u) => ({ id: u.id, username: u.username, role: u.role, createdAt: u.created_at }))
}

export async function deleteAdminUser(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("admin_users").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
