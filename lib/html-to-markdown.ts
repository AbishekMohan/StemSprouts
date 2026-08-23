import TurndownService from "turndown"
import { JSDOM } from "jsdom"

// Turndown needs a DOM implementation to walk. This module is server-only
// (used from the /__markdown route handler, which runs in the Node.js
// runtime) - jsdom is never bundled into client code.
const turndownService = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" })

/**
 * Converts a trusted HTML string (our own post content, already normalized
 * by toDisplayHtml) into Markdown for agents requesting text/markdown.
 */
export function htmlToMarkdown(html: string): string {
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`)
  return turndownService.turndown(dom.window.document.body).trim()
}
