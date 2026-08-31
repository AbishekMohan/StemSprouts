import { NextRequest, NextResponse } from "next/server"
import { getValidInvite, markInviteUsed } from "@/lib/admin-invites"
import { createAdminUser, getAdminUserByUsername } from "@/lib/admin-users"
import { signAdminToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const inviteToken = typeof body?.token === "string" ? body.token : ""
  const username = typeof body?.username === "string" ? body.username.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (username.length < 3) {
    return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
  }

  const invite = await getValidInvite(inviteToken)
  if (!invite) {
    return NextResponse.json({ error: "This invite link is invalid, expired, or already used" }, { status: 403 })
  }

  if (await getAdminUserByUsername(username)) {
    return NextResponse.json({ error: "That username is already taken" }, { status: 409 })
  }

  const user = await createAdminUser(username, password, invite.role)
  await markInviteUsed(invite.id)

  const jwt = await signAdminToken({ id: user.id, username: user.username, role: user.role })
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
