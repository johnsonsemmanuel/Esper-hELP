"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"

export default function MyCampaignsPage() {
  const { status } = useAuth()
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
    if (status === "authenticated") fetchCampaigns()
  }, [status, router])

  async function fetchCampaigns() {
    try {
      const res = await fetch("/api/campaigns/mine")
      const data = await res.json()
      setCampaigns(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-500 mt-1">Manage your fundraising campaigns</p>
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button>New Campaign</Button>
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-500 mb-6">Create your first campaign and start raising funds.</p>
            <Link href="/dashboard/campaigns/new">
              <Button>Create Campaign</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden ${
                    campaign.coverImage ? "" : "bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center"
                  }`}>
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
                    <div className="mt-3 flex items-center gap-6 text-sm">
                      <span className="text-gray-500">
                        Raised: <span className="font-semibold text-gray-900">{formatCurrency(campaign.raisedAmount, campaign.currency)}</span>
                      </span>
                      <span className="text-gray-500">
                        Goal: <span className="font-semibold text-gray-900">{formatCurrency(campaign.goalAmount, campaign.currency)}</span>
                      </span>
                      <span className="text-gray-500">
                        Supporters: <span className="font-semibold text-gray-900">{campaign._count?.donations || 0}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
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
