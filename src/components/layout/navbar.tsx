"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

const primaryLinks = [
  { href: "/browse", label: "Browse Campaigns" },
  { href: "/browse?category=business-startup", label: "Business" },
  { href: "/browse?category=community-social", label: "Community" },
  { href: "/how-it-works", label: "How It Works" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, status, signOut } = useAuth()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/browse") return pathname === "/browse"
    return pathname.startsWith(href.split("?")[0])
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-pink-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">H</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              hELP<span className="text-pink-600">Fund</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-pink-600 rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="w-px h-6 bg-gray-200 mx-1" />
                <Link href="/dashboard/campaigns/new">
                  <Button size="sm">Start Campaign</Button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {primaryLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "text-pink-600 bg-pink-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                {status === "authenticated" ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">Dashboard</Button>
                    </Link>
                    <Link href="/dashboard/campaigns/new" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start">Start Campaign</Button>
                    </Link>
                    <button
                      onClick={() => { signOut(); setMobileOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
