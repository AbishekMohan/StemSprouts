import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { deleteAdminUser, getAdminUserById, countMainAdmins } from "@/lib/admin-users"

type Params = { params: Promise<{ id: string }> }

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req, ["main_admin"])
  if (admin instanceof NextResponse) return admin

  const { id } = await params

  if (id === admin.id) {
    return NextResponse.json({ error: "You can't remove your own account" }, { status: 400 })
  }

  const target = await getAdminUserById(id)
  if (!target) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 })
  }

  if (target.role === "main_admin" && (await countMainAdmins()) <= 1) {
    return NextResponse.json({ error: "Can't remove the last main admin" }, { status: 400 })
  }

  await deleteAdminUser(id)
  return NextResponse.json({ success: true })
}
