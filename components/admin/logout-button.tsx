"use client"

import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="border-2 border-black dark:border-white rounded-lg px-4 py-2 font-bold text-sm text-black dark:text-white"
    >
      Log out
    </button>
  )
}
