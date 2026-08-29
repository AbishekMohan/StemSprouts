import { NextRequest } from "next/server"
import { supabasePublic } from "@/lib/supabase-public"
import { toDisplayHtml } from "@/lib/render-post-content"
import { htmlToMarkdown } from "@/lib/html-to-markdown"
import { findMarkdownPage, renderMarkdownPage, renderNotFoundMarkdown } from "@/lib/markdown-pages"
import { formatCategory } from "@/lib/format-category"
import { SITE_URL } from "@/lib/site"

// Route Handlers run in the Node.js runtime by default (unlike middleware),
// so htmlToMarkdown's jsdom/turndown usage is safe here.

const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept, Accept-Encoding",
}

async function getPost(slug: string) {
  const { data } = await supabasePublic.from("posts").select("*").eq("slug", slug).eq("published", true).single()
  return data
}

async function getPostList() {
  const { data } = await supabasePublic
    .from("posts")
    .select("slug, title, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(50)
  return data ?? []
}

function articleMarkdown(post: {
  title: string
  excerpt: string | null
  content: string
  author: string
  category: string
  published_at: string
  slug: string
}): string {
  const date = new Date(post.published_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const body = htmlToMarkdown(toDisplayHtml(post.content))
  return `# ${post.title}

${post.category !== "news" ? `Category: ${formatCategory(post.category)}\n` : ""}By ${post.author} - ${date}

${post.excerpt ? `> ${post.excerpt}\n` : ""}
${body}
`
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const parts = slug ?? []
  const pathname = "/" + parts.join("/")

  // /news/<slug> - fetch and convert a real article.
  if (parts.length === 2 && parts[0] === "news") {
    const post = await getPost(parts[1])
    if (!post) {
      return new Response(renderNotFoundMarkdown(pathname), { status: 404, headers: MARKDOWN_HEADERS })
    }
    return new Response(articleMarkdown(post), { status: 200, headers: MARKDOWN_HEADERS })
  }

  // /news - list published posts.
  if (parts.length === 1 && parts[0] === "news") {
    const posts = await getPostList()
    const list = posts.map((p) => `- [${p.title}](${SITE_URL}/news/${p.slug})${p.excerpt ? ` - ${p.excerpt}` : ""}`).join("\n")
    const body = `# News - STEM Sprouts\n\nUpdates, announcements, and research from STEM Sprouts.\n\n${list || "No published articles yet."}\n`
    return new Response(body, { status: 200, headers: MARKDOWN_HEADERS })
  }

  const page = findMarkdownPage(pathname)
  if (page) {
    return new Response(renderMarkdownPage(page), { status: 200, headers: MARKDOWN_HEADERS })
  }

  return new Response(renderNotFoundMarkdown(pathname), { status: 404, headers: MARKDOWN_HEADERS })
}
