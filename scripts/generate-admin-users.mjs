// Usage: node scripts/generate-admin-users.mjs username1:password1 username2:password2 ...
// Prints the value to paste into ADMIN_USERS in .env.local / Vercel env vars.
import bcrypt from "bcryptjs"

const pairs = process.argv.slice(2)

if (pairs.length === 0) {
  console.error("Usage: node scripts/generate-admin-users.mjs username1:password1 username2:password2 ...")
  process.exit(1)
}

const users = pairs.map((pair) => {
  const separatorIndex = pair.indexOf(":")
  if (separatorIndex === -1) {
    console.error(`Invalid pair "${pair}", expected format username:password`)
    process.exit(1)
  }
  const username = pair.slice(0, separatorIndex)
  const password = pair.slice(separatorIndex + 1)
  return { username, passwordHash: bcrypt.hashSync(password, 12) }
})

const json = JSON.stringify(users)
const encoded = Buffer.from(json, "utf-8").toString("base64")

console.log(encoded)
