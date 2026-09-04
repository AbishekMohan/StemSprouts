import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest"

// Build a minimal chainable fake mirroring the subset of the Supabase
// query builder that lib/rate-limit.ts actually calls, so these tests
// verify the query shape (table, filters, count/insert/delete calls)
// without touching a real database.
function makeSupabaseMock() {
  const calls: Record<string, unknown[]> = {}
  const record = (name: string, args: unknown[]) => {
    calls[name] = calls[name] ?? []
    calls[name].push(args)
  }

  let selectCountResult = 0

  const selectChain = {
    eq: vi.fn(function (this: unknown, ...args: unknown[]) {
      record("select.eq", args)
      return selectChain
    }),
    gte: vi.fn(function (this: unknown, ...args: unknown[]) {
      record("select.gte", args)
      return Promise.resolve({ count: selectCountResult })
    }),
  }

  const deleteChain = {
    eq: vi.fn(function (this: unknown, ...args: unknown[]) {
      record("delete.eq", args)
      return deleteChain
    }),
    lt: vi.fn(function (this: unknown, ...args: unknown[]) {
      record("delete.lt", args)
      return Promise.resolve({})
    }),
  }

  const table = {
    select: vi.fn((...args: unknown[]) => {
      record("select", args)
      return selectChain
    }),
    delete: vi.fn(() => {
      record("delete", [])
      return deleteChain
    }),
    insert: vi.fn((...args: unknown[]) => {
      record("insert", args)
      return Promise.resolve({})
    }),
  }

  const client = { from: vi.fn((...args: unknown[]) => {
    record("from", args)
    return table
  }) }

  return {
    client,
    calls,
    setCount: (n: number) => {
      selectCountResult = n
    },
  }
}

const mock = makeSupabaseMock()

vi.mock("@/lib/supabase-admin", () => ({
  getSupabaseAdmin: () => mock.client,
}))

let isRateLimited: (typeof import("./rate-limit"))["isRateLimited"]
let recordFailedAttempt: (typeof import("./rate-limit"))["recordFailedAttempt"]
let getClientIp: (typeof import("./rate-limit"))["getClientIp"]
let MAX_ATTEMPTS: (typeof import("./rate-limit"))["MAX_ATTEMPTS"]

beforeAll(async () => {
  ;({ isRateLimited, recordFailedAttempt, getClientIp, MAX_ATTEMPTS } = await import("./rate-limit"))
})

beforeEach(() => {
  mock.client.from.mockClear()
  mock.setCount(0)
})

describe("getClientIp", () => {
  it("takes the first entry from x-forwarded-for", () => {
    const req = new Request("https://example.com", { headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" } })
    expect(getClientIp(req)).toBe("1.2.3.4")
  })

  it("falls back to 'unknown' with no header", () => {
    const req = new Request("https://example.com")
    expect(getClientIp(req)).toBe("unknown")
  })
})

describe("isRateLimited", () => {
  it("queries the login_attempts table for this ip", async () => {
    mock.setCount(0)
    await isRateLimited("9.9.9.9")
    expect(mock.client.from).toHaveBeenCalledWith("login_attempts")
    expect(mock.calls["select.eq"][0]).toEqual(["ip", "9.9.9.9"])
  })

  it("returns false when under the threshold", async () => {
    mock.setCount(MAX_ATTEMPTS - 1)
    expect(await isRateLimited("1.1.1.1")).toBe(false)
  })

  it("returns true at or above the threshold", async () => {
    mock.setCount(MAX_ATTEMPTS)
    expect(await isRateLimited("1.1.1.1")).toBe(true)
  })
})

describe("recordFailedAttempt", () => {
  it("clears stale rows for the ip before inserting a new one", async () => {
    await recordFailedAttempt("2.2.2.2")
    expect(mock.calls["delete.eq"][0]).toEqual(["ip", "2.2.2.2"])
    expect(mock.calls["insert"][0]).toEqual([{ ip: "2.2.2.2" }])
  })
})
