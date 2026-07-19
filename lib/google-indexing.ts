import { SignJWT, importPKCS8 } from "jose"

type ServiceAccount = { client_email: string; private_key: string }

function getServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed.client_email !== "string" || typeof parsed.private_key !== "string") return null
    return parsed
  } catch {
    console.error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON is not valid JSON")
    return null
  }
}

async function getAccessToken(account: ServiceAccount): Promise<string> {
  const key = await importPKCS8(account.private_key, "RS256")
  const now = Math.floor(Date.now() / 1000)
  const assertion = await new SignJWT({ scope: "https://www.googleapis.com/auth/indexing" })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(account.client_email)
    .setSubject(account.client_email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key)

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  })

  if (!res.ok) throw new Error(`Failed to get Google access token: ${await res.text()}`)
  const data = await res.json()
  return data.access_token
}

/**
 * Tells Google's Indexing API a /news/ URL was published or unpublished, so
 * it can crawl sooner instead of waiting for the next scheduled crawl.
 * No-ops (with a console warning) if GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON
 * isn't configured -- never throws, so it can't block a publish action.
 */
export async function pingGoogleIndexing(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED") {
  const account = getServiceAccount()
  if (!account) {
    console.warn(`Skipping Google Indexing API ping for ${url} (GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON not configured)`)
    return
  }

  try {
    const accessToken = await getAccessToken(account)
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, type }),
    })
    if (!res.ok) {
      console.error(`Google Indexing API ping failed for ${url}: ${await res.text()}`)
    }
  } catch (err) {
    console.error(`Google Indexing API ping errored for ${url}:`, err)
  }
}
