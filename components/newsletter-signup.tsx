"use client"

import { useState, type FormEvent } from "react"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type NewsletterSignupProps = {
  /** "light" for use on a white/light card, "dark" for use on a black/dark card. */
  variant?: "light" | "dark"
}

export function NewsletterSignup({ variant = "light" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [consentTouched, setConsentTouched] = useState(false)

  const emailValid = EMAIL_RE.test(email.trim())
  const showEmailError = emailTouched && !emailValid
  const showConsentError = consentTouched && !consent

  const labelColor = variant === "dark" ? "text-white" : "text-black"
  const consentTextColor = variant === "dark" ? "text-gray-300" : "text-[#393939]"

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEmailTouched(true)
    setConsentTouched(true)

    if (!emailValid || !consent) return

    setStatus("loading")
    setError("")

    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), consent }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Something went wrong")
      setStatus("error")
      return
    }

    setStatus("success")
    setEmail("")
    setConsent(false)
    setEmailTouched(false)
    setConsentTouched(false)
  }

  if (status === "success") {
    return (
      <p className={`text-center md:text-left font-semibold ${labelColor}`}>
        You&apos;re subscribed! Watch your inbox for updates.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="newsletter-email" className={`block font-bold mb-2 ${labelColor}`}>
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmailTouched(true)}
        aria-invalid={showEmailError}
        aria-describedby={showEmailError ? "newsletter-email-error" : undefined}
        placeholder="you@example.com"
        className={`w-full rounded-xl px-4 py-3 bg-white text-black border-2 focus:outline-none ${
          showEmailError ? "border-red-600 focus:border-red-600" : "border-black focus:border-[#22C55E]"
        }`}
      />
      {showEmailError && (
        <p id="newsletter-email-error" className="text-red-600 text-sm mt-1">
          Enter a valid email address
        </p>
      )}

      <label className="flex items-start gap-2 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked)
            setConsentTouched(true)
          }}
          onBlur={() => setConsentTouched(true)}
          aria-invalid={showConsentError}
          aria-describedby={showConsentError ? "newsletter-consent-error" : undefined}
          className={`mt-1 w-5 h-5 flex-shrink-0 rounded border-2 accent-[#22C55E] ${
            showConsentError ? "border-red-600" : "border-black"
          }`}
        />
        <span className={`text-sm ${consentTextColor}`}>
          Yes, subscribe me to your newsletter<span className="text-red-600">*</span>
        </span>
      </label>
      {showConsentError && (
        <p id="newsletter-consent-error" className="text-red-600 text-sm mt-1">
          Please confirm you&apos;d like to subscribe
        </p>
      )}

      {status === "error" && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-24 h-24 rounded-full bg-[#22C55E] text-black font-bold hover:bg-[#1ea750] disabled:opacity-60 transition-colors flex items-center justify-center"
      >
        {status === "loading" ? "..." : "Submit"}
      </button>
    </form>
  )
}
