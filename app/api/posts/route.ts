import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const body = await req.json().catch(() => null)
  const { slug, title, excerpt, content, category, imageUrl, author, published } = body ?? {}

  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 })
  }

  const normalizedCategory = typeof category === "string" ? category.trim().toLowerCase() : ""

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("posts")
    .insert({
      slug,
      title,
      excerpt: typeof excerpt === "string" ? excerpt : "",
      content: typeof content === "string" ? content : "",
      category: normalizedCategory || "news",
      image_url: typeof imageUrl === "string" && imageUrl ? imageUrl : null,
      author: typeof author === "string" && author ? author : "STEM Sprouts",
      published: !!published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}
