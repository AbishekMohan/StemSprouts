"use client"

import { useMemo, useState } from "react"
import { CalendarDays, Check, ChevronLeft, ChevronRight, Circle, Plus, Trash2 } from "lucide-react"

const subjects = ["All subjects", "Math", "Science", "English", "History"]

type Homework = {
  id: number
  title: string
  subject: string
  due: string
  minutes: number
  done: boolean
}

const initialHomework: Homework[] = [
  { id: 1, title: "Finish quadratic equations", subject: "Math", due: "Today", minutes: 35, done: false },
  { id: 2, title: "Read chapter 6 and annotate", subject: "English", due: "Today", minutes: 25, done: true },
  { id: 3, title: "Lab report: plant cells", subject: "Science", due: "Tomorrow", minutes: 50, done: false },
  { id: 4, title: "Outline civil rights essay", subject: "History", due: "Thu, Apr 18", minutes: 40, done: false },
]

export default function PlanPage() {
  const [homework, setHomework] = useState(initialHomework)
  const [filter, setFilter] = useState("All subjects")
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("Math")
  const [due, setDue] = useState("Today")
  const [minutes, setMinutes] = useState("30")

  const visibleHomework = useMemo(
    () => homework.filter((item) => filter === "All subjects" || item.subject === filter),
    [filter, homework],
  )
  const completed = homework.filter((item) => item.done).length
  const remainingMinutes = homework.filter((item) => !item.done).reduce((total, item) => total + item.minutes, 0)

  function addHomework(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) return
    setHomework((items) => [
      ...items,
      { id: Date.now(), title: title.trim(), subject, due, minutes: Number(minutes) || 30, done: false },
    ])
    setTitle("")
    setShowForm(false)
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f8f4] text-[#173126]">
      <header className="border-b-2 border-[#173126] bg-[#f7f8f4]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <a href="/" className="text-xl font-bold tracking-tight">STEM Sprouts</a>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="hidden text-[#607267] sm:inline">Tuesday, April 16</span>
            <span className="rounded-full bg-[#d9f27c] px-3 py-1.5">My plan</span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-12 md:grid-cols-[1fr_280px] md:px-8 md:pt-16">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#668074]">Weekly homework planner</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-[0.98] tracking-[-0.06em] md:text-7xl">Make room for the work that matters.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#53655b]">A clear place to see what is due, choose your next task, and finish the week without last-minute panic.</p>
        </div>
        <aside className="rounded-[24px] border-2 border-[#173126] bg-[#173126] p-6 text-[#f7f8f4] shadow-[7px_7px_0_#d9f27c]">
          <div className="mb-7 flex items-center justify-between"><span className="text-sm font-semibold text-[#b9c9be]">This week</span><CalendarDays size={18} aria-hidden="true" /></div>
          <p className="text-5xl font-bold tracking-[-0.06em]">{completed}/{homework.length}</p>
          <p className="mt-1 text-sm text-[#b9c9be]">assignments complete</p>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#496052]"><div className="h-full rounded-full bg-[#d9f27c]" style={{ width: `${homework.length ? (completed / homework.length) * 100 : 0}%` }} /></div>
          <p className="mt-4 text-sm text-[#b9c9be]">{remainingMinutes} minutes left to plan</p>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="mb-5 flex flex-col gap-4 border-y-2 border-[#173126] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subjects.map((item) => <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full border-2 border-[#173126] px-4 py-2 text-sm font-semibold transition ${filter === item ? "bg-[#173126] text-white" : "bg-transparent hover:bg-[#d9f27c]"}`}>{item}</button>)}
          </div>
          <button onClick={() => setShowForm((value) => !value)} className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#d9f27c] px-5 py-3 text-sm font-bold hover:bg-[#c5df62] active:scale-[0.98]"><Plus size={18} aria-hidden="true" /> Add assignment</button>
        </div>

        {showForm && <form onSubmit={addHomework} className="mb-6 grid gap-4 rounded-[20px] border-2 border-[#173126] bg-white p-5 md:grid-cols-[2fr_1fr_1fr_100px_auto] md:items-end">
          <label className="grid gap-2 text-sm font-semibold">Assignment<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Finish reading" className="rounded-xl border-2 border-[#173126] bg-[#f7f8f4] px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#9ab944]" /></label>
          <label className="grid gap-2 text-sm font-semibold">Subject<select value={subject} onChange={(event) => setSubject(event.target.value)} className="rounded-xl border-2 border-[#173126] bg-[#f7f8f4] px-3 py-2.5 font-normal">{subjects.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-semibold">Due<select value={due} onChange={(event) => setDue(event.target.value)} className="rounded-xl border-2 border-[#173126] bg-[#f7f8f4] px-3 py-2.5 font-normal"><option>Today</option><option>Tomorrow</option><option>Thu, Apr 18</option><option>Fri, Apr 19</option></select></label>
          <label className="grid gap-2 text-sm font-semibold">Minutes<input type="number" min="5" step="5" value={minutes} onChange={(event) => setMinutes(event.target.value)} className="rounded-xl border-2 border-[#173126] bg-[#f7f8f4] px-3 py-2.5 font-normal" /></label>
          <button className="rounded-xl bg-[#173126] px-5 py-3 font-bold text-white hover:bg-[#2b4b3b]">Save</button>
        </form>}

        <div className="grid gap-3">
          {visibleHomework.map((item) => <article key={item.id} className={`group grid gap-4 rounded-[20px] border-2 border-[#173126] bg-white p-5 transition md:grid-cols-[auto_1fr_auto_auto] md:items-center ${item.done ? "opacity-60" : "hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#d9f27c]"}`}>
            <button aria-label={item.done ? `Mark ${item.title} as incomplete` : `Mark ${item.title} as complete`} onClick={() => setHomework((items) => items.map((entry) => entry.id === item.id ? { ...entry, done: !entry.done } : entry))} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#173126] hover:bg-[#d9f27c]">{item.done ? <Check size={18} strokeWidth={3} /> : <Circle size={18} aria-hidden="true" />}</button>
            <div><h2 className={`text-lg font-bold ${item.done ? "line-through" : ""}`}>{item.title}</h2><p className="mt-1 text-sm text-[#607267]">{item.subject} · {item.minutes} minutes</p></div>
            <span className={`text-sm font-bold ${item.due === "Today" ? "text-[#b34b32]" : "text-[#607267]"}`}>{item.due}</span>
            <button aria-label={`Delete ${item.title}`} onClick={() => setHomework((items) => items.filter((entry) => entry.id !== item.id))} className="justify-self-start rounded-lg p-2 text-[#607267] hover:bg-[#fbe4dc] hover:text-[#b34b32] md:justify-self-end"><Trash2 size={18} /></button>
          </article>)}
          {visibleHomework.length === 0 && <div className="rounded-[20px] border-2 border-dashed border-[#809187] p-12 text-center"><h2 className="text-xl font-bold">Nothing here yet</h2><p className="mt-2 text-[#607267]">Add an assignment or choose another subject.</p></div>}
        </div>

        <div className="mt-10 flex items-center justify-between rounded-[20px] bg-[#e7eddc] px-5 py-4 text-sm"><span className="font-semibold">Plan a little, then take a break.</span><div className="flex items-center gap-2 font-bold"><button aria-label="Previous week" className="rounded-full p-2 hover:bg-white"><ChevronLeft size={18} /></button><span>Apr 15 - 21</span><button aria-label="Next week" className="rounded-full p-2 hover:bg-white"><ChevronRight size={18} /></button></div></div>
      </section>
    </main>
  )
}
