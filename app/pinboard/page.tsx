import type { Metadata } from "next"
import Image from "next/image"
import { Check, Github, Rocket } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { PopIn } from "@/components/pop-in"

export const metadata: Metadata = {
  title: "Pinboard - STEM Sprouts",
  description: "A free, open-source block-coding platform for Arduino and Raspberry Pi. Build real hardware projects, simulate them live in your browser, and learn through guided lessons.",
}

const features = [
  {
    title: "Live Hardware Simulation",
    description:
      "Place real components like LEDs, buttons, potentiometers, servos, and buzzers on a virtual board, then watch them respond exactly like the real thing. No physical hardware required to start learning electronics.",
    image: "/stem/virtualcircuitbuilding.png",
    bullets: ["Real Arduino & Raspberry Pi boards", "Live component simulation", "Built-in wiring diagnostics"],
  },
  {
    title: "Blocks That Generate Real Code",
    description:
      "Drag and drop blocks to control your circuit, and watch Pinboard generate the actual Arduino C code behind it in real time. Click any block to see exactly which lines it produced.",
    image: "/stem/visualcode.png",
    bullets: ["Real generated Arduino code", "Click-to-trace block ↔ code", "Beginner to advanced toolboxes"],
  },
  {
    title: "Guided Lessons, Open Source",
    description:
      "Built and maintained by our own students, Pinboard walks makers through guided lessons that check your actual running project, not just your code. Completely open source on GitHub, with free cloud sync for every chapter to adopt.",
    image: "/stem/githubss.png",
    bullets: ["Step-by-step guided lessons", "Free cloud project sync", "Fully open source on GitHub"],
  },
]

export default function PinboardPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <section className="bg-white dark:bg-black py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <PopIn className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl p-3 border-2 border-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <Image src="/stem/pinboard_logo.png" alt="Pinboard logo" width={96} height={96} className="w-full h-full object-contain" />
          </PopIn>
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            <span className="bg-[#22C55E] text-black px-3 py-1 inline-block">Pinboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
            A free, open-source block-coding platform for Arduino and Raspberry Pi. Build real hardware projects,
            simulate them live in your browser, and learn through guided lessons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://pinboard.stem-sprouts.org" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-xl px-8 py-6 text-base font-bold h-auto w-full sm:w-auto">
                <Rocket className="w-5 h-5" aria-hidden="true" />
                Launch App ↗
              </Button>
            </a>
            <a href="https://github.com/STEM-Sprouts/pinboard" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="bg-transparent border-[3px] border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-xl px-8 py-6 text-base font-bold h-auto w-full sm:w-auto"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
                View on GitHub ↗
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-10">
          {features.map((feature, index) => (
            <PopIn
              key={feature.title}
              className="grid md:grid-cols-2 bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-[32px] overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] transition-shadow"
            >
              <div
                className={`relative min-h-[220px] md:min-h-[360px] bg-[#22C55E] ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-[28px] font-bold mb-4 text-black dark:text-white">{feature.title}</h2>
                <p className="text-[#393939] dark:text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-black dark:text-white text-sm font-medium">
                      <Check className="w-4 h-4 text-[#15803d] dark:text-[#22C55E] flex-shrink-0" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </PopIn>
          ))}
        </div>

        <PopIn className="max-w-2xl mx-auto text-center bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-10 md:p-16 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Ready to start making?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Join students building real hardware projects through Pinboard.</p>
          <a href="https://pinboard.stem-sprouts.org" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-xl px-8 py-6 text-base font-bold h-auto">
              Open Pinboard Now ↗
            </Button>
          </a>
        </PopIn>
      </section>

      <Footer />
    </main>
  )
}