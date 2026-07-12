import { notFound, redirect } from "next/navigation"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { getAdminSessionFromCookies } from "@/lib/admin-session"
import { PostForm } from "@/components/admin/post-form"
import { toDisplayHtml } from "@/lib/render-post-content"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const session = await getAdminSessionFromCookies()
  if (!session) redirect("/admin/login")

  const { id } = await params
  const supabase = getSupabaseAdmin()
  const [{ data: post }, { data: allPosts }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("posts").select("category"),
  ])

  if (!post) notFound()
  if (session.role === "chapter_lead" && post.created_by !== session.id) notFound()

  const categories = Array.from(new Set((allPosts ?? []).map((p) => p.category))).sort()

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-8">Edit Post</h1>
        <PostForm
          categories={categories}
          role={session.role}
          initial={{
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: toDisplayHtml(post.content),
            category: post.category,
            imageUrl: post.image_url ?? "",
            author: post.author,
            status: post.status,
          }}
        />
      </div>
    </main>
  )
}
