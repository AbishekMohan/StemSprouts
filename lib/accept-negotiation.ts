/**
 * Minimal RFC 9110-style Accept header negotiation, scoped to deciding
 * between `text/markdown` and `text/html` per the acceptmarkdown.com
 * protocol (https://acceptmarkdown.com): a client that lists text/markdown
 * with a q-value at or above text/html's should receive the markdown
 * representation.
 */

interface AcceptEntry {
  type: string
  subtype: string
  q: number
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [mediaType, ...params] = part.split(";").map((p) => p.trim())
      const [type, subtype] = mediaType.split("/")
      let q = 1
      for (const param of params) {
        const [key, value] = param.split("=").map((s) => s.trim())
        if (key === "q") {
          const parsed = Number.parseFloat(value)
          if (!Number.isNaN(parsed)) q = parsed
        }
      }
      return { type: type || "*", subtype: subtype || "*", q }
    })
}

/**
 * Returns the q-value a parsed Accept header assigns to a concrete
 * "type/subtype", honoring exact matches over "type/*" over "*\/*"
 * (most-specific match wins, matching RFC 9110 §12.5.1).
 */
function qFor(entries: AcceptEntry[], type: string, subtype: string): number {
  let best: number | null = null
  let bestSpecificity = -1
  for (const entry of entries) {
    let specificity = -1
    if (entry.type === type && entry.subtype === subtype) specificity = 2
    else if (entry.type === type && entry.subtype === "*") specificity = 1
    else if (entry.type === "*" && entry.subtype === "*") specificity = 0
    if (specificity > bestSpecificity) {
      bestSpecificity = specificity
      best = entry.q
    }
  }
  return best ?? 0
}

/**
 * Whether an explicit "text/markdown" entry (not just a wildcard match) is
 * present in the Accept header.
 */
function explicitlyListsMarkdown(entries: AcceptEntry[]): boolean {
  return entries.some((e) => e.type === "text" && e.subtype === "markdown")
}

/**
 * Decides whether a request prefers text/markdown over text/html.
 *
 * - No Accept header, or Accept that doesn't mention markdown -> false (serve HTML, the safe default for browsers).
 * - text/markdown explicitly excluded (q=0) -> false.
 * - text/markdown's q-value is >= text/html's (with markdown listed explicitly) -> true.
 */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false

  const entries = parseAccept(acceptHeader)
  if (!explicitlyListsMarkdown(entries)) return false

  const qMarkdown = qFor(entries, "text", "markdown")
  if (qMarkdown <= 0) return false

  const qHtml = qFor(entries, "text", "html")
  return qMarkdown >= qHtml
}
