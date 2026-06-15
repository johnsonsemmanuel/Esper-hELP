"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const categories = [
  { title: "Business & Startup", href: "/browse?category=business-startup", description: "Launch and grow your venture" },
  { title: "Community & Social", href: "/browse?category=community-social", description: "Support community initiatives" },
  { title: "Education & Training", href: "/browse?category=education-training", description: "Fund learning and development" },
  { title: "Health & Medical", href: "/browse?category=health-medical", description: "Medical and healthcare causes" },
  { title: "Agriculture & Farming", href: "/browse?category=agriculture-farming", description: "Support African agriculture" },
  { title: "Technology & Innovation", href: "/browse?category=technology-innovation", description: "Tech projects and startups" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, status, signOut } = useAuth()
  const pathname = usePathname()

  const isActive = (href: string) => {
    const base = href.split("?")[0]
    return pathname === base
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-4">
      <div className="flex items-center gap-4 h-14 px-3 sm:px-5 rounded-full bg-white/75 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/[0.03] w-full max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight hidden sm:block">
            hELP<span className="text-pink-600">Fund</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-auto">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors inline-flex items-center justify-center no-underline",
                    pathname === "/browse"
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50",
                  )}
                  href="/browse"
                >
                  Browse All
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium",
                    pathname.startsWith("/browse") && !(pathname === "/browse")
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50",
                    "data-[state=open]:text-pink-600 data-[state=open]:bg-pink-50",
                  )}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-80 gap-1 md:w-96 md:grid-cols-2">
                    {categories.map((cat) => (
                      <li key={cat.href}>
                        <NavigationMenuLink
                          href={cat.href}
                          className="block select-none rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600 focus:bg-pink-50 focus:text-pink-600"
                        >
                          <div className="text-sm font-medium leading-none">{cat.title}</div>
                          <p className="text-gray-500 mt-1 text-xs leading-snug">
                            {cat.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors inline-flex items-center justify-center no-underline",
                    pathname === "/how-it-works"
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50",
                  )}
                  href="/how-it-works"
                >
                  How It Works
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link href="/campaigns/new">
                <Button size="sm" className="rounded-full">Start Campaign</Button>
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
                <Button variant="ghost" size="sm" className="rounded-full">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden ml-auto p-2 rounded-full hover:bg-pink-50 transition-colors"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full mt-3 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/browse"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  pathname === "/browse"
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                Browse All
              </Link>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/how-it-works"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  pathname === "/how-it-works"
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                How It Works
              </Link>

              <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                {status === "authenticated" ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start rounded-xl">Dashboard</Button>
                    </Link>
                    <Link href="/dashboard/campaigns/new" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start rounded-xl">Start Campaign</Button>
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
                      <Button variant="outline" className="w-full justify-start rounded-xl">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start rounded-xl">Get Started</Button>
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
