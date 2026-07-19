import { redirect } from "next/navigation"
import { getAdminSessionFromCookies } from "@/lib/admin-session"
import { InviteForm } from "@/components/admin/invite-form"

export const dynamic = "force-dynamic"

export default async function InvitePage() {
  const session = await getAdminSessionFromCookies()
  if (!session) redirect("/admin/login")
  if (session.role !== "main_admin") redirect("/admin")

  return <InviteForm />
}
