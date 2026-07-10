import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getAdminUsers } from "@/lib/admin-users"
import { signAdminToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const username = body?.username
  const password = body?.password

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
  }

  const user = getAdminUsers().find((u) => u.username === username)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

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
