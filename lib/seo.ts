import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"

export const SITE_NAME = "STEM Sprouts"
// One sentence, used verbatim everywhere the organization describes itself
// (metadata, JSON-LD, llms.txt, homepage) so search systems see a single entity.
export const SITE_DESCRIPTION =
  "STEM Sprouts is a student-led nonprofit providing free, hands-on STEM education to elementary school students through student-run chapters."
export const DEFAULT_OG_IMAGE = {
  url: "/stem/team-workshop.jpeg",
  width: 1600,
  height: 1200,
  alt: "STEM Sprouts students participating in a hands-on STEM workshop",
}

export const SITE_SOCIAL_PROFILES = [
  "https://www.instagram.com/stemsprouts_/",
  "https://www.linkedin.com/company/stemsprouts/",
  "https://www.tiktok.com/@stemsprouts",
  "https://www.facebook.com/share/16ywQJWuVR/?mibextid=wwXIfr",
]

/**
 * Per-page metadata. Next.js replaces (not merges) `openGraph`/`twitter` when a
 * page sets its own, so every indexable page goes through this helper to get a
 * complete, page-specific title, description, canonical, Open Graph and Twitter
 * block. `title` is used as-is (no "| STEM Sprouts" template is appended).
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  alternates,
}: {
  title: string
  description: string
  path: string
  image?: { url: string; width?: number; height?: number; alt: string }
  alternates?: Metadata["alternates"]
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, ...alternates },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STEM Sprouts | Student-Led STEM Nonprofit & Chapters",
    template: "%s | STEM Sprouts",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/stem/favicon.png",
    apple: "/stem/favicon.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/stem/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
  description: SITE_DESCRIPTION,
  email: "hello@stem-sprouts.org",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General inquiries",
    email: "hello@stem-sprouts.org",
  },
  address: {
    "@type": "PostalAddress",
    name: "Fiscal sponsor mailing address",
    streetAddress: "8605 Santa Monica Boulevard #86294",
    addressLocality: "West Hollywood",
    addressRegion: "CA",
    postalCode: "90069",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "STEM education",
    "student leadership",
    "elementary school STEM outreach",
    "Arduino",
    "Raspberry Pi",
    "coding education",
  ],
  sameAs: SITE_SOCIAL_PROFILES,
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
