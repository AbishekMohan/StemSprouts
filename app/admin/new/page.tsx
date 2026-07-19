import { redirect } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { getAdminSessionFromCookies } from "@/lib/admin-session"

export const dynamic = "force-dynamic"

async function getCategories() {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase.from("posts").select("category")
  return Array.from(new Set((data ?? []).map((p) => p.category))).sort()
}

export default async function NewPostPage() {
  const session = await getAdminSessionFromCookies()
  if (!session) redirect("/admin/login")

  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-8">New Post</h1>
        <PostForm categories={categories} role={session.role} />
      </div>
    </main>
  )
}
