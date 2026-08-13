const WORDS_PER_MINUTE = 200

/**
 * Estimates reading time from HTML (or plain text) content by stripping
 * markup and counting words, matching the ~200 wpm convention most
 * publishers use.
 */
export function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, " ")
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}
