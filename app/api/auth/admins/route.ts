import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { listAdminUsers } from "@/lib/admin-users"

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req, ["main_admin"])
  if (admin instanceof NextResponse) return admin

  const admins = await listAdminUsers()
  return NextResponse.json({ admins })
}
