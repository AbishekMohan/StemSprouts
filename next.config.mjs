/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    // Covers any plain Route Handler that doesn't set its own Vary header.
    // Note: Next's App Router unconditionally overwrites Vary with its own
    // RSC-related tokens on rendered pages and metadata routes (robots.ts,
    // sitemap.ts) - confirmed by testing, not fixable from middleware or
    // here. The /md/[[...slug]] route handler that actually serves
    // negotiated Markdown sets `Vary: Accept, Accept-Encoding` itself and is
    // unaffected by that override, which is what matters for the
    // acceptmarkdown.com negotiation this exists for.
    return [
      {
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      },
    ]
  },
}

export default nextConfig
