import { describe, it, expect } from "vitest"
import { findMarkdownPage, renderMarkdownPage, renderNotFoundMarkdown } from "./markdown-pages"

describe("findMarkdownPage", () => {
  it("finds the homepage for both '/' and ''", () => {
    expect(findMarkdownPage("/")?.title).toBe("STEM Sprouts")
    expect(findMarkdownPage("")?.title).toBe("STEM Sprouts")
  })

  it("finds a known static page", () => {
    expect(findMarkdownPage("/about")?.title).toBe("About - STEM Sprouts")
  })

  it("ignores a trailing slash", () => {
    expect(findMarkdownPage("/about/")?.title).toBe("About - STEM Sprouts")
  })

  it("returns null for an unknown path", () => {
    expect(findMarkdownPage("/this-page-does-not-exist")).toBeNull()
  })
})

describe("renderMarkdownPage", () => {
  it("renders an H1 title followed by the body", () => {
    const rendered = renderMarkdownPage({ path: "/x", title: "Title", body: "Body text" })
    expect(rendered).toBe("# Title\n\nBody text\n")
  })
})

describe("renderNotFoundMarkdown", () => {
  it("includes the requested path and recovery links", () => {
    const md = renderNotFoundMarkdown("/nope")
    expect(md).toContain("/nope")
    expect(md).toContain("sitemap.xml")
    expect(md).toContain("llms.txt")
  })
})
