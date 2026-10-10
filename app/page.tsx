import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { PressSection } from "@/components/press-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { StudentLeadershipSection } from "@/components/student-leadership-section"
import { GetInvolvedSection } from "@/components/get-involved-section"
import { AboutSection } from "@/components/about-section"
import { KenyaSection } from "@/components/kenya-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { NewsTeaser } from "@/components/news-teaser"
import { ExperienceSection } from "@/components/experience-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: "STEM Sprouts | Student-Led STEM Nonprofit & Chapters",
  description:
    "STEM Sprouts is a student-led nonprofit providing free, hands-on STEM education to elementary school students through student-run chapters. High school students can start and lead a chapter.",
  path: "/",
})

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <StudentLeadershipSection />
      <AboutSection />
      <KenyaSection />
      <LogoMarquee />
      <PressSection />
      <ExperienceSection />
      <PortfolioSection />
      <NewsTeaser />
      <FounderSection />
      <GetInvolvedSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
