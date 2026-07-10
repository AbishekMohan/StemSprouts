import { SignJWT, jwtVerify } from "jose"

const encoder = new TextEncoder()

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("Missing JWT_SECRET environment variable")
  return encoder.encode(secret)
}

export async function signAdminToken(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret())
}

export async function verifyAdminToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.username !== "string") return null
    return { username: payload.username }
  } catch {
    return null
  }
}
