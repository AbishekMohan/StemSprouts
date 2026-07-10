"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("Delete this post? This can't be undone.")) return
    setLoading(true)
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
    setLoading(false)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="text-sm font-semibold text-red-600 disabled:opacity-50">
      {loading ? "Deleting..." : "Delete"}
    </button>
  )
}
