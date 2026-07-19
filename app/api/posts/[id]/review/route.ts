import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { pingGoogleIndexing } from "@/lib/google-indexing"
import { SITE_URL } from "@/lib/site"

type Params = { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin(req, ["main_admin"])
  if (admin instanceof NextResponse) return admin

  const { id } = await params
  const body = await req.json().catch(() => null)
  const action = body?.action

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "action must be 'approve' or 'reject'" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase.from("posts").select("published_at").eq("id", id).single()
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  const status = action === "approve" ? "published" : "draft"
  const publishedAt = action === "approve" ? existing.published_at ?? new Date().toISOString() : null

  const { data, error } = await supabase
    .from("posts")
    .update({ status, published: status === "published", published_at: publishedAt, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (status === "published") {
    await pingGoogleIndexing(`${SITE_URL}/news/${data.slug}`)
  }

  return NextResponse.json({ post: data })
}
