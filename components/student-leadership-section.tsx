import Link from "next/link"
import { ArrowRight, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CHAPTER_APPLICATION_URL } from "@/lib/nav"

export function StudentLeadershipSection() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12" aria-labelledby="student-leadership-heading">
      <div className="max-w-7xl mx-auto bg-black border-4 border-black dark:border-white rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 id="student-leadership-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lead a chapter as a{" "}
            <span className="bg-[#22C55E] text-black px-3 py-1 inline-block">high school student</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            High school students can start and lead STEM Sprouts chapters in their schools or communities. Chapter
            Leads plan hands-on STEM workshops, recruit volunteers, partner with schools and libraries, and bring free
            STEM education to elementary school students.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/chapter-leadership">
            <Button className="w-full bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-xl px-8 py-6 text-base font-bold h-auto border-2 border-black">
              Explore Chapter Leadership
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
          <a href={CHAPTER_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-base font-bold h-auto"
            >
              <Rocket className="w-5 h-5" aria-hidden="true" />
              Start a STEM Sprouts Chapter ↗
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
