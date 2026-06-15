"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"

export default function CampaignDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [donationAmount, setDonationAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [donating, setDonating] = useState(false)

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/campaigns/${params.slug}`)
        const data = await res.json()
        setCampaign(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaign()
  }, [params.slug])

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    if (!donationAmount || parseFloat(donationAmount) < 100) return

    setDonating(true)
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign.id,
          amount: parseFloat(donationAmount),
          donorName: anonymous ? "Anonymous" : donorName,
          donorEmail,
          message,
          anonymous,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setDonating(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-gray-100 rounded-3xl" />
          <div className="h-8 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-full" />
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h2>
        <p className="text-gray-500">This campaign doesn&apos;t exist or has been removed.</p>
      </div>
    )
  }

  const progress = progressPercentage(campaign.raisedAmount, campaign.goalAmount)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Media */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100">
              {campaign.videoUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={campaign.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : campaign.coverImage ? (
                <div className="aspect-video">
                  <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  <span className="text-8xl opacity-30">📸</span>
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                {campaign.category && <Badge variant="info">{campaign.category.name}</Badge>}
                <Badge variant="success">{campaign.status}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>By {campaign.user?.name || "Anonymous"}</span>
                <span>•</span>
                <span>{timeAgo(new Date(campaign.createdAt))}</span>
                {campaign.location && (
                  <>
                    <span>•</span>
                    <span>{campaign.location}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Story</h2>
                <div className="prose prose-gray max-w-none whitespace-pre-wrap leading-relaxed text-gray-600">
                  {campaign.story}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Updates */}
          {campaign.updates?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Updates</h2>
                  <div className="space-y-4">
                    {campaign.updates.map((update: any) => (
                      <div key={update.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <p className="text-gray-700">{update.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{timeAgo(new Date(update.createdAt))}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Donation Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <Card className="p-6">
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-gray-900">
                {formatCurrency(campaign.raisedAmount, campaign.currency)}
              </p>
              <p className="text-gray-500 text-sm">
                raised of {formatCurrency(campaign.goalAmount, campaign.currency)} goal
              </p>
            </div>

            <Progress value={progress} size="lg" className="mb-2" />
            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <span>{progress}% funded</span>
              <span>{campaign._count?.donations || 0} supporters</span>
            </div>

            {campaign.deadline && (
              <div className="text-center text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </div>
            )}

            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[5000, 10000, 25000, 50000, 100000, 250000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`py-2 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                        donationAmount === amount.toString()
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="100"
                />
              </div>

              {!session && (
                <>
                  <Input
                    label="Your Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="John Doe"
                    required={!anonymous}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </>
              )}

              <Textarea
                label="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message of support..."
                rows={3}
              />

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                Donate anonymously
              </label>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={donating}
                disabled={!donationAmount || parseFloat(donationAmount) < 100}
              >
                Donate Now
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secured with 256-bit encryption
              </div>
            </div>
          </Card>

          {/* Share */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share This Campaign</h3>
            <div className="flex gap-2">
              {["WhatsApp", "Twitter", "Facebook", "Copy"].map((platform) => (
                <button
                  key={platform}
                  onClick={() => {
                    const url = window.location.href
                    if (platform === "Copy") {
                      navigator.clipboard.writeText(url)
                    } else {
                      window.open(
                        platform === "WhatsApp"
                          ? `https://wa.me/?text=${encodeURIComponent(url)}`
                          : platform === "Twitter"
                          ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
                          : `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                      )
                    }
                  }}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Donors */}
      {campaign.donations?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Supporters</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {campaign.donations.filter((d: any) => d.status === "successful").slice(0, 6).map((donation: any) => (
              <Card key={donation.id} hover={false} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-white font-bold text-sm">
                    {(donation.donorName || "A")[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {donation.anonymous ? "Anonymous" : donation.donorName || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>Donated {formatCurrency(donation.amount, donation.currency)}</span>
                      <span>•</span>
                      <span>{timeAgo(new Date(donation.createdAt))}</span>
                    </div>
                  </div>
                </div>
                {donation.message && (
                  <p className="text-sm text-gray-500 mt-2 italic">&ldquo;{donation.message}&rdquo;</p>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
