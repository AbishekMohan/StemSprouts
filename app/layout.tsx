import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Onest, Geist_Mono as V0_Font_Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SITE_URL } from "@/lib/site"

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

// Initialize Onest font with weights 500 and 700
const onest = Onest({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-onest",
})

const SITE_DESCRIPTION =
  "STEM Sprouts is a youth-led nonprofit building a global network of student-run STEM chapters, powered by Pinboard, our free open-source hardware coding platform."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "STEM Sprouts",
  description: SITE_DESCRIPTION,
  icons: { icon: "/stem/favicon.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "STEM Sprouts",
    title: "STEM Sprouts",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/stem/team-workshop.jpeg", width: 1600, height: 1200, alt: "STEM Sprouts students at a hands-on workshop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "STEM Sprouts",
    description: SITE_DESCRIPTION,
    images: ["/stem/team-workshop.jpeg"],
  },
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "STEM Sprouts",
  url: SITE_URL,
  logo: `${SITE_URL}/stem/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.instagram.com/stemsprouts_/",
    "https://www.linkedin.com/company/stemsprouts/",
    "https://www.tiktok.com/@stemsprouts",
    "https://www.facebook.com/share/16ywQJWuVR/?mibextid=wwXIfr",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${onest.variable} font-sans antialiased overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#22C55E] focus:text-black focus:px-4 focus:py-3 focus:rounded-lg focus:font-bold focus:border-2 focus:border-black"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
