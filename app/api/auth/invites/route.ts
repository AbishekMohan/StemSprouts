import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth"
import { requireAdmin } from "@/lib/require-admin"
import { createInvite } from "@/lib/admin-invites"

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const token = req.cookies.get("admin_token")!.value
  const payload = (await verifyAdminToken(token))!

  const invite = await createInvite(payload.username)
  return NextResponse.json({ token: invite.token, expiresAt: invite.expiresAt })
}
