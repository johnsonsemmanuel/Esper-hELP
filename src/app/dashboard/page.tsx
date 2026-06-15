"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"

export default function DashboardPage() {
  const { user, status } = useAuth()
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [stats, setStats] = useState({ totalCampaigns: 0, totalRaised: 0, totalDonors: 0, activeCampaigns: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    if (status === "authenticated") {
      fetchDashboard()
    }
  }, [status, router])

  async function fetchDashboard() {
    try {
      const res = await fetch("/api/dashboard")
      const data = await res.json()
      setCampaigns(data.campaigns || [])
      setStats(data.stats)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-100 rounded w-48" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name}</p>
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button>New Campaign</Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaigns", value: stats.totalCampaigns.toString(), color: "bg-pink-50 text-pink-600", icon: "📋" },
            { label: "Total Raised", value: formatCurrency(stats.totalRaised), color: "bg-pink-50 text-pink-600", icon: "💰" },
            { label: "Total Supporters", value: stats.totalDonors.toString(), color: "bg-blue-50 text-blue-600", icon: "👥" },
            { label: "Active Campaigns", value: stats.activeCampaigns.toString(), color: "bg-purple-50 text-purple-600", icon: "⚡" },
          ].map((stat) => (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Campaigns</h2>
          <Link href="/dashboard/campaigns" className="text-sm text-pink-600 font-semibold hover:text-pink-700">
            View All
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Start your first campaign</h3>
            <p className="text-gray-500 mb-6">Create a campaign and start raising funds for your project.</p>
            <Link href="/dashboard/campaigns/new">
              <Button>Create Campaign</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-xl flex-shrink-0 ${campaign.coverImage ? "" : "bg-pink-100"} flex items-center justify-center overflow-hidden`}>
                    {campaign.coverImage ? (
                      <img src={campaign.coverImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📋</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{timeAgo(new Date(campaign.createdAt))}</p>
                      </div>
                      <Badge variant={campaign.status === "active" ? "success" : campaign.status === "draft" ? "warning" : "default"}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(campaign.raisedAmount, campaign.currency)}
                        </span>
                        <span className="text-gray-500">
                          raised of {formatCurrency(campaign.goalAmount, campaign.currency)}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-500 rounded-full"
                          style={{ width: `${progressPercentage(campaign.raisedAmount, campaign.goalAmount)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <Link href={`/campaign/${campaign.slug}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                      <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
