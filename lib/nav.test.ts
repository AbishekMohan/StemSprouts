import { existsSync } from "node:fs"
import { describe, expect, it, vi } from "vitest"
import { NAV_ENTRIES } from "./nav"
import { SITE_DESCRIPTION, breadcrumbJsonLd, pageMetadata } from "./seo"
import sitemap from "../app/sitemap"

vi.mock("@/lib/supabase-public", () => ({
  supabasePublic: {
    from: () => ({
      select: () => ({ eq: () => ({ order: async () => ({ data: [{ slug: "example-post", updated_at: null, published_at: null }], error: null }) }) }),
    }),
  },
}))

const internalPaths = NAV_ENTRIES.flatMap((entry) => ("items" in entry ? entry.items : [entry]))
  .filter((item) => item.href.startsWith("/"))
  .map((item) => item.href.split("#")[0] || "/")

describe("primary navigation", () => {
  it("has at most 8 primary concepts before Donate", () => {
    expect(NAV_ENTRIES.length).toBeLessThanOrEqual(8)
  })

  it("only links to routes that exist", () => {
    for (const path of new Set(internalPaths)) {
      const file = path === "/" ? "../app/page.tsx" : `../app${path}/page.tsx`
      expect(existsSync(new URL(file, import.meta.url)), path).toBe(true)
    }
  })

  it("keeps every pre-existing page reachable from the navbar", () => {
    const reachable = new Set(internalPaths)
    for (const path of ["/about", "/locations", "/partner", "/pinboard", "/policy-fellowship", "/resources", "/news", "/legal"]) {
      expect(reachable.has(path), path).toBe(true)
    }
  })
})

describe("pageMetadata", () => {
  it("returns a complete, page-specific metadata block without the title template", () => {
    const meta = pageMetadata({ title: "A | STEM Sprouts", description: "Desc", path: "/a" })
    expect(meta.title).toEqual({ absolute: "A | STEM Sprouts" })
    expect(meta.alternates?.canonical).toBe("/a")
    expect(meta.openGraph?.title).toBe("A | STEM Sprouts")
    expect(meta.openGraph?.url).toBe("/a")
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: "A | STEM Sprouts" })
  })
})

describe("organization description", () => {
  it("uses the single canonical sentence", () => {
    expect(SITE_DESCRIPTION).toBe(
      "STEM Sprouts is a student-led nonprofit providing free, hands-on STEM education to elementary school students through student-run chapters.",
    )
  })
})

describe("breadcrumbJsonLd", () => {
  it("numbers items from 1 and uses absolute URLs", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Chapters", path: "/chapters" },
    ])
    expect(crumbs.itemListElement[1]).toMatchObject({ position: 2, name: "Chapters", item: "https://stem-sprouts.org/chapters" })
  })
})

describe("sitemap", () => {
  it("includes the new chapter pages and has no duplicate URLs", async () => {
    const urls = (await sitemap()).map((entry) => entry.url)
    expect(urls).toContain("https://stem-sprouts.org/chapter-leadership")
    expect(urls).toContain("https://stem-sprouts.org/chapters")
    expect(urls).toContain("https://stem-sprouts.org/programs")
    expect(urls).toContain("https://stem-sprouts.org/guides/how-to-start-a-student-led-stem-chapter")
    expect(new Set(urls).size).toBe(urls.length)
  })
})
