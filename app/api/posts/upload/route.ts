import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { requireAdmin } from "@/lib/require-admin"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"])
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req)
  if (unauthorized) return unauthorized

  const formData = await req.formData().catch(() => null)
  const file = formData?.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type. Use PNG, JPEG, WebP, or GIF." }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
  }

  const extension = file.type.split("/")[1]
  const path = `${randomUUID()}.${extension}`

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.storage.from("post-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabase.storage.from("post-images").getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
