import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { GUIDES } from "@/lib/guides"
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "STEM Guides for Students & Chapter Leaders | STEM Sprouts",
  description:
    "Practical guides from STEM Sprouts on starting a student-led STEM chapter and teaching STEM to elementary school students.",
  path: "/guides",
})

export default function GuidesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "Guides", path: "/guides" },
            ]),
          ),
        }}
      />
      <PageHeader
        title="STEM"
        highlight="Guides"
        description="Practical, free guides for high school students who want to start a chapter and teach STEM to younger students."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <ul className="max-w-4xl mx-auto grid gap-6 list-none">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-[24px] p-6 md:p-8 hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] transition-shadow"
              >
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-black dark:text-white">{guide.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{guide.description}</p>
                <span className="inline-flex items-center gap-2 font-bold text-[#15803d] dark:text-[#22C55E]">
                  Read the guide
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
