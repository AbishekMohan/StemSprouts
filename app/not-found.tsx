import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navigation />
      <section className="flex-1 container mx-auto px-4 py-24 md:py-32 text-center max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-[#15803d] dark:text-[#22C55E] mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-[1.15]">
          Page not <span className="bg-[#22C55E] text-black px-3 py-1 inline-block">found</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved. Check the URL, or head back to something
          useful below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-6 py-3 font-bold text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/news"
            className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-6 py-3 font-bold text-sm"
          >
            Read the News
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
