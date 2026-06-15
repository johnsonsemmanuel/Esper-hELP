"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Share2, Shield, MessageCircle, Copy, Smartphone } from "lucide-react"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"

const currencySymbols: Record<string, string> = {
  GHS: "₵",
  NGN: "₦",
  KES: "KSh ",
  ZAR: "R",
  USD: "$",
  EUR: "€",
  GBP: "£",
}

export default function CampaignDetailPage() {
  const params = useParams()
  const { user } = useAuth()
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
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative rounded-3xl overflow-hidden bg-pink-100">
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
                  <ImageIcon className="w-20 h-20 text-pink-300 opacity-30" />
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                {campaign.category && <Badge variant="info">{campaign.category.name}</Badge>}
                <Badge variant={campaign.campaignType === "business" ? "warning" : campaign.campaignType === "personal" ? "success" : "info"}>
                  {campaign.campaignType === "business" ? "Business" : campaign.campaignType === "personal" ? "Personal" : "NGO"}
                </Badge>
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
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {(currencySymbols[campaign.currency] || "₵")}{amount.toLocaleString()}
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

              {!user && (
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
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
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

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                Secured with 256-bit encryption
              </div>
              {campaign.currency === "GHS" && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Smartphone className="w-4 h-4" />
                  Pay with MTN MoMo, AirtelTigo, or card
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share This Campaign</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const url = window.location.href
                  const text = `Support "${campaign.title}" on hELP Fund`
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`)
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => {
                  const url = window.location.href
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Support this campaign on hELP Fund")}&url=${encodeURIComponent(url)}`)
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share
              </button>
              <button
                onClick={() => {
                  const url = window.location.href
                  window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copied to clipboard!")
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors border border-pink-200"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </Card>
        </motion.div>
      </div>

      {campaign.donations?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Supporters</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {campaign.donations.filter((d: any) => d.status === "successful").slice(0, 6).map((donation: any, idx: number) => {
              const badges = [
                { emoji: "🥇", label: "Top Sponsor", class: "bg-amber-100 text-amber-700 border-amber-200" },
                { emoji: "🥈", label: "Top Supporter", class: "bg-gray-100 text-gray-600 border-gray-200" },
                { emoji: "🥉", label: "Top Supporter", class: "bg-orange-100 text-orange-700 border-orange-200" },
              ]
              const badge = idx < 3 ? badges[idx] : null
              return (
                <Card key={donation.id} hover={false} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {(donation.donorName || "A")[0]}
                      </div>
                      {badge && (
                        <span className="absolute -top-1.5 -right-1.5 text-xs">{badge.emoji}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">
                          {donation.anonymous ? "Anonymous" : donation.donorName || "Anonymous"}
                        </p>
                        {badge && (
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.class}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
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
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
