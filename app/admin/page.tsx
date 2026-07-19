import Link from "next/link"
import { redirect } from "next/navigation"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { getAdminSessionFromCookies } from "@/lib/admin-session"
import { LogoutButton } from "@/components/admin/logout-button"
import { DeletePostButton } from "@/components/admin/delete-post-button"
import { ReviewButtons } from "@/components/admin/review-buttons"
import { StatusBadge } from "@/components/admin/status-badge"
import { formatCategory } from "@/lib/format-category"

export const dynamic = "force-dynamic"

async function getPosts(scopeToUserId?: string) {
  const supabase = getSupabaseAdmin()
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false })
  if (scopeToUserId) query = query.eq("created_by", scopeToUserId)
  const { data } = await query
  return data ?? []
}

export default async function AdminPage() {
  const session = await getAdminSessionFromCookies()
  if (!session) redirect("/admin/login")

  const isMainAdmin = session.role === "main_admin"
  const posts = await getPosts(isMainAdmin ? undefined : session.id)
  const pending = isMainAdmin ? posts.filter((p) => p.status === "pending") : []
  const rest = isMainAdmin ? posts.filter((p) => p.status !== "pending") : posts

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-black dark:text-white">Posts</h1>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/admin/new"
              className="flex items-center justify-center text-center bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-4 py-2 font-bold text-sm"
            >
              New Post
            </Link>
            {isMainAdmin && (
              <>
                <Link
                  href="/admin/invite"
                  className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-4 py-2 font-bold text-sm"
                >
                  Invite Admin
                </Link>
                <Link
                  href="/admin/admins"
                  className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-4 py-2 font-bold text-sm"
                >
                  Manage Admins
                </Link>
              </>
            )}
            <LogoutButton />
          </div>
        </div>

        {isMainAdmin && pending.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-black dark:text-white mb-3">
              Pending Review <span className="text-amber-600 dark:text-amber-400">({pending.length})</span>
            </h2>
            <div className="space-y-3">
              {pending.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between gap-4 border-2 border-amber-500 rounded-xl px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-black dark:text-white truncate">
                      {post.title}
                      <StatusBadge status={post.status} />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {post.author} &middot; /news/{post.slug}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center flex-shrink-0">
                    <Link href={`/admin/${post.id}`} className="text-sm font-semibold underline text-black dark:text-white">
                      Review
                    </Link>
                    <ReviewButtons id={post.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {rest.length === 0 && <p className="text-gray-600 dark:text-gray-400">No posts yet.</p>}
          {rest.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 border-2 border-black dark:border-white rounded-xl px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-bold text-black dark:text-white truncate">
                  {post.title}
                  <StatusBadge status={post.status} />
                  {post.category !== "news" && (
                    <span className="ml-2 text-[10px] uppercase font-bold bg-[#22C55E] text-black rounded-full px-2 py-0.5 align-middle">
                      {formatCategory(post.category)}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">/news/{post.slug}</p>
              </div>
              <div className="flex gap-3 items-center flex-shrink-0">
                <Link href={`/admin/${post.id}`} className="text-sm font-semibold underline text-black dark:text-white">
                  Edit
                </Link>
                {(isMainAdmin || post.status !== "published") && <DeletePostButton id={post.id} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
