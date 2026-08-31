import Link from "next/link"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { LogoutButton } from "@/components/admin/logout-button"
import { DeletePostButton } from "@/components/admin/delete-post-button"

export const dynamic = "force-dynamic"

async function getPosts() {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
  return data ?? []
}

export default async function AdminPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-black dark:text-white">Posts</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="flex items-center justify-center text-center bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-4 py-2 font-bold text-sm"
            >
              New Post
            </Link>
            <Link
              href="/admin/invite"
              className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-4 py-2 font-bold text-sm"
            >
              Invite Admin
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="space-y-3">
          {posts.length === 0 && <p className="text-gray-600 dark:text-gray-400">No posts yet.</p>}
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 border-2 border-black dark:border-white rounded-xl px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-bold text-black dark:text-white truncate">
                  {post.title}{" "}
                  {!post.published && (
                    <span className="ml-2 text-[10px] uppercase font-bold text-gray-500 border border-gray-400 rounded-full px-2 py-0.5 align-middle">
                      Draft
                    </span>
                  )}
                  {post.category === "research" && (
                    <span className="ml-2 text-[10px] uppercase font-bold bg-[#22C55E] text-black rounded-full px-2 py-0.5 align-middle">
                      Research
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">/news/{post.slug}</p>
              </div>
              <div className="flex gap-3 items-center flex-shrink-0">
                <Link href={`/admin/${post.id}`} className="text-sm font-semibold underline text-black dark:text-white">
                  Edit
                </Link>
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
