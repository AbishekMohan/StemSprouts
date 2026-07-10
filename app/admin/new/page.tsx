import { PostForm } from "@/components/admin/post-form"

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-8">New Post</h1>
        <PostForm />
      </div>
    </main>
  )
}
