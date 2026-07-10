import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { AboutSection } from "@/components/about-section"
import { KenyaSection } from "@/components/kenya-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { NewsTeaser } from "@/components/news-teaser"
import { ExperienceSection } from "@/components/experience-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <KenyaSection />
      <LogoMarquee />
      <ExperienceSection />
      <PortfolioSection />
      <NewsTeaser />
      <FounderSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
