import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STEM Sprouts",
    short_name: "STEM Sprouts",
    description: "A youth-led nonprofit making hands-on STEM education free and accessible worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#22C55E",
    icons: [
      { src: "/stem/favicon.png", sizes: "192x192", type: "image/png" },
      { src: "/stem/logo.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
