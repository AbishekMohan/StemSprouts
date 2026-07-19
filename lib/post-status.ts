import type { AdminRole } from "@/lib/auth"

export type PostStatus = "draft" | "pending" | "published"

/**
 * Chapter leads can only ever save a post as draft or pending review — they
 * can never flip a post to "published" themselves, no matter what the
 * request body says. Only a main admin (via the form, or the approve
 * action) can move a post to published.
 */
export function resolvePostWrite(
  role: AdminRole,
  requestedStatus: unknown,
  existingPublishedAt: string | null | undefined,
): { status: PostStatus; publishedAt: string | null } {
  if (role === "main_admin") {
    const status: PostStatus =
      requestedStatus === "published" || requestedStatus === "pending" ? requestedStatus : "draft"
    return {
      status,
      publishedAt: status === "published" ? existingPublishedAt ?? new Date().toISOString() : null,
    }
  }

  const status: PostStatus = requestedStatus === "pending" ? "pending" : "draft"
  return { status, publishedAt: null }
}
