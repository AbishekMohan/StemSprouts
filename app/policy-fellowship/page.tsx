import type { Metadata } from "next"
import { Check, FileText, Users, Megaphone, Landmark, Award, HandHeart } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { PopIn } from "@/components/pop-in"
import { PolicyFellowshipForm } from "@/components/policy-fellowship-form"

export const metadata: Metadata = {
  title: "Policy Fellowship - STEM Sprouts",
  description:
    "The STEM Sprouts Policy Fellowship pairs students with mentors to research, write, and publish policy papers that reach real decision-makers.",
  alternates: { canonical: "/policy-fellowship" },
}

const benefits = [
  {
    icon: Users,
    title: "A Dedicated Mentor",
    description:
      "You're paired with a mentor for the whole process, from picking a topic through your final draft, so you're never researching or writing alone.",
  },
  {
    icon: FileText,
    title: "Structured Review",
    description:
      "Every paper goes through peer review and a formal Editorial Board review before it's considered finished, the same rigor STEM Sprouts applies across its research programs.",
  },
  {
    icon: HandHeart,
    title: "Support Toward Publication",
    description: "STEM Sprouts covers the costs of pursuing publication for Fellows' work, so there's no fee for you to submit.",
  },
  {
    icon: Megaphone,
    title: "A Platform to Present",
    description: "Fellows get opportunities to present their findings at events like the STEM Summit and youth policy convenings.",
  },
  {
    icon: Landmark,
    title: "Real-World Reach",
    description:
      "Finished papers are routed to school districts, legislative offices, and stakeholder groups positioned to act on your recommendations.",
  },
  {
    icon: Award,
    title: "A Fellow Community",
    description: "Join a cohort of Policy Fellows across STEM Sprouts chapters and earn a formal Policy Fellow title.",
  },
]

const steps = [
  {
    title: "Apply & Propose a Topic",
    description: "Submit a short proposal on the policy issue you want to research and why it matters.",
  },
  {
    title: "Get Matched with a Mentor",
    description: "You'll work with a dedicated mentor who guides your research and writing from start to finish.",
  },
  {
    title: "Research & Draft",
    description: "Build your paper around a standard policy framework: problem, evidence, stakeholders, and recommendations.",
  },
  {
    title: "Peer & Editorial Review",
    description: "Your draft is reviewed by fellow Fellows and STEM Sprouts' Editorial Board before it's considered final.",
  },
  {
    title: "Publish & Present",
    description: "Once review is complete, we support you toward publication and give you a stage to present your work.",
  },
  {
    title: "Track Your Impact",
    description: "Published papers are distributed to relevant decision-makers, and we follow up on what happens next.",
  },
]

export default function PolicyFellowshipPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <PageHeader
        title="Policy"
        highlight="Fellowship"
        description="Research, write, and publish policy papers on issues that matter to you, with mentor support every step of the way."
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
            What You Get as a Fellow
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {benefits.map((b, index) => (
              <PopIn
                key={b.title}
                delay={(index % 3) * 120}
                className="h-full bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-[24px] p-6 hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] transition-shadow"
              >
                <div
                  className="w-10 h-10 bg-[#22C55E] border-2 border-black dark:border-white rounded-xl flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <b.icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-bold text-lg text-black dark:text-white mb-2">{b.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{b.description}</p>
              </PopIn>
            ))}
          </div>

          <PopIn className="bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-8 md:p-12 mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8 text-center">How It Works</h3>
            <ol className="space-y-6 max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <strong className="text-black dark:text-white block mb-1">{step.title}</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </PopIn>

          <PopIn className="bg-black/5 dark:bg-white/5 border border-[#22C55E]/30 rounded-2xl p-6 md:p-8 mb-20">
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                <Check className="w-4 h-4 text-black" />
              </span>
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                Fellowship applications are the competitive gate, which is what makes the guarantee credible: once
                you're accepted and your paper clears review, publication support isn't a gamble.
              </p>
            </div>
          </PopIn>

          <PopIn className="text-center bg-[#22C55E] border-4 border-black dark:border-white rounded-3xl p-8 md:p-12 mb-12">
            <Landmark className="w-10 h-10 text-black mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">Ready to Become a Policy Fellow?</h3>
            <p className="text-black/80 max-w-xl mx-auto">
              Fill out the application below to tell us about yourself and the policy issue you want to research.
            </p>
          </PopIn>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24" id="apply" aria-labelledby="apply-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="apply-heading" className="sr-only">
            Policy Fellowship Application
          </h2>
          <PolicyFellowshipForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
