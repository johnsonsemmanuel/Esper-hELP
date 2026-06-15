import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/providers"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "hELP Fund - Africa's Fundraising Platform for Businesses",
  description:
    "Raise funds for your business, agency, or project. hELP Fund connects African businesses with global supporters.",
  keywords: ["fundraising", "crowdfunding", "Africa", "business funding", "donations"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased bg-gray-50 text-gray-900`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
