import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const token = req.cookies.get("admin_token")?.value
  const payload = token ? await verifyAdminToken(token) : null

  if (!payload) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/posts/:path*"],
}
