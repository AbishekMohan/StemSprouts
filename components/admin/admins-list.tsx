"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type AdminRow = { id: string; username: string; role: "main_admin" | "chapter_lead"; createdAt: string }

export function AdminsList({ admins, currentUserId }: { admins: AdminRow[]; currentUserId: string }) {
  const router = useRouter()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function remove(id: string, username: string) {
    if (!confirm(`Remove ${username}'s admin access? This can't be undone.`)) return
    setError("")
    setRemovingId(id)
    const res = await fetch(`/api/auth/admins/${id}`, { method: "DELETE" })
    setRemovingId(null)
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || "Couldn't remove that admin")
      return
    }
    router.refresh()
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {admins.map((admin) => (
        <div
          key={admin.id}
          className="flex items-center justify-between gap-4 border-2 border-black dark:border-white rounded-xl px-4 py-3"
        >
          <div className="min-w-0">
            <p className="font-bold text-black dark:text-white truncate">
              {admin.username}
              {admin.id === currentUserId && <span className="ml-2 text-xs font-normal text-gray-500">(you)</span>}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {admin.role === "main_admin" ? "Main Admin" : "Chapter Lead"} &middot; joined{" "}
              {new Date(admin.createdAt).toLocaleDateString()}
            </p>
          </div>
          {admin.id !== currentUserId && (
            <button
              onClick={() => remove(admin.id, admin.username)}
              disabled={removingId === admin.id}
              className="text-sm font-semibold text-red-600 disabled:opacity-50 flex-shrink-0"
            >
              {removingId === admin.id ? "Removing..." : "Remove"}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
