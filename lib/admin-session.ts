import { cookies } from "next/headers"
import { verifyAdminToken, type AdminSession } from "@/lib/auth"

/** For use in server components/pages, which get cookies via next/headers rather than a NextRequest. */
export async function getAdminSessionFromCookies(): Promise<AdminSession | null> {
  const token = (await cookies()).get("admin_token")?.value
  return token ? await verifyAdminToken(token) : null
}
