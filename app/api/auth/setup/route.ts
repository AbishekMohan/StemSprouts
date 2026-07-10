import { NextRequest, NextResponse } from "next/server"
import { countAdminUsers, createAdminUser, getAdminUserByUsername } from "@/lib/admin-users"
import { requireAdmin } from "@/lib/require-admin"
import { signAdminToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const username = typeof body?.username === "string" ? body.username.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (username.length < 3) {
    return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
  }

  const existingAdminCount = await countAdminUsers()

  // First account ever: anyone can bootstrap it. After that, only a logged-in
  // admin can create more accounts.
  if (existingAdminCount > 0) {
    const unauthorized = await requireAdmin(req)
    if (unauthorized) return unauthorized
  }

  if (await getAdminUserByUsername(username)) {
    return NextResponse.json({ error: "That username is already taken" }, { status: 409 })
  }

  const user = await createAdminUser(username, password)

  const res = NextResponse.json({ success: true })

  // Bootstrapping the first account logs you straight in. Adding an
  // additional account while already logged in leaves your session as-is.
  if (existingAdminCount === 0) {
    const token = await signAdminToken(user.username)
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  return res
}
