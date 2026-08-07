import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy - STEM Sprouts",
  description: "How STEM Sprouts collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <PageHeader title="Privacy" highlight="Policy" description="Effective Date: January 1st, 2026" />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-8 md:p-12 space-y-10">
          <Section title="1. Introduction">
            <p>
              Welcome to STEM Sprouts (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We value your privacy and
              are committed to protecting your personal information. This Privacy Policy explains what information we
              collect, how we use it, and the choices you have regarding your information when you use our website,
              applications, and services (collectively, the &quot;Services&quot;).
            </p>
            <p>By using our Services, you agree to the practices described in this Privacy Policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of information:</p>
            <p className="font-bold text-black dark:text-white">Information You Provide</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Organization or school name (if applicable)</li>
              <li>Messages, feedback, or inquiries you send us</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p className="font-bold text-black dark:text-white">Information Collected Automatically</p>
            <p>When you use our Services, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
              <li>Usage statistics and analytics</li>
            </ul>
            <p className="font-bold text-black dark:text-white">Cookies and Similar Technologies</p>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remember your preferences</li>
              <li>Improve website performance</li>
              <li>Analyze website traffic</li>
              <li>Enhance user experience</li>
            </ul>
            <p>You may disable cookies through your browser settings, though some features may not function properly.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and maintain our Services</li>
              <li>Respond to questions and support requests</li>
              <li>Improve our website and services</li>
              <li>Communicate important updates</li>
              <li>Analyze usage trends</li>
              <li>Prevent fraud or misuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Sharing Your Information">
            <p>We do not sell your personal information.</p>
            <p>We may share information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>With trusted service providers that help us operate our Services</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, users, or the public</li>
              <li>In connection with a merger, acquisition, or organizational restructuring</li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We use reasonable administrative, technical, and physical safeguards to protect your information.
              However, no method of internet transmission or electronic storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain personal information only as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide our Services</li>
              <li>Meet legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
            <p>When information is no longer needed, we will securely delete or anonymize it where appropriate.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to certain processing</li>
              <li>Withdraw consent where applicable</li>
              <li>Request a copy of your data</li>
            </ul>
            <p>To exercise these rights, contact us using the information below.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Our Services are not intended for children under 13 unless specifically stated otherwise. We do not
              knowingly collect personal information from children under 13 without appropriate consent where
              required by law. If you believe a child has provided personal information, please contact us so we can
              remove it.
            </p>
          </Section>

          <Section title="9. Third-Party Services">
            <p>
              Our Services may contain links to third-party websites or use third-party services. We are not
              responsible for the privacy practices of those third parties. We encourage you to review their privacy
              policies before providing any personal information.
            </p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>
              If you access our Services from outside the country where our servers are located, your information may
              be transferred to and processed in another country. By using our Services, you consent to such transfers
              where permitted by law.
            </p>
          </Section>

          <Section title="11. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will become effective when the revised
              policy is posted with a new Effective Date. Continued use of our Services after changes are posted
              constitutes acceptance of the updated Privacy Policy.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
            <p className="font-bold text-black dark:text-white">STEM Sprouts</p>
            <p>
              Email:{" "}
              <a href="mailto:hello@stem-sprouts.org" className="text-[#15803d] dark:text-[#22C55E] font-bold underline">
                hello@stem-sprouts.org
              </a>
            </p>
            <p>Website: stem-sprouts.org</p>
          </Section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
