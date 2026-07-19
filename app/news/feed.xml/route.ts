import { SITE_URL } from "@/lib/site"
import { supabasePublic } from "@/lib/supabase-public"
import { toDisplayHtml } from "@/lib/render-post-content"

export const revalidate = 60

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function cdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`
}

async function getPosts() {
  const { data, error } = await supabasePublic
    .from("posts")
    .select("slug, title, excerpt, content, author, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(30)

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export async function GET() {
  const posts = await getPosts()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/news/${post.slug}`
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString()
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author ?? "STEM Sprouts")}</author>
      <description>${cdata(post.excerpt ?? "")}</description>
      <content:encoded>${cdata(toDisplayHtml(post.content ?? ""))}</content:encoded>
    </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>STEM Sprouts News</title>
    <link>${SITE_URL}/news</link>
    <description>Updates, announcements, and research from STEM Sprouts chapters and partnerships.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/news/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
