import { getResendClient } from "@/lib/resend"
import { getOrCreateNewsletterSegmentId } from "@/lib/newsletter-segment"
import { SITE_URL } from "@/lib/site"

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "STEM Sprouts <no-reply@news.stem-sprouts.org>"

type NewsletterPost = {
  title: string
  excerpt: string
  slug: string
  image_url: string | null
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function buildEmailHtml(post: NewsletterPost): string {
  const url = `${SITE_URL}/news/${post.slug}`
  return `
<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;">
  <div style="text-align:center;padding:24px 0 8px;">
    <span style="display:inline-block;background:#22C55E;color:#000;font-weight:bold;padding:4px 10px;border-radius:6px;font-size:13px;">STEM Sprouts News</span>
  </div>
  ${post.image_url ? `<img src="${post.image_url}" alt="" style="width:100%;border-radius:16px;border:3px solid #000;display:block;margin:16px 0;" />` : ""}
  <h1 style="font-size:24px;line-height:1.3;margin:16px 0 8px;">${escapeHtml(post.title)}</h1>
  <p style="font-size:15px;line-height:1.6;color:#444;">${escapeHtml(post.excerpt)}</p>
  <a href="${url}" style="display:inline-block;background:#22C55E;color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:10px;border:2px solid #000;margin:16px 0;">Read the full story &rarr;</a>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0 16px;" />
  <p style="font-size:12px;color:#888;line-height:1.6;">
    You're getting this because you subscribed to STEM Sprouts News updates.<br />
    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#888;">Unsubscribe</a> &middot;
    <a href="${SITE_URL}" style="color:#888;">stem-sprouts.org</a>
  </p>
</div>`
}

/**
 * Emails everyone subscribed to the newsletter about a newly published post.
 * No-ops (with a console warning) if RESEND_API_KEY isn't configured, and
 * never throws, so it can't block a publish/approve action.
 */
export async function sendNewsletterForPost(post: NewsletterPost) {
  const resend = getResendClient()
  if (!resend) {
    console.warn(`Skipping newsletter send for "${post.title}" (RESEND_API_KEY not configured)`)
    return
  }

  try {
    const segmentId = await getOrCreateNewsletterSegmentId(resend)
    if (!segmentId) return

    const { error } = await resend.broadcasts.create({
      segmentId,
      from: FROM_EMAIL,
      subject: post.title,
      name: `New post: ${post.title}`,
      html: buildEmailHtml(post),
      send: true,
    })

    if (error) console.error(`Failed to send newsletter broadcast for "${post.title}":`, error)
  } catch (err) {
    console.error(`Newsletter send errored for "${post.title}":`, err)
  }
}
