import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { supabasePublic } from "@/lib/supabase-public"

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/news", priority: 0.9, changeFrequency: "daily" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pinboard", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
]

async function getPublishedPosts() {
  const { data, error } = await supabasePublic
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.published_at ?? Date.now()),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticEntries, ...postEntries]
}
