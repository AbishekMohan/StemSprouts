export type GuideSection = { heading: string; body: string[]; items?: string[] }

export type Guide = {
  slug: string
  title: string
  seoTitle: string
  description: string
  intro: string
  datePublished: string
  sections: GuideSection[]
  related: { label: string; href: string }[]
}

/**
 * Evergreen guides. They answer questions a student, parent, or educator would
 * actually ask, and only state STEM Sprouts-specific facts that are already
 * published elsewhere on the site (application form, Chapter Starter Guide,
 * Pinboard, curriculum folder). Everything else is general practical advice.
 */
export const GUIDES: Guide[] = [
  {
    slug: "how-to-start-a-student-led-stem-chapter",
    title: "How to Start a Student-Led STEM Chapter",
    seoTitle: "How to Start a Student-Led STEM Chapter | STEM Sprouts Guide",
    description:
      "A practical guide for high school students who want to start a STEM club or chapter: choose a home, build a team, find a space, plan a first session, and apply to STEM Sprouts.",
    intro:
      "Starting a STEM chapter is mostly about people and logistics, not equipment. This guide walks through the steps high school students take to go from an idea to a first session with younger students.",
    datePublished: "2026-10-10",
    sections: [
      {
        heading: "1. Decide where your chapter will live",
        body: [
          "A chapter needs a home base. STEM Sprouts chapters exist at schools, such as Alpharetta High School and Osborne High School, and in cities or regions, such as Tampa, Dubai, and Odisha. Pick the setting where you already have access to students and a place to meet.",
          "If you are not sure whether a chapter already exists near you, check the STEM Sprouts locations page first. Joining or supporting an existing chapter is a good way to learn before you lead.",
        ],
      },
      {
        heading: "2. Gather a small team",
        body: [
          "You do not need a large group to begin. The STEM Sprouts chapter application simply asks roughly how many students you think would be interested, with options from 5-10 up to 50+. A handful of reliable friends who can help teach and set up is enough to get going.",
        ],
        items: [
          "Split simple roles: someone to plan activities, someone to handle scheduling and supplies, someone to talk to the host school or library.",
          "Agree on how often you will meet and how you will communicate.",
        ],
      },
      {
        heading: "3. Find a space and a partner",
        body: [
          "Elementary school students need a safe, supervised place to learn. Schools, libraries, and community organizations are the usual partners. Approach them with a short, specific ask: who you are, what you want to run, how many students, and how often.",
          "Plan for adult supervision from the start. STEM Sprouts notes that its curriculum materials are designed for supervised, live learning and that adult guidance is recommended for all activities.",
        ],
      },
      {
        heading: "4. Plan your first session",
        body: [
          "Keep the first session small, hands-on, and forgiving. STEM Sprouts shares lesson plans and activities from its previous workshops in its curriculum folder, and Pinboard lets students build and test virtual Arduino and Raspberry Pi circuits in a browser with no hardware required.",
        ],
        items: [
          "Choose one activity and run through it yourselves before the session.",
          "Prepare for things to go wrong: spare supplies, a simpler backup activity, and a plan if the internet is unreliable.",
          "Decide how you will tell whether the session went well, such as a quick show of hands or a short feedback question.",
        ],
      },
      {
        heading: "5. Apply to start a STEM Sprouts chapter",
        body: [
          "When you are ready, fill out the short chapter application. It asks for your name, email, school, city and country, what interests you about starting a chapter, and the number of students you expect. After you submit, STEM Sprouts emails you its Chapter Starter Guide with what you need to launch.",
        ],
      },
      {
        heading: "6. Run, reflect, and keep going",
        body: [
          "After each session, note what worked and what did not, and adjust. Stay in touch with the STEM Sprouts team at hello@stem-sprouts.org, and share what your chapter is doing so others can learn from it.",
        ],
      },
    ],
    related: [
      { label: "Explore Chapter Leadership", href: "/chapter-leadership" },
      { label: "Find a STEM Sprouts chapter", href: "/locations" },
      { label: "Browse free STEM curriculum", href: "/resources#curriculum" },
    ],
  },
  {
    slug: "how-high-school-students-can-teach-stem-to-elementary-students",
    title: "How High School Students Can Teach STEM to Elementary Students",
    seoTitle: "How High School Students Can Teach STEM to Elementary Students | STEM Sprouts",
    description:
      "Practical tips for high school students leading hands-on STEM lessons for elementary school students: keep it hands-on, use simple language, plan for safety, and adapt to the tools you have.",
    intro:
      "Teaching younger students is a skill, and it is very learnable. These tips are for high school students running STEM workshops, whether you are part of a STEM Sprouts chapter or starting your own.",
    datePublished: "2026-10-10",
    sections: [
      {
        heading: "Start with something students can touch or build",
        body: [
          "Elementary students learn fastest by doing. Open with a hands-on challenge, such as building a simple circuit, a paper structure, or a small program, rather than a long explanation. Introduce the concept after they have tried it.",
        ],
      },
      {
        heading: "Use short steps and plain words",
        body: [
          "Give one instruction at a time and show it as well as saying it. Replace jargon with everyday words, and introduce one new term at a time. Check understanding by asking a student to explain the step back to you.",
        ],
      },
      {
        heading: "Work in small groups",
        body: [
          "Groups of two to four keep everyone involved and let you circulate. Give each group member a job, such as builder, tester, or reporter, and rotate roles so every student gets to handle the activity.",
        ],
      },
      {
        heading: "Plan for safety and supervision",
        body: [
          "Keep an adult in the room, choose age-appropriate materials, and set clear rules for tools and supplies before you start. STEM Sprouts recommends adult guidance for all of its curriculum activities.",
        ],
      },
      {
        heading: "Adapt to the tools you actually have",
        body: [
          "Good lessons fit their setting. Pinboard lets students practice Arduino and Raspberry Pi circuits virtually, which helps when physical kits are limited. The STEM Sprouts chapter in Siaya, Kenya, builds its programs offline-first because many rural schools lack reliable power and internet, a reminder to always have a plan that works without them.",
        ],
        items: [
          "Test every activity beforehand with the same equipment you will use.",
          "Bring a simpler backup activity.",
          "Reuse and adapt lesson plans from previous sessions instead of starting from scratch.",
        ],
      },
      {
        heading: "Make mistakes part of the lesson",
        body: [
          "When a circuit does not light up or a program does not run, treat it as the interesting part. Ask students what they think went wrong and let them troubleshoot. Celebrating persistence builds the confidence that keeps younger students interested in STEM.",
        ],
      },
    ],
    related: [
      { label: "Explore Chapter Leadership", href: "/chapter-leadership" },
      { label: "Browse free STEM activities and tools", href: "/resources#tools" },
      { label: "Try Pinboard", href: "/pinboard" },
    ],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug)
}
