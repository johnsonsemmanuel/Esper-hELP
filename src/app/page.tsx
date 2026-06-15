"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Briefcase, Users, BookOpen, HeartPulse, Sprout, Monitor, ImageIcon, ArrowRight, Sparkles, TrendingUp, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, timeAgo, progressPercentage } from "@/lib/utils"
import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
  ContainerInset,
} from "@/components/ui/container-scroll"

const stats = [
  { label: "Funds Raised", value: "₵850M+" },
  { label: "Active Campaigns", value: "2,400+" },
  { label: "Supporters", value: "50,000+" },
  { label: "Countries", value: "15+" },
]

const categories = [
  { name: "Business & Startup", icon: Briefcase, color: "bg-blue-50 text-blue-600", slug: "business-startup" },
  { name: "Community & Social", icon: Users, color: "bg-purple-50 text-purple-600", slug: "community-social" },
  { name: "Education & Training", icon: BookOpen, color: "bg-pink-50 text-pink-600", slug: "education-training" },
  { name: "Health & Medical", icon: HeartPulse, color: "bg-red-50 text-red-600", slug: "health-medical" },
  { name: "Agriculture", icon: Sprout, color: "bg-green-50 text-green-600", slug: "agriculture-farming" },
  { name: "Technology", icon: Monitor, color: "bg-cyan-50 text-cyan-600", slug: "technology-innovation" },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

const rotatingMessages = [
  "Fund your Business",
  "Back a Dream",
  "Help a Community",
  "Support a Cause",
]

export default function HomePage() {
  const [featuredCampaigns, setFeaturedCampaigns] = useState<any[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setMessageIndex((i) => (i + 1) % rotatingMessages.length), 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/campaigns?limit=3&sort=most_funded")
        const data = await res.json()
        setFeaturedCampaigns(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingFeatured(false)
      }
    }
    fetchFeatured()
  }, [])
  return (
    <div>
      {/* Hero */}
      <ContainerScroll>
        <ContainerSticky className="flex items-center bg-gray-950 overflow-hidden">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

          {/* Ambient glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-svh py-24">
              {/* Left Content */}
              <ContainerAnimated className="flex flex-col justify-center" outputRange={[40, 0]}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-full px-3 py-1.5">
                    <Sparkles className="w-3 h-3" />
                    Africa's fundraising platform
                  </span>
                </motion.div>

                {/* Rotating message */}
                <div className="mb-8">
                  <div className="h-14 sm:h-16 relative">
                    {rotatingMessages.map((msg, i) => (
                      <motion.span
                        key={msg}
                        initial={{ opacity: 0, y: 20 }}
                        animate={i === messageIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white absolute left-0"
                      >
                        {msg}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link href="/register">
                    <Button className="text-sm px-6 h-10 rounded-full shadow-lg shadow-pink-500/25">
                      Start Campaign
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/browse">
                    <Button variant="outline" className="text-sm border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 h-10 rounded-full">
                      Explore
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex items-center gap-6 mt-8 pt-5 border-t border-gray-800"
                >
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label}>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </ContainerAnimated>

              {/* Right - Campaign Card with scroll reveal */}
              <ContainerInset
                insetYRange={[35, 0]}
                insetXRange={[35, 0]}
                roundednessRange={[1000, 24]}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="w-full max-w-md">
                  <div className="bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-800/60 p-8 shadow-2xl shadow-black/40 pointer-events-auto">
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">TechUp Africa</p>
                          <p className="text-gray-500 text-sm">Technology & Innovation</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                        Featured
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Raised</span>
                        <span className="text-white font-bold text-lg">₵12,450,000</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "83%" }}
                          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                          className="h-full bg-pink-500 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Goal: ₵15,000,000</span>
                        <span className="text-pink-400 font-semibold">83%</span>
                      </div>
                    </div>

                    {/* Supporters */}
                    <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-800/60">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 ring-2 ring-gray-900"
                          />
                        ))}
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 border-2 border-gray-900 flex items-center justify-center ring-2 ring-gray-900">
                          <span className="text-pink-400 text-xs font-bold">+42</span>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">46 supporters</span>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20">
                      Support This Campaign
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      Accra, Ghana
                    </div>
                  </div>
                </div>
              </ContainerInset>
            </div>
          </div>
        </ContainerSticky>
      </ContainerScroll>

      {/* Below-hero content */}
      <div className="relative z-10 bg-white">
        {/* Stats Bar */}
        <motion.section {...fadeInUp} className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <motion.div key={stat.label} whileHover={{ scale: 1.05 }} className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Categories */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div {...fadeInUp} className="text-center mb-12">
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Categories</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Fund What Matters to You</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  From business ventures to community causes, find campaigns that resonate with you.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/browse?category=${cat.slug}`}>
                      <Card className="text-center p-6 h-full cursor-pointer">
                        <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                          <cat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div {...fadeInUp} className="text-center mb-16">
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Process</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-gray-500 max-w-xl mx-auto">Three simple steps to start raising funds for your project.</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Create Your Campaign", desc: "Tell your story, set your goal, and add photos or videos. Takes less than 10 minutes.", color: "bg-pink-500" },
                  { step: "02", title: "Share With Supporters", desc: "Share your campaign via WhatsApp, social media, and email. We help you reach more people.", color: "bg-pink-600" },
                  { step: "03", title: "Receive Funds", desc: "Withdraw funds directly to your bank account or mobile money. Multiple payout options.", color: "bg-pink-700" },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100">
                      <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                        <span className="text-white font-bold text-lg">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Campaigns */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div {...fadeInUp} className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Featured</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Campaigns</h2>
                  <p className="text-gray-500">Projects that are making an impact right now</p>
                </div>
                <Link href="/browse">
                  <Button variant="outline" size="sm" className="rounded-full">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {loadingFeatured ? (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                      <div className="h-48 bg-gray-100 rounded-xl mb-4" />
                      <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                      <div className="h-6 bg-gray-100 rounded w-2/3 mb-3" />
                      <div className="h-2 bg-gray-100 rounded mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))
                ) : featuredCampaigns.length === 0 ? (
                  <>
                    {[
                      { title: "SmartFarm Kenya", category: "Agriculture", raised: "₵4.2M", goal: "₵8M", progress: 53, supporters: 128, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop" },
                      { title: "CodeCamp Lagos", category: "Education", raised: "₵6.8M", goal: "₵10M", progress: 68, supporters: 245, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop" },
                      { title: "Green Energy Ghana", category: "Environment", raised: "₵12.1M", goal: "₵15M", progress: 81, supporters: 312, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop" },
                    ].map((campaign, index) => (
                      <motion.div
                        key={campaign.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden h-full">
                          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                          </div>
                          <CardContent>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                                {campaign.category}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{campaign.title}</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Raised: {campaign.raised}</span>
                                <span className="text-gray-500">Goal: {campaign.goal}</span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${campaign.progress}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                  className="h-full bg-pink-500 rounded-full"
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>{campaign.progress}% funded</span>
                                <span>{campaign.supporters} supporters</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  featuredCampaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/campaign/${campaign.slug}`}>
                        <Card className="overflow-hidden h-full cursor-pointer">
                          <div className={`h-48 ${campaign.coverImage ? "" : "bg-pink-100"} flex items-center justify-center overflow-hidden`}>
                            {campaign.coverImage ? (
                              <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-pink-300" />
                            )}
                          </div>
                          <CardContent>
                            <div className="flex items-center gap-2 mb-3">
                              {campaign.category && (
                                <Badge variant="info">{campaign.category.name}</Badge>
                              )}
                              <Badge variant={campaign.status === "active" ? "success" : "default"}>
                                {campaign.campaignType === "business" ? "Business" : campaign.campaignType === "personal" ? "Personal" : "NGO"}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{campaign.title}</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-semibold text-gray-900">
                                  {formatCurrency(campaign.raisedAmount, campaign.currency)}
                                </span>
                                <span className="text-gray-500">
                                  of {formatCurrency(campaign.goalAmount, campaign.currency)}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${progressPercentage(campaign.raisedAmount, campaign.goalAmount)}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                  className="h-full bg-pink-500 rounded-full"
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>{progressPercentage(campaign.raisedAmount, campaign.goalAmount)}% funded</span>
                                <span>{campaign._count?.donations || 0} supporters</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 bg-pink-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div {...fadeInUp}>
                <span className="text-xs font-semibold text-pink-200 uppercase tracking-widest mb-2 block">Get Started</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Bring Your Project to Life?</h2>
                <p className="text-pink-100 mb-8 max-w-lg mx-auto">
                  Join thousands of African businesses and creators who have raised funds on hELP Fund.
                </p>
                <Link href="/register">
                  <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 text-base px-10 h-12 rounded-full shadow-xl">
                    Start Your Campaign Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
    </div>
  )
}
