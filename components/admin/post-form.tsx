"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import type { AdminRole } from "@/lib/auth"
import type { PostStatus } from "@/lib/post-status"

type PostInput = {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  imageUrl: string
  author: string
  status: PostStatus
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function PostForm({
  initial,
  categories = [],
  role,
}: {
  initial?: PostInput
  categories?: string[]
  role: AdminRole
}) {
  const router = useRouter()
  const isEditing = Boolean(initial?.id)
  const isMainAdmin = role === "main_admin"
  const [form, setForm] = useState<PostInput>(
    initial ?? {
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "news",
      imageUrl: "",
      author: "STEM Sprouts",
      status: "draft",
    },
  )
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    const body = new FormData()
    body.append("file", file)

    const res = await fetch("/api/posts/upload", { method: "POST", body })
    setUploading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Image upload failed")
      return
    }

    const data = await res.json()
    setForm((f) => ({ ...f, imageUrl: data.url }))
  }

  async function save(status: PostStatus) {
    setSaving(true)
    setError("")

    const url = isEditing ? `/api/posts/${initial!.id}` : "/api/posts"
    const method = isEditing ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status }),
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    save(form.status)
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
        <input
          id="post-category"
          list="post-category-options"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          placeholder="news"
        />
        <datalist id="post-category-options">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Pick an existing category or type a new one. Leave blank for "news".
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-image">
          Cover image
        </label>
        {form.imageUrl && (
          <div className="relative mb-3 w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.imageUrl}
              alt=""
              className="max-h-48 rounded-lg border-2 border-black dark:border-white"
            />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
              className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              aria-label="Remove image"
            >
              &times;
            </button>
          </div>
        )}
        <input
          id="post-image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleImageChange}
          disabled={uploading}
          className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#22C55E] file:text-black file:font-bold"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {uploading ? "Uploading..." : "Optional. PNG, JPEG, WebP, or GIF, up to 5MB."}
        </p>
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
        <label className="block text-sm font-semibold mb-2 text-black dark:text-white">Content</label>
        <RichTextEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
      </div>

      {isMainAdmin ? (
        <>
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white" htmlFor="post-status">
              Status
            </label>
            <select
              id="post-status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as PostStatus }))}
              className="w-full border-2 border-black dark:border-white rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending Review</option>
              <option value="published">Published (visible on the site)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-6 py-3 font-bold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg px-6 py-3 font-bold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("pending")}
            className="bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-lg px-6 py-3 font-bold disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Submit for Review"}
          </button>
          {form.status === "pending" && (
            <p className="w-full text-xs text-amber-600 dark:text-amber-400">Waiting on a main admin to review.</p>
          )}
          {form.status === "published" && (
            <p className="w-full text-xs text-gray-500 dark:text-gray-400">
              This post is live. Saving changes will pull it back to "Pending Review" until a main admin approves them again.
            </p>
          )}
        </div>
      )}
    </form>
  )
}
