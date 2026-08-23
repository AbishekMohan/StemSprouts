import { NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth"
import { prefersMarkdown } from "@/lib/accept-negotiation"

// Paths that already serve their own non-HTML representation, or that
// shouldn't ever be content-negotiated into Markdown.
const MARKDOWN_EXCLUDED_PREFIXES = ["/md/", "/admin/", "/api/", "/_next/"]
const MARKDOWN_EXCLUDED_EXACT = new Set(["/md", "/admin", "/api", "/robots.txt", "/sitemap.xml", "/llms.txt", "/news/feed.xml"])

function isMarkdownEligible(pathname: string): boolean {
  if (MARKDOWN_EXCLUDED_EXACT.has(pathname)) return false
  if (MARKDOWN_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false
  // Skip anything that already looks like a static asset (has a file extension).
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return false
  return true
}

async function handleAdminAuth(req: NextRequest): Promise<NextResponse | null> {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/setup") || pathname.startsWith("/admin/accept-invite")) {
    return null
  }

  const token = req.cookies.get("admin_token")?.value
  const payload = token ? await verifyAdminToken(token) : null

  if (!payload) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return null
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Admin/API auth gating - scoped exactly like the previous narrower
  // matcher (/admin/:path*, /api/posts/:path*) so behavior is unchanged.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/posts")) {
    const authResponse = await handleAdminAuth(req)
    if (authResponse) return authResponse
  }

  // Markdown content negotiation (https://acceptmarkdown.com): a request
  // that prefers text/markdown over text/html gets rewritten to the
  // Markdown route handler, which serves the same URL's Markdown
  // representation without changing what the browser shows in the address bar.
  // (The sitewide `Vary: Accept, Accept-Encoding` header is declared in
  // next.config.mjs's headers(), not here - Next's own RSC-related Vary
  // handling on page responses otherwise wins over one set in middleware.)
  const accept = req.headers.get("accept")
  if (isMarkdownEligible(pathname) && prefersMarkdown(accept)) {
    return NextResponse.rewrite(new URL(`/md${pathname}${search}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|xml|txt|json|woff2?)$).*)"],
}
