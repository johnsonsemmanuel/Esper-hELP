"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import {
  PenLine,
  Share2,
  Wallet,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  Percent,
  CreditCard,
  Shield,
  BarChart3,
  Users,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Create Your Campaign",
    description:
      "Tell your story, set your fundraising goal, and upload photos or videos. It takes less than 10 minutes to get your campaign live and ready to share.",
    icon: PenLine,
    color: "bg-pink-500",
    features: [
      "Custom campaign page with your story",
      "Goal tracking and progress updates",
      "Multiple media upload options",
      "Real-time campaign dashboard",
    ],
  },
  {
    number: "02",
    title: "Share with Supporters",
    description:
      "Share your campaign via WhatsApp, email, and social media. We provide tools to help you reach more people and grow your supporter network.",
    icon: Share2,
    color: "bg-pink-600",
    features: [
      "One-click sharing to social platforms",
      "Custom referral links",
      "Email campaign tools",
      "WhatsApp share integration",
    ],
  },
  {
    number: "03",
    title: "Receive Funds",
    description:
      "Withdraw funds directly to your bank account or mobile money. Multiple payout options available. Funds are released securely as donations come in.",
    icon: Wallet,
    color: "bg-pink-700",
    features: [
      "Bank account and mobile money payouts",
      "Secure fund holding and release",
      "Transparent fee structure",
      "Withdraw anytime, no minimum hold",
    ],
  },
]

const fees = [
  {
    label: "Platform Fee",
    value: "5%",
    description: "Per donation to keep the platform running",
    icon: Percent,
  },
  {
    label: "Payment Processing",
    value: "2-3%",
    description: "Standard payment gateway fees apply",
    icon: CreditCard,
  },
  {
    label: "Monthly Charges",
    value: "Free",
    description: "No monthly subscription or hidden fees",
    icon: Shield,
  },
  {
    label: "Setup Fee",
    value: "Free",
    description: "Creating a campaign is always free",
    icon: CheckCircle,
  },
]

const faqs = [
  {
    q: "How long does it take to set up a campaign?",
    a: "Most campaigns can be created in under 10 minutes. You'll need your campaign details, photos, and a brief story. Once submitted, our team reviews and approves campaigns within 24 hours.",
  },
  {
    q: "When can I withdraw funds?",
    a: "You can withdraw funds at any time, even while your campaign is still active. Withdrawals are processed within 1-3 business days to your bank account or mobile money wallet.",
  },
  {
    q: "What happens if I don't reach my goal?",
    a: "No problem! With hELP Fund, you keep all funds raised regardless of whether you reach your goal. There are no all-or-nothing requirements.",
  },
  {
    q: "Can I edit my campaign after it's live?",
    a: "Yes, you can edit your campaign details, photos, and story anytime from your campaign dashboard. Changes to your goal amount can also be adjusted if needed.",
  },
  {
    q: "How do supporters pay?",
    a: "Supporters can donate using mobile money, credit/debit cards, or bank transfers. We currently support MTN Mobile Money, Vodafone Cash, AirtelTigo Money, Visa, Mastercard, and bank transfers.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold text-gray-900">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4",
            open && "rotate-180",
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-gray-500 pb-5 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">How It Works</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Raise Funds in Three Simple Steps</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              hELP Fund makes it easy to launch, share, and grow your fundraising campaign. No technical skills required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center shadow-lg shadow-pink-500/20`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                      Step {step.number}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 text-center">
                    <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-white font-bold text-3xl">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Fees</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We believe in clear, upfront pricing. No hidden fees, no surprises.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fees.map((fee, index) => (
              <motion.div
                key={fee.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false} className="text-center p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
                    <fee.icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{fee.value}</p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{fee.label}</p>
                  <p className="text-xs text-gray-400">{fee.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeInUp} className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="link" className="text-sm">
                View full pricing details
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose hELP Fund?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built for African businesses, by people who understand the landscape.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Real-Time Dashboard", desc: "Track donations, supporters, and progress from your campaign dashboard." },
              { icon: Users, title: "Community Powered", desc: "Tap into a growing community of supporters ready to back African projects." },
              { icon: Globe, title: "Pan-African Reach", desc: "Accept donations from supporters across Africa and the diaspora." },
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Got questions? We've got answers.</p>
          </motion.div>
          <motion.div {...fadeInUp} className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 px-6">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.q}
                answer={faq.a}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-8">
            <Link href="/faq">
              <Button variant="link" className="text-sm">
                View all FAQs
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Campaign?</h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Join thousands of African businesses and creators who have raised funds on hELP Fund. It's free to start.
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
