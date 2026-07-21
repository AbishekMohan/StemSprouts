import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { resolvePostWrite } from "@/lib/post-status"
import { sanitizePostContent } from "@/lib/sanitize-post-content"
import { pingGoogleIndexing } from "@/lib/google-indexing"
import { sendNewsletterForPost } from "@/lib/newsletter"
import { SITE_URL } from "@/lib/site"

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (admin instanceof NextResponse) return admin

  const supabase = getSupabaseAdmin()
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false })
  if (admin.role === "chapter_lead") {
    query = query.eq("created_by", admin.id)
  }
  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req)
  if (admin instanceof NextResponse) return admin

  const body = await req.json().catch(() => null)
  const { slug, title, excerpt, content, category, imageUrl, author, status: requestedStatus } = body ?? {}

  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 })
  }

  const normalizedCategory = typeof category === "string" ? category.trim().toLowerCase() : ""
  const { status, publishedAt } = resolvePostWrite(admin.role, requestedStatus, null)

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("posts")
    .insert({
      slug,
      title,
      excerpt: typeof excerpt === "string" ? excerpt : "",
      content: typeof content === "string" ? sanitizePostContent(content) : "",
      category: normalizedCategory || "news",
      image_url: typeof imageUrl === "string" && imageUrl ? imageUrl : null,
      author: typeof author === "string" && author ? author : "STEM Sprouts",
      status,
      published: status === "published",
      published_at: publishedAt,
      created_by: admin.id,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (status === "published") {
    await pingGoogleIndexing(`${SITE_URL}/news/${data.slug}`)
    await sendNewsletterForPost({ title: data.title, excerpt: data.excerpt, slug: data.slug, image_url: data.image_url })
  }

  return NextResponse.json({ post: data })
}
