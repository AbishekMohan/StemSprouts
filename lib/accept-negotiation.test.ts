import { describe, it, expect } from "vitest"
import { prefersMarkdown } from "./accept-negotiation"

describe("prefersMarkdown", () => {
  it("returns false when there is no Accept header", () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown(undefined)).toBe(false)
  })

  it("returns false for a plain browser Accept header", () => {
    expect(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(false)
  })

  it("returns true when Accept is exactly text/markdown", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true)
  })

  it("returns false when markdown is only implied by a wildcard", () => {
    expect(prefersMarkdown("*/*")).toBe(false)
    expect(prefersMarkdown("text/*")).toBe(false)
  })

  it("honors q-values: higher-q html wins over lower-q markdown", () => {
    expect(prefersMarkdown("text/markdown;q=0.5, text/html;q=0.9")).toBe(false)
  })

  it("honors q-values: higher-q markdown wins over lower-q html", () => {
    expect(prefersMarkdown("text/markdown;q=0.9, text/html;q=0.5")).toBe(true)
  })

  it("prefers markdown on a tie between explicit markdown and html", () => {
    expect(prefersMarkdown("text/markdown;q=0.8, text/html;q=0.8")).toBe(true)
  })

  it("returns false when markdown is explicitly excluded with q=0", () => {
    expect(prefersMarkdown("text/markdown;q=0, text/html")).toBe(false)
  })

  it("treats an explicit markdown entry as beating a wildcard fallback", () => {
    expect(prefersMarkdown("text/markdown, */*;q=0.1")).toBe(true)
  })
})
