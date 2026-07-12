import Link from "next/link"
import { redirect } from "next/navigation"
import { getAdminSessionFromCookies } from "@/lib/admin-session"
import { listAdminUsers } from "@/lib/admin-users"
import { AdminsList } from "@/components/admin/admins-list"

export const dynamic = "force-dynamic"

export default async function AdminsPage() {
  const session = await getAdminSessionFromCookies()
  if (!session) redirect("/admin/login")
  if (session.role !== "main_admin") redirect("/admin")

  const admins = await listAdminUsers()

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="text-sm font-semibold underline text-black dark:text-white">
          &larr; Back to Posts
        </Link>
        <h1 className="text-2xl font-bold text-black dark:text-white mt-4 mb-8">Admins</h1>
        <AdminsList admins={admins} currentUserId={session.id} />
      </div>
    </main>
  )
}
