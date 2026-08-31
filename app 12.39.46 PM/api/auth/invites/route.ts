import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { createInvite } from "@/lib/admin-invites"

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const admin = await requireAdmin(req, ["main_admin"])
  if (admin instanceof NextResponse) return admin

  const invite = await createInvite(admin.username, "chapter_lead")
  return NextResponse.json({ token: invite.token, expiresAt: invite.expiresAt })
}
