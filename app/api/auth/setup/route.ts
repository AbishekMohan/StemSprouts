import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "crypto"
import { countAdminUsers, createAdminUser, getAdminUserByUsername } from "@/lib/admin-users"
import { signAdminToken } from "@/lib/auth"

function matchesSetupSecret(provided: string) {
  const expected = process.env.ADMIN_SETUP_SECRET
  if (!expected) return false // fail closed if misconfigured, not open

  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const username = typeof body?.username === "string" ? body.username.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""
  const setupSecret = typeof body?.setupSecret === "string" ? body.setupSecret : ""

  if (username.length < 3) {
    return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
  }

  const existingAdminCount = await countAdminUsers()

  // This endpoint only ever bootstraps the very first admin account, and
  // requires the one-time setup secret since nobody's an admin yet to check
  // against. Once any admin exists, further accounts go through invite
  // links (/admin/invite) instead, so the person who's logging in always
  // picks their own username/password rather than someone else typing it
  // in for them.
  if (existingAdminCount > 0) {
    return NextResponse.json(
      { error: "Setup already complete. Ask an existing admin for an invite link instead." },
      { status: 403 },
    )
  }
  if (!matchesSetupSecret(setupSecret)) {
    return NextResponse.json({ error: "Invalid setup code" }, { status: 403 })
  }

  if (await getAdminUserByUsername(username)) {
    return NextResponse.json({ error: "That username is already taken" }, { status: 409 })
  }

  const user = await createAdminUser(username, password)

  const token = await signAdminToken(user.username)
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
