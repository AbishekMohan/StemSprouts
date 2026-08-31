"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminSetupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [setupSecret, setSetupSecret] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, setupSecret }),
    })

    setLoading(false)

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      setError(body?.error ?? "Something went wrong")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-8 space-y-5"
      >
        <h1 className="text-2xl font-bold text-black dark:text-white text-center">First-Time Setup</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          This creates the very first admin account and requires the setup code. If an admin already exists, use an
          invite link instead &mdash; ask an existing admin for one.
        </p>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <div>
          <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="setupSecret">
            Setup code
          </label>
          <input
            id="setupSecret"
            type="password"
            value={setupSecret}
            onChange={(e) => setSetupSecret(e.target.value)}
            className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            autoComplete="username"
            minLength={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg py-3 font-bold disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/admin/login" className="underline text-black dark:text-white">
            Log in
          </Link>
        </p>
      </form>
    </main>
  )
}
