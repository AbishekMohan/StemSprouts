"use client"

import { useState } from "react"
import { Mail, MessageCircle, Link2, Linkedin, Facebook, Check } from "lucide-react"

const iconButtonClass =
  "flex items-center justify-center w-10 h-10 border-2 border-black dark:border-white rounded-full text-black dark:text-white hover:bg-[#22C55E] hover:text-black hover:border-[#22C55E] transition-colors"

export function ArticleShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - nothing more we can do here.
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap" role="group" aria-label="Share this article">
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className={iconButtonClass}
        aria-label="Share via email"
      >
        <Mail className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z" />
        </svg>
      </a>
      <a href={`sms:?&body=${encodedTitle}%20${encodedUrl}`} className={iconButtonClass} aria-label="Share via text message">
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" aria-hidden="true" />
      </a>
      <button type="button" onClick={handleCopyLink} className={iconButtonClass} aria-label="Copy link">
        {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Link2 className="w-4 h-4" aria-hidden="true" />}
      </button>
    </div>
  )
}
