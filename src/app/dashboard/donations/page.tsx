"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, timeAgo } from "@/lib/utils"

export default function DonationsPage() {
  const { status } = useAuth()
  const router = useRouter()
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    if (status === "authenticated") fetchDonations()
  }, [status, router])

  async function fetchDonations() {
    try {
      const res = await fetch("/api/donations/history")
      const data = await res.json()
      setDonations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation History</h1>
        <p className="text-gray-500 mb-8">Your support across all campaigns</p>

        {donations.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No donations yet</h3>
            <p className="text-gray-500">Explore campaigns and support projects that matter to you.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                      {(donation.campaign?.title || "C")[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {donation.campaign?.title || "Campaign"}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{formatCurrency(donation.amount, donation.currency)}</span>
                        <span>•</span>
                        <span>{timeAgo(new Date(donation.createdAt))}</span>
                      </div>
                      {donation.message && (
                        <p className="text-sm text-gray-500 mt-1 italic">&ldquo;{donation.message}&rdquo;</p>
                      )}
                    </div>
                  </div>
                  <Badge variant={donation.status === "successful" ? "success" : "warning"}>
                    {donation.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
