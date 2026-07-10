import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth"

export async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value
  const payload = token ? await verifyAdminToken(token) : null

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return null
}
