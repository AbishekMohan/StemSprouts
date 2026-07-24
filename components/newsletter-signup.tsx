"use client"

import { useState, type FormEvent } from "react"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Something went wrong")
      setStatus("error")
      return
    }

    setStatus("success")
    setEmail("")
  }

  if (status === "success") {
    return (
      <p className="text-center text-black dark:text-white font-semibold">
        You&apos;re subscribed! Watch your inbox for new posts.
      </p>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 border-2 border-black dark:border-white rounded-lg px-4 py-3 bg-white dark:bg-black text-black dark:text-white"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-6 py-3 font-bold disabled:opacity-60 whitespace-nowrap flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
    </div>
  )
}
