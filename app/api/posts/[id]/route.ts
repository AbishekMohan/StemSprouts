import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ post: data })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const body = await req.json().catch(() => null)
  const { slug, title, excerpt, content, category, author, published } = body ?? {}

  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase.from("posts").select("published_at").eq("id", id).single()

  const { data, error } = await supabase
    .from("posts")
    .update({
      slug,
      title,
      excerpt: typeof excerpt === "string" ? excerpt : "",
      content: typeof content === "string" ? content : "",
      category: category === "research" ? "research" : "news",
      author: typeof author === "string" && author ? author : "STEM Sprouts",
      published: !!published,
      published_at: published ? (existing?.published_at ?? new Date().toISOString()) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const { id } = await params
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
