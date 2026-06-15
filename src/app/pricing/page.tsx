"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  CheckCircle,
  XCircle,
  Percent,
  CreditCard,
  Shield,
  Globe,
  HeadphonesIcon,
  Zap,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const fees = [
  {
    label: "Platform Fee",
    value: "5%",
    description: "Per donation — only charged when you raise funds",
    details: "Industry standard for African fundraising platforms",
    icon: Percent,
  },
  {
    label: "Payment Processing",
    value: "2-3%",
    description: "Standard gateway fees charged by payment providers",
    details: "Visa, Mastercard, MTN MoMo, AirtelTigo, Vodafone Cash",
    icon: CreditCard,
  },
  {
    label: "Monthly Subscription",
    value: "Free",
    description: "No monthly fees, no hidden charges",
    details: "Pay nothing until you raise money",
    icon: Shield,
  },
  {
    label: "Setup Fee",
    value: "Free",
    description: "Creating a campaign costs nothing",
    details: "Start fundraising in minutes",
    icon: CheckCircle,
  },
]

const comparisons = [
  { feature: "Platform Fee", us: "5%", others: "5-12%" },
  { feature: "Monthly Fee", us: "Free", others: "$0-50/month" },
  { feature: "Setup Fee", us: "Free", others: "$0-200" },
  { feature: "Payment Processing", us: "2-3%", others: "2.9% + $0.30" },
  { feature: "Payout Speed", us: "1-3 days", others: "5-14 days" },
  { feature: "Mobile Money Support", us: "Yes", others: "Limited" },
  { feature: "African-Focused", us: "Yes", others: "Often not" },
  { feature: "Customer Support", us: "24/7", others: "Email only" },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">Pricing</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              No hidden fees. No monthly subscriptions. Pay only when you raise funds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fee Cards */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fees.map((fee, index) => (
              <motion.div
                key={fee.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
                    <fee.icon className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{fee.value}</p>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{fee.label}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{fee.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 bg-gray-50 rounded-3xl border border-gray-100 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real Cost Example</h3>
            <p className="text-gray-500 mb-6">If you raise ₵1,000,000 through your campaign:</p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-400 mb-1">You Receive</p>
                <p className="text-2xl font-bold text-gray-900">~₵930,000</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-400 mb-1">Platform Fee (5%)</p>
                <p className="text-2xl font-bold text-gray-900">₵50,000</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <p className="text-sm text-gray-400 mb-1">Processing (~2%)</p>
                <p className="text-2xl font-bold text-gray-900">~₵20,000</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Comparison</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Compare</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We're built for Africa, with pricing that makes sense for African businesses.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-bold text-pink-600 bg-pink-50/50">hELP Fund</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-500">Other Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={row.feature} className={cn("border-b border-gray-50", index % 2 === 0 ? "bg-gray-50/50" : "")}>
                      <td className="py-4 px-6 font-medium text-gray-700">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          {row.us}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-500">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Over 2,400 Campaigns Choose Us</h2>
            <p className="text-gray-500 max-w-xl mx-auto">More than low fees — we're built for your success.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Pan-African Focus", desc: "Built for African businesses, currencies, and mobile money systems." },
              { icon: HeadphonesIcon, title: "24/7 Support", desc: "Real support from real people. WhatsApp, email, or phone." },
              { icon: Zap, title: "Fast Payouts", desc: "Withdraw funds in 1-3 days. No waiting weeks for your money." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Fundraising Today</h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Launch your campaign for free. Only pay when you raise funds.
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
  )
}
