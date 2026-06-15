"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"

const categories = [
  { value: "", label: "All Categories" },
  { value: "business-startup", label: "Business & Startup" },
  { value: "community-social", label: "Community & Social" },
  { value: "education-training", label: "Education & Training" },
  { value: "health-medical", label: "Health & Medical" },
  { value: "agriculture-farming", label: "Agriculture & Farming" },
  { value: "technology-innovation", label: "Technology & Innovation" },
  { value: "arts-culture", label: "Arts & Culture" },
  { value: "emergency-crisis", label: "Emergency & Crisis" },
  { value: "environment-sustainability", label: "Environment & Sustainability" },
  { value: "sports-recreation", label: "Sports & Recreation" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "most_funded", label: "Most Funded" },
  { value: "most_donors", label: "Most Supporters" },
  { value: "ending_soon", label: "Ending Soon" },
]

export default function BrowseContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [sort, setSort] = useState("newest")
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.set("q", query)
        if (category) params.set("category", category)
        if (sort) params.set("sort", sort)
        const res = await fetch(`/api/campaigns?${params.toString()}`)
        const data = await res.json()
        setCampaigns(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [query, category, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
            <p className="text-gray-500 mt-1">Discover projects that need your support</p>
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button>Start a Campaign</Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search campaigns..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-pink-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-pink-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                <div className="h-48 bg-gray-100 rounded-xl mb-4" />
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                <div className="h-6 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-2 bg-gray-100 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/campaign/${campaign.slug}`}>
                  <Card className="overflow-hidden h-full">
                    <div className={`h-48 ${campaign.coverImage ? "" : "bg-pink-100"} flex items-center justify-center`}>
                      {campaign.coverImage ? (
                        <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-6xl opacity-40">📋</span>
                      )}
                    </div>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        {campaign.category && (
                          <Badge variant="info">{campaign.category.name}</Badge>
                        )}
                        <Badge variant={campaign.status === "active" ? "success" : "default"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{campaign.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{campaign.story}</p>
                      <div className="space-y-2">
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
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{progressPercentage(campaign.raisedAmount, campaign.goalAmount)}% funded</span>
                          <span>{campaign._count?.donations || 0} supporters</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">{timeAgo(new Date(campaign.createdAt))}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
