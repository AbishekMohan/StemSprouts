import { ArrowRight } from "lucide-react"

const steps = [
  { title: "Student leaders", description: "High school students start and lead chapters." },
  { title: "Chapters", description: "Each chapter organizes its own team and partners." },
  { title: "STEM programs", description: "Chapters run free, hands-on workshops." },
  { title: "Younger learners", description: "Elementary school students discover STEM." },
]

export function HowItWorksSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="how-it-works-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-black dark:text-white">
          How <span className="bg-[#22C55E] text-black px-3 py-1 inline-block">STEM Sprouts</span> works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg text-center max-w-2xl mx-auto mb-12">
          STEM Sprouts is a student-led nonprofit providing free, hands-on STEM education to elementary school students
          through student-run chapters.
        </p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative bg-white dark:bg-black border-[3px] border-black dark:border-white rounded-[24px] p-6"
            >
              <span
                aria-hidden="true"
                className="w-10 h-10 mb-4 rounded-full bg-[#22C55E] border-2 border-black dark:border-white flex items-center justify-center font-bold text-black"
              >
                {index + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight
                  className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black dark:text-white z-10"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
