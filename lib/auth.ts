import { SignJWT, jwtVerify } from "jose"

const encoder = new TextEncoder()

export type AdminRole = "main_admin" | "chapter_lead"

export type AdminSession = { id: string; username: string; role: AdminRole }

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("Missing JWT_SECRET environment variable")
  return encoder.encode(secret)
}

export async function signAdminToken(user: AdminSession) {
  return new SignJWT({ id: user.id, username: user.username, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret())
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (
      typeof payload.id !== "string" ||
      typeof payload.username !== "string" ||
      (payload.role !== "main_admin" && payload.role !== "chapter_lead")
    ) {
      return null
    }
    return { id: payload.id, username: payload.username, role: payload.role }
  } catch {
    return null
  }
}
