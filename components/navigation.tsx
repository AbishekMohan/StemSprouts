"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { DONATE_URL, NAV_ENTRIES, type NavItem } from "@/lib/nav"

const LINK_CLASS =
  "inline-flex items-center py-2.5 text-[15px] font-bold leading-[20px] hover:text-[#15803d] dark:hover:text-[#22C55E] transition-colors whitespace-nowrap text-black dark:text-white rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d] dark:focus-visible:outline-[#22C55E]"

function NavLink({ item, className, onNavigate }: { item: NavItem; className: string; onNavigate?: () => void }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
        {item.label}
        <span aria-hidden="true">&nbsp;↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link href={item.href} onClick={onNavigate} className={className}>
      {item.label}
    </Link>
  )
}

/**
 * Click-to-toggle disclosure menu (no hover needed). Escape closes it and
 * returns focus to the trigger; clicking or tabbing away closes it too.
 */
function DesktopDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`${LINK_CLASS} gap-1`}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul
          id={menuId}
          className="absolute left-0 top-full mt-2 min-w-[15rem] z-50 bg-white dark:bg-black border-4 border-black dark:border-white rounded-xl p-2 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] list-none"
        >
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                item={item}
                onNavigate={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-md text-[15px] font-bold text-black dark:text-white hover:bg-[#22C55E]/20 focus-visible:bg-[#22C55E]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#15803d] dark:focus-visible:outline-[#22C55E] transition-colors"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function MobileDropdown({ label, items, onNavigate }: { label: string; items: NavItem[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between py-1.5 text-base font-bold text-black dark:text-white"
      >
        {label}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul id={menuId} className="mt-1 ml-3 pl-3 border-l-4 border-[#22C55E] flex flex-col list-none">
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                item={item}
                onNavigate={onNavigate}
                className="block py-2 text-base font-semibold text-black dark:text-white hover:text-[#15803d] dark:hover:text-[#22C55E] transition-colors"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
  const closeMobile = () => setOpen(false)

  return (
    <div className="container mx-auto px-4 pt-2 pb-4 sticky top-2 z-50">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between bg-white dark:bg-black border-4 border-black dark:border-white rounded-xl px-5 py-3 max-w-7xl mx-auto shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]"
      >
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black dark:border-white flex-shrink-0">
            <Image src="/stem/logo.png" alt="STEM Sprouts logo" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg leading-none hidden sm:inline text-black dark:text-white">STEM Sprouts</span>
        </Link>

        <div className="hidden xl:flex items-center gap-4 flex-1 justify-center px-4">
          {NAV_ENTRIES.map((entry) =>
            "items" in entry ? (
              <DesktopDropdown key={entry.label} label={entry.label} items={entry.items} />
            ) : (
              <Link key={entry.label} href={entry.href} className={LINK_CLASS}>
                {entry.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-[#22C55E] text-black hover:bg-[#1ea750] rounded-sm px-5 py-3 font-bold text-sm border-2 border-black dark:border-white transition-colors"
          >
            Donate <span aria-hidden="true">&nbsp;↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center w-10 h-10 border-2 border-black dark:border-white rounded-sm text-black dark:text-white"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="xl:hidden flex items-center justify-center w-10 h-10 border-2 border-black dark:border-white rounded-sm text-black dark:text-white"
          >
            {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="xl:hidden max-w-7xl mx-auto mt-3 bg-white dark:bg-black border-4 border-black dark:border-white rounded-xl p-4 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] flex flex-col gap-3 max-h-[75vh] overflow-y-auto"
        >
          {NAV_ENTRIES.map((entry) =>
            "items" in entry ? (
              <MobileDropdown key={entry.label} label={entry.label} items={entry.items} onNavigate={closeMobile} />
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                onClick={closeMobile}
                className="py-1.5 text-base font-bold text-black dark:text-white hover:text-[#15803d] dark:hover:text-[#22C55E] transition-colors"
              >
                {entry.label}
              </Link>
            ),
          )}
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="bg-[#22C55E] text-black rounded-sm px-5 py-3 font-bold text-sm border-2 border-black dark:border-white text-center"
          >
            Donate <span aria-hidden="true">&nbsp;↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </div>
  )
}
