"use client"

import { useState } from "react"
import Link from "next/link"

type Role = "chapter_lead" | "main_admin"

export function InviteForm() {
  const [role, setRole] = useState<Role>("chapter_lead")
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateInvite() {
    setError("")
    setCopied(false)
    setLoading(true)

    const res = await fetch("/api/auth/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    })
    setLoading(false)

    if (!res.ok) {
      setError("Something went wrong generating the invite")
      return
    }

    const body = await res.json()
    setLink(`${window.location.origin}/admin/accept-invite/${body.token}`)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link)
    setCopied(true)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/admin" className="text-sm font-semibold underline text-black dark:text-white">
          &larr; Back to Posts
        </Link>
        <h1 className="text-2xl font-bold text-black dark:text-white mt-4 mb-2">Invite an Admin</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Generate a one-time link. Whoever opens it picks their own username and password &mdash; you never see or
          set it for them. The link works once and expires in 7 days.
        </p>

        {!link && (
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold mb-2 text-black dark:text-white">Role</legend>
            <div className="space-y-2">
              <label className="flex items-start gap-2 text-sm text-black dark:text-white">
                <input
                  type="radio"
                  name="role"
                  className="mt-1"
                  checked={role === "chapter_lead"}
                  onChange={() => setRole("chapter_lead")}
                />
                <span>
                  <span className="font-semibold">Chapter Lead</span> &mdash; can write posts, but they need a main
                  admin's approval before going live.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-black dark:text-white">
                <input
                  type="radio"
                  name="role"
                  className="mt-1"
                  checked={role === "main_admin"}
                  onChange={() => setRole("main_admin")}
                />
                <span>
                  <span className="font-semibold">Main Admin</span> &mdash; full access: publish directly, review
                  others' posts, invite and remove admins.
                </span>
              </label>
            </div>
          </fieldset>
        )}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {!link ? (
          <button
            onClick={generateInvite}
            disabled={loading}
            className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-4 py-2 font-bold text-sm disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Invite Link"}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-black dark:border-white rounded-lg px-3 py-2 break-all text-sm text-black dark:text-white">
              {link}
            </div>
            <div className="flex gap-3">
              <button
                onClick={copyLink}
                className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-4 py-2 font-bold text-sm"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => {
                  setLink("")
                  setCopied(false)
                }}
                className="text-sm font-semibold underline text-black dark:text-white"
              >
                Generate a new one
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
