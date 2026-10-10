import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArticleShareRow } from "@/components/article-share-row"
import { supabasePublic } from "@/lib/supabase-public"
import { formatCategory } from "@/lib/format-category"
import { POST_CONTENT_CLASSES } from "@/lib/post-content-classes"
import { toDisplayHtml } from "@/lib/render-post-content"
import { estimateReadingTime } from "@/lib/reading-time"
import Link from "next/link"
import { absoluteUrl, breadcrumbJsonLd, DEFAULT_OG_IMAGE, jsonLdScript } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

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

  const title = post.title
  const canonical = `/news/${slug}`
  const image = post.image_url ?? DEFAULT_OG_IMAGE.url
  return {
    title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      url: absoluteUrl(canonical),
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: [post.author ?? "STEM Sprouts"],
      section: post.category ?? "News",
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [image],
    },
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const readingTime = estimateReadingTime(post.content)
  const articleUrl = absoluteUrl(`/news/${slug}`)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    articleSection: post.category,
    author: { "@type": "Person", name: post.author ?? "STEM Sprouts" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: [absoluteUrl(post.image_url ?? DEFAULT_OG_IMAGE.url)],
    wordCount: post.content ? post.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: post.title, path: `/news/${slug}` },
  ])

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }} />
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.category !== "news" && (
              <span className="inline-block bg-[#22C55E] text-black text-xs font-bold px-3 py-1 rounded-full">
                {formatCategory(post.category)}
              </span>
            )}
            <time dateTime={post.published_at} className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-sm text-gray-500 dark:text-gray-400">&middot; {readingTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <p className="text-gray-500 dark:text-gray-400">By {post.author}</p>
            <ArticleShareRow url={articleUrl} title={post.title} />
          </div>
          {post.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image_url}
              alt={`${post.title} — STEM Sprouts`}
              className="w-full max-h-[28rem] object-cover rounded-2xl border-[3px] border-black dark:border-white mb-10"
            />
          )}
          <div
            className={`text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg ${POST_CONTENT_CLASSES}`}
            dangerouslySetInnerHTML={{ __html: toDisplayHtml(post.content) }}
          />

          <aside
            aria-labelledby="article-cta-heading"
            className="mt-16 bg-[#22C55E] border-4 border-black dark:border-white rounded-3xl p-8 md:p-10"
          >
            <h2 id="article-cta-heading" className="text-2xl md:text-3xl font-bold text-black mb-3">
              Interested in leading a STEM Sprouts chapter?
            </h2>
            <p className="text-black/80 mb-6 leading-relaxed">
              STEM Sprouts is a student-led nonprofit. High school students can start and lead chapters that bring free,
              hands-on STEM education to elementary school students.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 font-bold text-black">
              <Link href="/chapter-leadership" className="underline">
                Explore Chapter Leadership →
              </Link>
              <Link href="/locations" className="underline">
                Find a STEM Sprouts chapter
              </Link>
              <Link href="/chapters" className="underline">
                How STEM Sprouts chapters work
              </Link>
            </div>
          </aside>
        </article>
      </section>
      <Footer />
    </main>
  )
}
