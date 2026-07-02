import type { Metadata } from "next"
import { Target, Eye, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { PopIn } from "@/components/pop-in"

export const metadata: Metadata = {
  title: "About - STEM Sprouts",
  description: "A youth-led nonprofit building a global network of student-run STEM chapters and Pinboard, our open-source learning platform.",
}

const team = [
  {
    initials: "HC",
    name: "Harshit Chaturvedy",
    role: "Founder & Executive",
    bio: "Founder of STEM Sprouts, leading the organization's vision and maintaining community connections.",
  },
  {
    initials: "LY",
    name: "Lokesh Yarlagadda",
    role: "Vice-President of Operations",
    bio: "Manages day-to-day operations and supports the digital experience for visitors and chapters.",
  },
  {
    initials: "SP",
    name: "Saisohan Panda",
    role: "Vice-President of Policy",
    bio: "Oversees organizational policies, compliance, and strategic outreach to expand program impact.",
  },
  {
    initials: "AM",
    name: "Abishek Mohan",
    role: "Website Developer",
    bio: "Builds and refines website features to help present STEM Sprouts' programs clearly and effectively.",
  },
  {
    initials: "HR",
    name: "Hridhun Regupathi",
    role: "Head Grant Writer",
    bio: "Secures critical funding and grants to keep our workshops completely free and accessible for more communities globally.",
  },
]

const openRoles = [
  {
    title: "Pinboard Developer",
    description: "Work on our open-source virtual circuit builder and help shape the future of our learning platform.",
  },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50">
      <Navigation />
      
      <PageHeader
        title="About"
        highlight="STEM Sprouts"
        description="A youth-led nonprofit building a global network of student-run STEM chapters and Pinboard, our open-source learning platform."
      />

      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Purpose Section */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">Our Purpose</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <PopIn className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Mission</h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                  STEM Sprouts exists to spark curiosity and build confidence in young learners by making
                  STEM (Science, Technology, Engineering, and Math) fun, creative, and accessible. Through interactive
                  workshops, real-world challenges, and beginner-friendly coding projects, we empower students to
                  explore, experiment, and enjoy learning.
                </p>
              </PopIn>

              <PopIn delay={120} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vision</h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                  We believe that every child deserves a joyful, hands-on introduction to STEM, no matter their
                  background or experience. Our goal is to plant the seeds of problem-solving, collaboration, and
                  innovation that will grow into the skills and passions of tomorrow's changemakers.
                </p>
              </PopIn>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <PopIn
                  key={member.name}
                  delay={(index % 3) * 100}
                  className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-colors duration-300"
                >
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-lg text-white shadow-inner">
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <div className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mt-1 mb-3">
                    {member.role}
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </PopIn>
              ))}
            </div>
          </div>

          {/* Careers Section */}
          <PopIn className="bg-gradient-to-b from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 md:p-16 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">We're Hiring!</h2>
            <p className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 text-base md:text-lg">
              Join our youth-led team and help us empower the next generation of STEM leaders. We are looking for
              passionate individuals to join us in the following roles:
            </p>

            <div className="grid gap-4 max-w-xl mx-auto mb-12">
              {openRoles.map((role, index) => (
                <PopIn key={role.title} delay={index * 120} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 text-left shadow-sm">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-zinc-100 mb-1.5">{role.title}</h3>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">{role.description}</p>
                </PopIn>
              ))}
            </div>

            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 rounded-2xl p-6 max-w-md mx-auto text-left">
              <div className="p-3 bg-emerald-500 rounded-xl text-white hidden sm:block">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-zinc-100 mb-0.5">Interested in joining us?</p>
                <p className="text-slate-600 dark:text-zinc-400 text-sm">
                  Email your resume to{" "}
                  <a href="mailto:hello@stem-sprouts.org" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                    hello@stem-sprouts.org
                  </a>
                </p>
              </div>
            </div>
          </PopIn>

        </div>
      </section>

      <Footer />
    </main>
  )
}
