import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { supabasePublic } from "@/lib/supabase-public"
import { formatCategory } from "@/lib/format-category"
import { POST_CONTENT_CLASSES } from "@/lib/post-content-classes"
import { toDisplayHtml } from "@/lib/render-post-content"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const { data } = await supabasePublic.from("posts").select("*").eq("slug", slug).eq("published", true).single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "News - STEM Sprouts" }
  return { title: `${post.title} - STEM Sprouts`, description: post.excerpt }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.category !== "news" && (
              <span className="inline-block bg-[#22C55E] text-black text-xs font-bold px-3 py-1 rounded-full">
                {formatCategory(post.category)}
              </span>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">By {post.author}</p>
          {post.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image_url}
              alt=""
              className="w-full max-h-[28rem] object-cover rounded-2xl border-[3px] border-black dark:border-white mb-10"
            />
          )}
          <div
            className={`text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg ${POST_CONTENT_CLASSES}`}
            dangerouslySetInnerHTML={{ __html: toDisplayHtml(post.content) }}
          />
        </article>
      </section>
      <Footer />
    </main>
  )
}
