import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken, type AdminRole, type AdminSession } from "@/lib/auth"

export async function getAdminSession(req: NextRequest): Promise<AdminSession | null> {
  const token = req.cookies.get("admin_token")?.value
  return token ? await verifyAdminToken(token) : null
}

/**
 * Returns the caller's session, or a NextResponse to return immediately if
 * they're not logged in (401) or not one of `allowedRoles` (403).
 */
export async function requireAdmin(req: NextRequest, allowedRoles?: AdminRole[]): Promise<AdminSession | NextResponse> {
  const session = await getAdminSession(req)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  return session
}
