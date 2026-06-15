"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ChevronDown,
  ArrowRight,
  UserPlus,
  Megaphone,
  Percent,
  HeartHandshake,
  Wallet,
  Shield,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "account",
    label: "Account",
    icon: UserPlus,
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Get Started' in the top right corner. You can sign up using your email address or Google account. Verification takes less than a minute.",
      },
      {
        q: "Is registration free?",
        a: "Yes, creating an account on hELP Fund is completely free. There are no charges for signing up or browsing campaigns.",
      },
      {
        q: "Can I have both a donor and campaigner account?",
        a: "Yes, your single account lets you create campaigns and donate to others. You can switch between roles from your dashboard.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Sign In' and select 'Forgot Password'. We'll send a reset link to your registered email address.",
      },
    ],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
    questions: [
      {
        q: "How do I start a campaign?",
        a: "Click 'Start a Campaign' from your dashboard. Fill in your campaign details, set your goal, upload photos, and submit for review. Most campaigns go live within 24 hours.",
      },
      {
        q: "Can I edit my campaign after it's live?",
        a: "Absolutely. You can edit your campaign story, photos, and goal amount anytime from your campaign dashboard.",
      },
      {
        q: "How long can my campaign run?",
        a: "Campaigns can run for up to 60 days. You can extend the duration if needed from your dashboard.",
      },
      {
        q: "What types of campaigns are allowed?",
        a: "We support business ventures, community projects, education, health, agriculture, technology, arts, and more. Check our Terms of Service for restricted categories.",
      },
    ],
  },
  {
    id: "fees",
    label: "Fees & Pricing",
    icon: Percent,
    questions: [
      {
        q: "What fees does hELP Fund charge?",
        a: "We charge a 5% platform fee per donation. Payment processing fees (2-3%) are charged by our payment providers. There are no monthly or setup fees.",
      },
      {
        q: "Why is there a 5% platform fee?",
        a: "The platform fee helps us maintain and improve the platform, provide customer support, and build tools to help your campaign succeed.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No. We believe in transparent pricing. The 5% platform fee and payment processing costs are the only charges you'll ever pay.",
      },
      {
        q: "When do I pay the fee?",
        a: "Fees are deducted automatically from each donation when you withdraw. If you don't raise funds, you pay nothing.",
      },
    ],
  },
  {
    id: "donations",
    label: "Donations",
    icon: HeartHandshake,
    questions: [
      {
        q: "How can supporters donate?",
        a: "Supporters can donate via mobile money (MTN MoMo, Vodafone Cash, AirtelTigo Money), credit/debit cards (Visa, Mastercard), and bank transfers.",
      },
      {
        q: "Is there a minimum donation amount?",
        a: "The minimum donation is ₵10 or equivalent in your currency. There is no maximum donation limit.",
      },
      {
        q: "Can I get a refund on a donation?",
        a: "Donations are generally non-refundable. If you believe an error has occurred, contact our support team within 7 days and we'll investigate.",
      },
      {
        q: "Are donations secure?",
        a: "Yes. All transactions are encrypted and processed through secure payment gateways. We never store your payment details.",
      },
    ],
  },
  {
    id: "withdrawals",
    label: "Withdrawals",
    icon: Wallet,
    questions: [
      {
        q: "When can I withdraw funds?",
        a: "You can withdraw funds at any time, even while your campaign is active. There's no waiting period and no minimum withdrawal amount.",
      },
      {
        q: "How do I withdraw funds?",
        a: "Go to your campaign dashboard, click 'Withdraw', and select your payout method — bank account or mobile money. Funds arrive within 1-3 business days.",
      },
      {
        q: "What currencies do you support?",
        a: "We currently support GHS (Ghana Cedis), NGN (Naira), KES (Kenyan Shillings), and USD. More currencies coming soon.",
      },
      {
        q: "What if I don't reach my goal?",
        a: "You keep all funds raised regardless of whether you reach your goal. There's no all-or-nothing requirement on hELP Fund.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Trust",
    icon: Shield,
    questions: [
      {
        q: "Is my personal information safe?",
        a: "Yes. We use industry-standard encryption to protect your data. We never share your personal information without your consent.",
      },
      {
        q: "How do you verify campaigns?",
        a: "Every campaign is manually reviewed by our team before going live. We verify campaigner identity and review content to ensure legitimacy.",
      },
      {
        q: "What if a campaign is fraudulent?",
        a: "If you suspect a campaign is fraudulent, please report it immediately using the 'Report' button on the campaign page or contact our support team.",
      },
      {
        q: "Do you comply with data protection laws?",
        a: "Yes, we comply with applicable data protection regulations. See our Privacy Policy for detailed information on how we handle your data.",
      },
    ],
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
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm pb-4 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("account")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const currentCategory = categories.find((cat) => cat.id === activeCategory)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">FAQ</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Everything you need to know about hELP Fund. Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-pink-400 underline underline-offset-2 hover:text-pink-300">
                Contact us
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 lg:mb-4 px-3">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenItems({}) }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                    activeCategory === cat.id
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  <cat.icon className="w-4 h-4 flex-shrink-0" />
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* FAQ Items */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCategory && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                      <currentCategory.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{currentCategory.label}</h2>
                      <p className="text-sm text-gray-400">{currentCategory.questions.length} questions</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 px-5">
                    {currentCategory.questions.map((faq, index) => (
                      <FaqItem
                        key={index}
                        question={faq.q}
                        answer={faq.a}
                        open={openItems[`${currentCategory.id}-${index}`] || false}
                        onToggle={() => toggleItem(currentCategory.id, index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Can't find the answer you're looking for? Reach out to our support team and we'll get back to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="rounded-full">Contact Support</Button>
              </Link>
              <a href="mailto:support@helpfund.africa">
                <Button variant="outline" className="rounded-full">
                  Email Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
