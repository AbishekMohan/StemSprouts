import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { PopIn } from "@/components/pop-in"
import { supabasePublic } from "@/lib/supabase-public"
import { formatCategory } from "@/lib/format-category"

export const metadata: Metadata = {
  title: "News - STEM Sprouts",
  description: "Updates, announcements, and research from STEM Sprouts.",
}

export const revalidate = 60

type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  published_at: string
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabasePublic
    .from("posts")
    .select("id, slug, title, excerpt, category, author, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export default async function NewsPage() {
  const posts = await getPosts()

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <PageHeader
        title="News &"
        highlight="Updates"
        description="The latest from STEM Sprouts chapters, partnerships, and research."
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400">No posts yet, check back soon.</p>
          )}
          {posts.map((post, index) => (
            <PopIn key={post.id} delay={(index % 4) * 100}>
              <Link
                href={`/news/${post.slug}`}
                className="block bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-[24px] p-6 md:p-8 hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {post.category !== "news" && (
                    <span className="inline-block bg-[#22C55E] text-black text-xs font-bold px-3 py-1 rounded-full">
                      {formatCategory(post.category)}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
              </Link>
            </PopIn>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
