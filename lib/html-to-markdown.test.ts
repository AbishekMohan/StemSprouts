import { describe, it, expect } from "vitest"
import { htmlToMarkdown } from "./html-to-markdown"

describe("htmlToMarkdown", () => {
  it("converts paragraphs", () => {
    expect(htmlToMarkdown("<p>Hello world</p>")).toBe("Hello world")
  })

  it("converts headings", () => {
    expect(htmlToMarkdown("<h2>A heading</h2>")).toBe("## A heading")
  })

  it("converts links", () => {
    expect(htmlToMarkdown('<a href="https://example.com">a link</a>')).toBe("[a link](https://example.com)")
  })

  it("converts bold and italic", () => {
    expect(htmlToMarkdown("<strong>bold</strong> and <em>italic</em>")).toBe("**bold** and _italic_")
  })

  it("converts unordered lists", () => {
    const md = htmlToMarkdown("<ul><li>one</li><li>two</li></ul>")
    expect(md).toMatch(/^-\s+one$/m)
    expect(md).toMatch(/^-\s+two$/m)
  })

  it("converts multiple paragraphs with a blank line between them", () => {
    const md = htmlToMarkdown("<p>First</p><p>Second</p>")
    expect(md).toBe("First\n\nSecond")
  })
})
