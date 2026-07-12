"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function ReviewButtons({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null)

  async function review(action: "approve" | "reject") {
    if (action === "reject" && !confirm("Send this back to draft? The author will need to resubmit it.")) return
    setLoading(action)
    await fetch(`/api/posts/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
    setLoading(null)
    router.refresh()
  }

  return (
    <div className="flex gap-3 items-center flex-shrink-0">
      <button
        onClick={() => review("approve")}
        disabled={loading !== null}
        className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-3 py-1.5 font-bold text-sm disabled:opacity-50"
      >
        {loading === "approve" ? "Approving..." : "Approve"}
      </button>
      <button
        onClick={() => review("reject")}
        disabled={loading !== null}
        className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-3 py-1.5 font-bold text-sm disabled:opacity-50"
      >
        {loading === "reject" ? "Rejecting..." : "Reject"}
      </button>
    </div>
  )
}
