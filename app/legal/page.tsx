import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Legal & Tax-Exempt Status - STEM Sprouts",
  description: "STEM Sprouts' fiscal sponsorship and tax-exempt status through The Hack Foundation.",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function LegalTaxExemptStatusPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <PageHeader
        title="Legal & Tax-Exempt"
        highlight="Status"
        description="How STEM Sprouts is structured as a fiscally sponsored nonprofit project."
      />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-8 md:p-12 space-y-10">
          <Section title="Fiscal Sponsorship Disclaimer">
            <p>
              STEM Sprouts is not itself a separately incorporated 501(c)(3) organization. Instead, STEM Sprouts
              operates as a fiscally sponsored project of{" "}
              <span className="font-bold text-black dark:text-white">The Hack Foundation</span>, doing business as{" "}
              <span className="font-bold text-black dark:text-white">Hack Club</span>, a 501(c)(3) public charity
              (EIN 81-2908499), since December 31, 2025.
            </p>
            <p>
              Under this arrangement, The Hack Foundation has established a restricted fund to receive and hold
              donations and other funds on behalf of STEM Sprouts, and provides financial and administrative
              oversight of those funds. Donations made to support STEM Sprouts are made to The Hack Foundation and
              are tax-deductible to the extent allowed by law.
            </p>
          </Section>

          <Section title="What This Means">
            <ul className="list-disc pl-6 space-y-1">
              <li>STEM Sprouts is a project, not a separate legal entity or a subsidiary corporation.</li>
              <li>The Hack Foundation holds legal and fiduciary responsibility for funds raised on our behalf.</li>
              <li>Donations are processed and receipted through The Hack Foundation.</li>
              <li>The Hack Foundation's 501(c)(3) status extends the tax-exempt benefit to contributions made to STEM Sprouts.</li>
            </ul>
          </Section>

          <Section title="Our Fiscal Sponsor">
            <p className="font-bold text-black dark:text-white">The Hack Foundation (d.b.a. Hack Club)</p>
            <p>501(c)(3) public charity &middot; EIN 81-2908499</p>
            <p>8605 Santa Monica Boulevard #86294, West Hollywood, CA 90069</p>
            <p>
              Email:{" "}
              <a href="mailto:hcb@hackclub.com" className="text-[#15803d] dark:text-[#22C55E] font-bold underline">
                hcb@hackclub.com
              </a>
            </p>
          </Section>

          <Section title="Questions">
            <p>
              If you have questions about our fiscal sponsorship arrangement or need documentation for donation or
              grant purposes, please contact us:
            </p>
            <p>
              Email:{" "}
              <a href="mailto:hello@stem-sprouts.org" className="text-[#15803d] dark:text-[#22C55E] font-bold underline">
                hello@stem-sprouts.org
              </a>
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
