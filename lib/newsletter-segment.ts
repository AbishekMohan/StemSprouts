import type { Resend } from "resend"

const SEGMENT_NAME = "STEM Sprouts News"

/**
 * Finds (or creates, the first time) the Resend segment that backs the
 * newsletter, so we don't need a separate env var for its ID.
 */
export async function getOrCreateNewsletterSegmentId(resend: Resend): Promise<string | null> {
  const { data: list, error: listError } = await resend.segments.list()
  if (listError) {
    console.error("Failed to list Resend segments:", listError)
    return null
  }

  const existing = list?.data.find((segment) => segment.name === SEGMENT_NAME)
  if (existing) return existing.id

  const { data: created, error: createError } = await resend.segments.create({ name: SEGMENT_NAME })
  if (createError || !created) {
    console.error("Failed to create Resend segment:", createError)
    return null
  }
  return created.id
}
