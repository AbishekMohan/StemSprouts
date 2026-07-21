import { NextRequest, NextResponse } from "next/server"
import { getResendClient } from "@/lib/resend"
import { getOrCreateNewsletterSegmentId } from "@/lib/newsletter-segment"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })
  }

  const resend = getResendClient()
  if (!resend) {
    return NextResponse.json({ error: "Newsletter signup isn't set up yet, check back soon" }, { status: 503 })
  }

  const segmentId = await getOrCreateNewsletterSegmentId(resend)
  if (!segmentId) {
    return NextResponse.json({ error: "Something went wrong, try again later" }, { status: 500 })
  }

  const { error } = await resend.contacts.create({ email, segments: [{ id: segmentId }] })

  // Resend errors on a duplicate contact -- that just means they're already subscribed.
  if (error && !/already exists|duplicate/i.test(error.message ?? "")) {
    console.error("Failed to create Resend contact:", error)
    return NextResponse.json({ error: "Something went wrong, try again later" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
