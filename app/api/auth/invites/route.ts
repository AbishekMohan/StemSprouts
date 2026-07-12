import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { createInvite } from "@/lib/admin-invites"

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req, ["main_admin"])
  if (admin instanceof NextResponse) return admin

  const body = await req.json().catch(() => null)
  const role = body?.role === "main_admin" ? "main_admin" : "chapter_lead"

  const invite = await createInvite(admin.username, role)
  return NextResponse.json({ token: invite.token, role: invite.role, expiresAt: invite.expiresAt })
}
