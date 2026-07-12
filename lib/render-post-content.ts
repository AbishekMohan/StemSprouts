/**
 * Posts written before the rich text editor shipped store plain text
 * (paragraphs separated by blank lines, no markup). Newer posts store real
 * HTML from the Tiptap editor. This normalizes either into safe HTML so a
 * single render path (and the RSS feed) works for both eras of content.
 */
export function toDisplayHtml(content: string): string {
  if (/<[a-z][\s\S]*>/i.test(content)) return content

  const escaped = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  return escaped
    .split(/\n{2,}/)
    .filter((paragraph) => paragraph.trim().length > 0)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("")
}
