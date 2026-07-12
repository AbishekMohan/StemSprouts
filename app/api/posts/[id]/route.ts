import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { resolvePostWrite } from "@/lib/post-status"
import { sanitizePostContent } from "@/lib/sanitize-post-content"
import { pingGoogleIndexing } from "@/lib/google-indexing"
import { SITE_URL } from "@/lib/site"

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req)
  if (admin instanceof NextResponse) return admin

  const { id } = await params
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  if (admin.role === "chapter_lead" && data.created_by !== admin.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  return NextResponse.json({ post: data })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req)
  if (admin instanceof NextResponse) return admin

  const { id } = await params
  const body = await req.json().catch(() => null)
  const { slug, title, excerpt, content, category, imageUrl, author, status: requestedStatus } = body ?? {}

  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 })
  }

  const normalizedCategory = typeof category === "string" ? category.trim().toLowerCase() : ""

  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase.from("posts").select("published_at, created_by").eq("id", id).single()

  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  if (admin.role === "chapter_lead" && existing.created_by !== admin.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { status, publishedAt } = resolvePostWrite(admin.role, requestedStatus, existing.published_at)

  const { data, error } = await supabase
    .from("posts")
    .update({
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
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (status === "published") {
    await pingGoogleIndexing(`${SITE_URL}/news/${data.slug}`)
  }

  return NextResponse.json({ post: data })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req)
  if (admin instanceof NextResponse) return admin

  const { id } = await params
  const supabase = getSupabaseAdmin()

  if (admin.role === "chapter_lead") {
    const { data: existing } = await supabase.from("posts").select("created_by, status").eq("id", id).single()
    if (!existing || existing.created_by !== admin.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    if (existing.status === "published") {
      return NextResponse.json({ error: "Ask a main admin to remove a published post" }, { status: 403 })
    }
  }

  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
