export type AdminUser = { username: string; passwordHash: string }

// ADMIN_USERS is base64-encoded JSON. Bcrypt hashes are full of "$" characters,
// which Next.js's .env variable expansion (dotenv-expand) would otherwise mangle.
export function getAdminUsers(): AdminUser[] {
  const raw = process.env.ADMIN_USERS
  if (!raw) return []
  try {
    const json = Buffer.from(raw, "base64").toString("utf-8")
    const parsed = JSON.parse(json)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (u): u is AdminUser => typeof u?.username === "string" && typeof u?.passwordHash === "string",
    )
  } catch {
    return []
  }
}
