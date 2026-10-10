export const CHAPTER_APPLICATION_URL = "https://chapters.stem-sprouts.org"
export const DONATE_URL = "https://hcb.hackclub.com/donations/start/stem-sprouts"

export type NavItem = { label: string; href: string; external?: boolean }
export type NavEntry = { label: string; href: string } | { label: string; items: NavItem[] }

/**
 * Primary navigation. Every pre-existing page keeps its URL; this only
 * regroups them. Policy Fellowship is a student program (not a legal page), so
 * it lives under Programs and Get Involved; legal/privacy are the
 * "Policy / Transparency" entries under About.
 */
export const NAV_ENTRIES: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Locations", href: "/locations" },
      { label: "Policy / Transparency", href: "/legal" },
    ],
  },
  {
    label: "Programs",
    items: [
      { label: "STEM Sprouts Chapters", href: "/chapters" },
      { label: "Pinboard", href: "/pinboard" },
      { label: "Policy Fellowship & Research", href: "/policy-fellowship" },
    ],
  },
  {
    label: "Chapters",
    items: [
      { label: "Chapters Overview", href: "/chapters" },
      { label: "Find a Chapter", href: "/locations" },
      { label: "Start a Chapter", href: CHAPTER_APPLICATION_URL, external: true },
      { label: "Chapter Leadership", href: "/chapter-leadership" },
      { label: "Chapter Resources", href: "/resources" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  {
    label: "Get Involved",
    items: [
      { label: "Student Leadership", href: "/chapter-leadership" },
      { label: "Join the Team", href: "/about#open-roles" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Policy Fellowship", href: "/policy-fellowship" },
    ],
  },
  { label: "Contact", href: "/#contact" },
]
