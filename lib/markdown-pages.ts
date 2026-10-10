import { SITE_URL } from "@/lib/site"
import { SITE_DESCRIPTION } from "@/lib/seo"
import { GUIDES } from "@/lib/guides"

/**
 * Hand-maintained Markdown representations of the site's static pages,
 * served to agents that request `Accept: text/markdown` (see
 * app/__markdown/[[...slug]]/route.ts). Keep these in sync with the
 * corresponding page.tsx content when either changes.
 */

export interface MarkdownPage {
  /** Path as it appears in the URL, e.g. "/about". "" is the homepage. */
  path: string
  title: string
  body: string
}

const PAGES: MarkdownPage[] = [
  {
    path: "",
    title: "STEM Sprouts",
    body: `${SITE_DESCRIPTION} High school students can start and lead a chapter. Chapters run hands-on STEM programming for elementary school students from Georgia to Kenya to India, supported by Pinboard, our free open-source hardware coding platform.

## What we do

- **Chapters** - student-led STEM programs run at schools and in communities worldwide. See [Chapters](${SITE_URL}/chapters) and [Locations](${SITE_URL}/locations).
- **Chapter leadership** - high school students can start and lead a chapter. See [Chapter Leadership](${SITE_URL}/chapter-leadership).
- **Pinboard** - a free, open-source, browser-based block-coding platform for Arduino and Raspberry Pi. See [Pinboard](${SITE_URL}/pinboard).
- **Policy Fellowship** - a research fellowship pairing students with mentors to write policy papers on STEM education. See [Policy Fellowship](${SITE_URL}/policy-fellowship).

## STEM Sprouts Kenya

What began as a small pilot is now reaching students across rural Kenya: a 15-school cohort launch in Siaya County, a dedicated focus on girls in STEM, and lessons aligned to Kenya's Competency-Based Curriculum.

## Get involved

- Lead a chapter: [Chapter Leadership](${SITE_URL}/chapter-leadership)
- Start a chapter (application): https://chapters.stem-sprouts.org
- Partner or sponsor: [Partner](${SITE_URL}/partner)
- Donate: https://hcb.hackclub.com/donations/start/stem-sprouts
- Contact: hello@stem-sprouts.org

See [llms.txt](${SITE_URL}/llms.txt) for full guidance on when to point an agent or user at STEM Sprouts.`,
  },
  {
    path: "/about",
    title: "About - STEM Sprouts",
    body: `${SITE_DESCRIPTION} High school students start and lead the chapters, and the chapters teach elementary school students.

## Mission

STEM Sprouts exists to spark curiosity and build confidence in young learners by making STEM (Science, Technology, Engineering, and Math) fun, creative, and accessible through interactive workshops, real-world challenges, and beginner-friendly coding projects.

## Vision

Every child deserves a joyful, hands-on introduction to STEM, no matter their background or experience.

## Team

- **Harshit Chaturvedy** - Founder & Executive
- **Lokesh Yarlagadda** - Vice-President of Operations
- **Saisohan Panda** - Vice-President of Policy
- **Abishek Mohan** - Website Developer
- **Hridhun Regupathi** - Head Grant Writer
- **Tanishi Srivastava** - Head of Social Media Strategy

## Open roles

- Pinboard Developer
- Social Media Ambassador

Interested in joining? Email hello@stem-sprouts.org.`,
  },
  {
    path: "/chapters",
    title: "Chapters - STEM Sprouts",
    body: `STEM Sprouts chapters are student-run groups that teach free, hands-on STEM to elementary school students. You can join an existing chapter or start and lead one.

## How a chapter works

1. Student leaders - high school students start and lead a chapter at their school or in their community.
2. Chapters - each chapter organizes its own team, partners, and schedule.
3. STEM programs - chapters run free, hands-on STEM workshops and activities.
4. Younger learners - elementary school students get an approachable first experience with STEM.

- Find a chapter: [Locations](${SITE_URL}/locations)
- Lead a chapter: [Chapter Leadership](${SITE_URL}/chapter-leadership)
- Start a chapter (application): https://chapters.stem-sprouts.org`,
  },
  {
    path: "/chapter-leadership",
    title: "High School STEM Leadership Opportunities - STEM Sprouts",
    body: `High school students can start and lead STEM Sprouts chapters in their schools or communities, bringing free, hands-on STEM education to elementary school students.

## What a Chapter Lead does

- Plan STEM workshops
- Recruit and coordinate volunteers
- Work with schools, libraries, and community partners
- Organize outreach events
- Adapt or develop activities
- Manage chapter logistics
- Communicate with STEM Sprouts
- Help expand access to STEM education

## Example

Moses Okoth leads the Siaya and Kisumu chapter in Kenya, handling school recruitment, partnership logistics, curriculum design, budgets, teacher training, and equipment troubleshooting. Read the story: ${SITE_URL}/news/stem-access-inside-the-siaya-chapter

## Who can apply

Students can apply to start a chapter at their school or in their city, anywhere in the world. The application asks for name, email, school, city and country, interest in starting a chapter, and the number of students likely to join. Questions: hello@stem-sprouts.org.

## What STEM Sprouts provides

- A Chapter Starter Guide, emailed after you apply
- Pinboard, free for every chapter
- Free learning resources: ${SITE_URL}/resources
- A worldwide network of chapters

Apply: https://chapters.stem-sprouts.org`,
  },
  {
    path: "/programs",
    title: "Programs - STEM Sprouts",
    body: `Free, hands-on STEM education for elementary school students, led by students, plus the open-source tools and research that support it.

## STEM Sprouts chapter workshops

Our core education model: student-run chapters teach free, hands-on STEM to elementary school students. See [Chapters](${SITE_URL}/chapters) and [Chapter Leadership](${SITE_URL}/chapter-leadership).

## Pinboard

A separate, free, open-source browser-based block-coding platform for Arduino and Raspberry Pi, built by students. See [Pinboard](${SITE_URL}/pinboard).

## Research and community programs

The [Policy Fellowship](${SITE_URL}/policy-fellowship), a research program with the National Student Research Institute, and a partnership with the UN Major Group for Children and Youth.`,
  },
  {
    path: "/guides",
    title: "STEM Guides - STEM Sprouts",
    body: `Practical, free guides for high school students who want to start a chapter and teach STEM to younger students.

${GUIDES.map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`).join("\n")}`,
  },
  ...GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    title: g.title,
    body: `${g.intro}\n\n${g.sections
      .map((sec) => `## ${sec.heading}\n\n${sec.body.join("\n\n")}${sec.items ? "\n\n" + sec.items.map((i) => `- ${i}`).join("\n") : ""}`)
      .join("\n\n")}`,
  })),
  {
    path: "/locations",
    title: "Locations - STEM Sprouts",
    body: `STEM Sprouts chapters around the world: from Georgia to Kenya to India, and growing. Chapters are run by students, for students, wherever they are.

Current chapters include Forsyth County, GA (founding chapter), Alpharetta High School, Osborne High School, Dublin OH, Fremont CA, Tampa FL, St. Louis, MO, New Jersey, West Bengal (India), Odisha (India), Gopalganj (Bangladesh), Siaya STEAM Hub (Kenya), and Dubai (UAE).

Don't see your city? Apply to start a chapter at your school or in your city, anywhere in the world, at https://chapters.stem-sprouts.org.`,
  },
  {
    path: "/pinboard",
    title: "Pinboard - STEM Sprouts",
    body: `A free, open-source block-coding platform for Arduino and Raspberry Pi. Build real hardware projects, simulate them live in your browser, and learn through guided lessons.

## Features

- **Live Hardware Simulation** - place real components (LEDs, buttons, potentiometers, servos, buzzers) on a virtual board and watch them respond exactly like the real thing. No physical hardware required.
- **Blocks that generate real code** - drag-and-drop blocks generate actual Arduino C code in real time; click any block to trace which lines it produced.
- **Guided lessons, open source** - built and maintained by students, with step-by-step guided lessons and free cloud project sync. Fully open source on GitHub.

Launch Pinboard: https://pinboard.stem-sprouts.org
Source code: https://github.com/STEM-Sprouts/pinboard`,
  },
  {
    path: "/policy-fellowship",
    title: "Policy Fellowship - STEM Sprouts",
    body: `The STEM Sprouts Policy Fellowship pairs students with mentors to research, write, and publish policy papers that reach real decision-makers, on issues in STEM education and emerging technology.

## What fellows get

- A dedicated mentor for the whole process
- Structured peer and Editorial Board review
- Support toward publication, at no cost to the fellow
- A platform to present findings at events like the STEM Summit
- Papers routed to school districts, legislative offices, and stakeholder groups
- A Policy Fellow title and a cohort community

## How it works

1. Apply & propose a topic
2. Get matched with a mentor
3. Research & draft (problem, evidence, stakeholders, recommendations)
4. Peer & Editorial Review
5. Publish & present
6. Track impact

Apply on the page itself: ${SITE_URL}/policy-fellowship`,
  },
  {
    path: "/partner",
    title: "Partner - STEM Sprouts",
    body: `Partner with STEM Sprouts to make STEM education free and accessible to every child.

## Sponsorship benefits

- Brand recognition on the website, chapter materials, and social media
- Tax benefits (contributions are tax-deductible via our 501(c)(3) fiscal sponsor)
- Direct global impact funding Pinboard development, chapter resources, and STEM kits

## Ways to support

- Financial sponsorship
- In-kind donations (STEM kits, robotics hardware, host space)
- Mentorship & speaking

Donate directly: https://hcb.hackclub.com/donations/start/stem-sprouts
Download the partnership guide: ${SITE_URL}/stem/STEM_Sprouts_Partnership_Guide.pdf
Contact: hello@stem-sprouts.org`,
  },
  {
    path: "/resources",
    title: "Resources - STEM Sprouts",
    body: `Explore platforms and tools to continue your STEM journey at home.

## Learning platforms

- Tynker - coding through games and puzzles
- Scratch - MIT's visual programming language
- Khan Academy Kids - math, science, reading
- Blockly Games - programming concepts through puzzles
- NASA Kids - space science content
- Cool Math Games - math puzzles and logic games

## STEM tools

- Pinboard - our own open-source virtual circuit builder (${SITE_URL}/pinboard)
- PhET Simulations - interactive physics/chemistry/biology sims
- Tinkercad - free 3D design and 3D printing
- Codecademy - interactive coding lessons`,
  },
  {
    path: "/news",
    title: "News - STEM Sprouts",
    body: `Updates, announcements, and research from STEM Sprouts. See the full list at ${SITE_URL}/news, or the RSS feed at ${SITE_URL}/news/feed.xml. Individual articles are available at ${SITE_URL}/news/<slug> and also negotiate Markdown via Accept: text/markdown.`,
  },
  {
    path: "/legal",
    title: "Legal & Tax-Exempt Status - STEM Sprouts",
    body: `STEM Sprouts is not itself a separately incorporated 501(c)(3) organization. It operates as a fiscally sponsored project of The Hack Foundation, doing business as Hack Club, a 501(c)(3) public charity (EIN 81-2908499), since December 31, 2025.

Donations made to support STEM Sprouts are made to The Hack Foundation and are tax-deductible to the extent allowed by law. The Hack Foundation holds legal and fiduciary responsibility for funds raised on STEM Sprouts' behalf.

STEM Sprouts Kenya is separately registered as a Community Based Organization (CBO) with the Kenyan Directorate of Social Development (Registration No. CC/SST/CBO/HC 1450, Siaya County).

Fiscal sponsor: The Hack Foundation (d.b.a. Hack Club), 8605 Santa Monica Boulevard #86294, West Hollywood, CA 90069. Email: hcb@hackclub.com

Questions: hello@stem-sprouts.org`,
  },
  {
    path: "/privacy",
    title: "Privacy Policy - STEM Sprouts",
    body: `How STEM Sprouts collects, uses, and protects your information. Read the full policy at ${SITE_URL}/privacy. Contact hello@stem-sprouts.org with privacy questions.`,
  },
]

export function findMarkdownPage(path: string): MarkdownPage | null {
  const normalized = path === "/" ? "" : path.replace(/\/+$/, "")
  return PAGES.find((p) => p.path === normalized) ?? null
}

export function renderMarkdownPage(page: MarkdownPage): string {
  return `# ${page.title}\n\n${page.body}\n`
}

export function renderNotFoundMarkdown(requestedPath: string): string {
  return `# 404 Not Found

The path \`${requestedPath}\` doesn't exist on STEM Sprouts.

## Where to look next

- [Homepage](${SITE_URL}/)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [llms.txt](${SITE_URL}/llms.txt) - site guide for agents
- [News](${SITE_URL}/news)
- [Locations](${SITE_URL}/locations)

If you followed a broken link here, contact hello@stem-sprouts.org.
`
}
