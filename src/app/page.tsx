"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Active Campaigns", value: "2,400+" },
  { label: "Funds Raised", value: "₦850M+" },
  { label: "Supporters", value: "50,000+" },
  { label: "Countries", value: "15+" },
]

const categories = [
  { name: "Business & Startup", icon: "🚀", color: "bg-blue-50 text-blue-600", slug: "business-startup" },
  { name: "Community & Social", icon: "🤝", color: "bg-purple-50 text-purple-600", slug: "community-social" },
  { name: "Education & Training", icon: "📚", color: "bg-pink-50 text-pink-600", slug: "education-training" },
  { name: "Health & Medical", icon: "❤️", color: "bg-red-50 text-red-600", slug: "health-medical" },
  { name: "Agriculture", icon: "🌱", color: "bg-green-50 text-green-600", slug: "agriculture-farming" },
  { name: "Technology", icon: "💻", color: "bg-cyan-50 text-cyan-600", slug: "technology-innovation" },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <span className="text-sm font-medium text-pink-300">Trusted across Africa</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Raise Funds for What{" "}
                <span className="text-pink-400">
                  Matters Most
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg"
              >
                The fundraising platform built for African businesses and agencies. 
                Launch your campaign in minutes, reach global supporters, and bring your vision to life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/register">
                  <Button size="lg" className="text-base px-8">
                    Start Your Campaign
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" size="lg" className="text-base border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8">
                    Explore Campaigns
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-800"
              >
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                      <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-pink-400 text-lg">₦</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">TechUp Africa</p>
                        <p className="text-gray-400 text-sm">Technology & Innovation</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Raised</span>
                        <span className="text-white font-semibold">₦12,450,000</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-pink-500 rounded-full" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Goal: ₦15,000,000</span>
                        <span className="text-pink-400">83%</span>
                      </div>
                    </div>
                    <div className="flex -space-x-2 pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 border-2 border-gray-800 flex items-center justify-center">
                        <span className="text-pink-400 text-xs font-semibold">+42</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section {...fadeInUp} className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fund What Matters to You
            </h2>
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
                  <Card className="text-center p-6 h-full">
                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3 text-xl`}>
                      {cat.icon}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three simple steps to start raising funds for your project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Campaign",
                desc: "Tell your story, set your goal, and add photos or videos. Takes less than 10 minutes.",
                color: "bg-pink-500",
              },
              {
                step: "02",
                title: "Share With Supporters",
                desc: "Share your campaign via WhatsApp, social media, and email. We help you reach more people.",
                color: "bg-pink-600",
              },
              {
                step: "03",
                title: "Receive Funds",
                desc: "Withdraw funds directly to your bank account or mobile money. Multiple payout options.",
                color: "bg-pink-700",
              },
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

      {/* Featured Campaigns Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Campaigns</h2>
              <p className="text-gray-500">Projects that are making an impact right now</p>
            </div>
            <Link href="/browse">
              <Button variant="outline" size="sm">
                View All
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "SmartFarm Kenya", category: "Agriculture", raised: "₦4.2M", goal: "₦8M", progress: 53, supporters: 128, image: "" },
              { title: "CodeCamp Lagos", category: "Education", raised: "₦6.8M", goal: "₦10M", progress: 68, supporters: 245, image: "" },
              { title: "Green Energy Ghana", category: "Environment", raised: "₦12.1M", goal: "₦15M", progress: 81, supporters: 312, image: "" },
            ].map((campaign, index) => (
              <motion.div
                key={campaign.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="h-48 bg-pink-100 flex items-center justify-center">
                    <span className="text-6xl opacity-30">📸</span>
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-pink-700 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Bring Your Project to Life?
            </h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Join thousands of African businesses and creators who have raised funds on hELP Fund.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 text-base px-10">
                Start Your Campaign Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
