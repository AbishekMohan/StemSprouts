import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fieldClass =
  "border-[3px] border-black dark:border-white rounded-xl px-4 h-12 w-full bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base"

const textareaClass = `${fieldClass} h-auto py-3 resize-vertical`

const labelClass = "block mb-2 font-bold text-black dark:text-white"
const helperClass = "mt-1 text-sm text-gray-500 dark:text-gray-400"

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-black/10 dark:border-white/10">
      <span className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black text-sm">
        {step}
      </span>
      <h4 className="font-bold text-lg text-black dark:text-white">{title}</h4>
    </div>
  )
}

export function PolicyFellowshipForm() {
  return (
    <form
      action="https://formspree.io/f/mdaqjylr"
      method="POST"
      encType="multipart/form-data"
      className="bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] space-y-12"
    >
      <input type="hidden" name="_subject" value="New Policy Fellowship Application" />

      <fieldset>
        <SectionHeading step={1} title="Applicant Information" />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="full_name" className={labelClass}>
                Full Name *
              </label>
              <Input id="full_name" name="full_name" required aria-required="true" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="grade_level" className={labelClass}>
                Grade Level / Year in School *
              </label>
              <Input id="grade_level" name="grade_level" required aria-required="true" className={fieldClass} />
            </div>
          </div>

          <div>
            <label htmlFor="school_name" className={labelClass}>
              School Name *
            </label>
            <Input id="school_name" name="school_name" required aria-required="true" className={fieldClass} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address *
              </label>
              <Input id="email" name="email" type="email" required aria-required="true" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <Input id="phone" name="phone" type="tel" className={fieldClass} />
            </div>
          </div>

          <div>
            <label htmlFor="city_state" className={labelClass}>
              City / State *
            </label>
            <Input id="city_state" name="city_state" required aria-required="true" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="referral_source" className={labelClass}>
              How did you hear about the Policy Fellowship?
            </label>
            <select
              id="referral_source"
              name="referral_source"
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                Please select...
              </option>
              <option value="friend-classmate">Friend or classmate</option>
              <option value="chapter-leader-mentor">Chapter leader or mentor</option>
              <option value="teacher-school">Teacher or school</option>
              <option value="social-media">Social media</option>
              <option value="stem-sprouts-website">STEM Sprouts website</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <SectionHeading step={2} title="Background & Interest" />
        <div className="space-y-5">
          <div>
            <label htmlFor="why_policy" className={labelClass}>
              Why are you interested in policy work specifically, rather than research alone? *
            </label>
            <textarea
              id="why_policy"
              name="why_policy"
              rows={5}
              required
              aria-required="true"
              className={textareaClass}
            />
            <p className={helperClass}>150–250 words.</p>
          </div>

          <div>
            <label htmlFor="research_area" className={labelClass}>
              Which area of STEM education or emerging technology are you most interested in researching? *
            </label>
            <select id="research_area" name="research_area" defaultValue="" required aria-required="true" className={fieldClass}>
              <option value="" disabled>
                Please select...
              </option>
              <option value="ai-in-education">AI in education</option>
              <option value="robotics-access">Robotics access</option>
              <option value="cs-curriculum">Computer science curriculum</option>
              <option value="girls-in-stem">Girls in STEM</option>
              <option value="broadband-tech-access">Broadband / tech access</option>
              <option value="other">Other</option>
            </select>
            <Input
              name="research_area_other"
              placeholder="If other, please specify"
              className={`${fieldClass} mt-3`}
            />
          </div>

          <div>
            <label htmlFor="prior_experience" className={labelClass}>
              Describe any prior research, writing, debate, Model UN, journalism, or advocacy experience you have. *
            </label>
            <textarea
              id="prior_experience"
              name="prior_experience"
              rows={4}
              required
              aria-required="true"
              className={textareaClass}
            />
          </div>

          <div>
            <label htmlFor="prior_writing" className={labelClass}>
              Have you ever written a formal paper, report, or long-form essay before? If yes, briefly describe it.
            </label>
            <textarea id="prior_writing" name="prior_writing" rows={3} className={textareaClass} />
            <p className={helperClass}>Optional.</p>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <SectionHeading step={3} title="Fit & Commitment" />
        <div className="space-y-5">
          <div>
            <span className={labelClass}>
              Policy Fellows are expected to conduct research, work with a mentor, write a full paper, and help
              present findings to policymakers. Are you able to commit to a semester-long program? *
            </span>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 font-medium text-black dark:text-white">
                <input type="radio" name="can_commit" value="yes" required aria-required="true" className="w-4 h-4 accent-[#22C55E]" />
                Yes
              </label>
              <label className="flex items-center gap-2 font-medium text-black dark:text-white">
                <input type="radio" name="can_commit" value="no" required aria-required="true" className="w-4 h-4 accent-[#22C55E]" />
                No
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="hours_per_week" className={labelClass}>
              How many hours per week can you realistically dedicate to this program? *
            </label>
            <Input id="hours_per_week" name="hours_per_week" required aria-required="true" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="work_style" className={labelClass}>
              Fellows often work in small teams under a mentor. Do you prefer working independently, in a small
              group, or are you flexible? *
            </label>
            <select id="work_style" name="work_style" defaultValue="" required aria-required="true" className={fieldClass}>
              <option value="" disabled>
                Please select...
              </option>
              <option value="independently">Independently</option>
              <option value="small-group">In a small group</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label htmlFor="topic_pitch" className={labelClass}>
              Is there a specific policy issue or question you&apos;d want to explore if accepted? *
            </label>
            <textarea id="topic_pitch" name="topic_pitch" rows={4} required aria-required="true" className={textareaClass} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <SectionHeading step={4} title="Writing Sample" />
        <div className="space-y-5">
          <div>
            <label htmlFor="writing_sample" className={labelClass}>
              Please submit a short writing sample (academic paper, op-ed, essay, or research excerpt — 1–3 pages).
            </label>
            <input
              id="writing_sample"
              name="writing_sample"
              type="file"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-black dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black dark:file:border-white file:bg-[#22C55E] file:font-bold file:text-black file:cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="writing_sample_alt" className={labelClass}>
              No writing sample? Respond to this instead:
            </label>
            <p className={`${helperClass} mb-2`}>
              Pick one problem in STEM education you&apos;ve personally observed and explain, in under 400 words,
              what you think should be done about it.
            </p>
            <textarea id="writing_sample_alt" name="writing_sample_alt" rows={6} className={textareaClass} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <SectionHeading step={5} title="References & Logistics" />
        <div className="space-y-5">
          <div>
            <label htmlFor="reference" className={labelClass}>
              Name and email of a teacher, counselor, or mentor who can speak to your work ethic
            </label>
            <Input id="reference" name="reference" className={fieldClass} />
            <p className={helperClass}>Optional but recommended.</p>
          </div>

          <div>
            <label htmlFor="scheduling_conflicts" className={labelClass}>
              Do you have any scheduling conflicts we should know about?
            </label>
            <textarea id="scheduling_conflicts" name="scheduling_conflicts" rows={3} className={textareaClass} />
          </div>

          <div>
            <label htmlFor="additional_notes" className={labelClass}>
              Anything else you&apos;d like us to know?
            </label>
            <textarea id="additional_notes" name="additional_notes" rows={3} className={textareaClass} />
            <p className={helperClass}>Optional.</p>
          </div>
        </div>
      </fieldset>

      <Button
        type="submit"
        className="w-full bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-xl py-6 text-base font-bold h-auto"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
        Submit Application
      </Button>
    </form>
  )
}
