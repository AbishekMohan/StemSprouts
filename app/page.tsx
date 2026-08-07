import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { PressSection } from "@/components/press-section"
import { AboutSection } from "@/components/about-section"
import { KenyaSection } from "@/components/kenya-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { NewsTeaser } from "@/components/news-teaser"
import { ExperienceSection } from "@/components/experience-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const revalidate = 60

export const metadata: Metadata = {
  title: "STEM Sprouts",
  description:
    "STEM Sprouts is a youth-led nonprofit building a global network of student-run STEM chapters, from Georgia to Kenya to India, powered by Pinboard, our free open-source hardware coding platform.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <KenyaSection />
      <LogoMarquee />
      <PressSection />
      <ExperienceSection />
      <PortfolioSection />
      <NewsTeaser />
      <FounderSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
