"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

type PostInput = {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: "news" | "research"
  author: string
  published: boolean
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function PostForm({ initial }: { initial?: PostInput }) {
  const router = useRouter()
  const isEditing = Boolean(initial?.id)
  const [form, setForm] = useState<PostInput>(
    initial ?? { slug: "", title: "", excerpt: "", content: "", category: "news", author: "STEM Sprouts", published: false },
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const url = isEditing ? `/api/posts/${initial!.id}` : "/api/posts"
    const method = isEditing ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Something went wrong")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-title">
          Title
        </label>
        <input
          id="post-title"
          value={form.title}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              title: e.target.value,
              slug: isEditing ? f.slug : slugify(e.target.value),
            }))
          }
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-slug">
          Slug
        </label>
        <input
          id="post-slug"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Appears in the URL: /news/{form.slug || "your-slug"}</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-category">
          Category
        </label>
        <select
          id="post-category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as "news" | "research" }))}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
        >
          <option value="news">News</option>
          <option value="research">Research</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-author">
          Author
        </label>
        <input
          id="post-author"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-excerpt">
          Excerpt
        </label>
        <textarea
          id="post-excerpt"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          placeholder="A short summary shown on the News list and homepage card"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-content">
          Content
        </label>
        <textarea
          id="post-content"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          rows={14}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white font-mono text-sm"
          placeholder="Plain text or paragraphs, separated by blank lines"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
        />
        Published (visible on the site)
      </label>

      <button
        type="submit"
        disabled={saving}
        className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-6 py-3 font-bold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
