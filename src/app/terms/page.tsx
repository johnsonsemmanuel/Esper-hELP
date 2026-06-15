"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FileText,
  UserCheck,
  ScrollText,
  HeartHandshake,
  Percent,
  Ban,
  Shield,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  {
    title: "1. Acceptance of Terms",
    icon: FileText,
    content:
      "By accessing or using hELP Fund ('the Platform'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, please do not use the Platform. We reserve the right to update these Terms at any time, and continued use of the Platform constitutes acceptance of any changes.",
  },
  {
    title: "2. Account Terms",
    icon: UserCheck,
    content:
      "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as needed. You may not create multiple accounts or use another person's account without permission.",
  },
  {
    title: "3. Campaign Rules",
    icon: ScrollText,
    content:
      "Campaigns must be truthful, transparent, and comply with all applicable laws. Campaign creators ('Organizers') are solely responsible for the content and fulfilment of their campaigns. Prohibited campaigns include those involving illegal activities, misleading claims, hate speech, violence, or content that violates the rights of others. hELP Fund reserves the right to review, suspend, or remove any campaign that violates these rules.",
    subpoints: [
      "Campaigns must accurately represent the purpose for which funds are being raised",
      "Organizers must fulfill promises made to supporters or provide refunds",
      "Campaign funds must be used as described on the campaign page",
      "Organizers must communicate progress updates to supporters",
    ],
  },
  {
    title: "4. Donations & Supporters",
    icon: HeartHandshake,
    content:
      "Donations are voluntary contributions and are generally non-refundable. Supporters acknowledge that their donation is made to support a campaign and not as an investment or purchase of goods/services unless explicitly stated. Supporters must be at least 18 years old or have parental consent. hELP Fund does not guarantee campaign outcomes or Organizer performance.",
  },
  {
    title: "5. Fees & Payment Terms",
    icon: Percent,
    content:
      "hELP Fund charges a 5% platform fee on all donations received. Payment processing fees (2-3%) are charged by third-party payment providers. All fees are deducted before funds are disbursed to Organizers. We reserve the right to modify our fee structure with 30 days' notice. Organizers are responsible for any taxes applicable to funds raised.",
  },
  {
    title: "6. Termination",
    icon: Ban,
    content:
      "We may suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity. Organizers with terminated accounts may be required to return funds to supporters. You may delete your account at any time from your dashboard. Upon termination, you remain responsible for any obligations incurred before account closure.",
  },
  {
    title: "7. Limitation of Liability",
    icon: Shield,
    content:
      "hELP Fund provides the Platform 'as is' and makes no warranties regarding campaign outcomes or Platform availability. To the maximum extent permitted by law, hELP Fund shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Please read these terms carefully before using hELP Fund.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10">
            <p className="text-gray-500 leading-relaxed mb-4">
              These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of hELP Fund&apos;s fundraising
              platform, website, and services (collectively, the &ldquo;Platform&rdquo;). By using the Platform, you enter
              into a binding agreement with hELP Fund.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Last updated: June 15, 2026
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-500 leading-relaxed">{section.content}</p>
                    {"subpoints" in section && section.subpoints && (
                      <ul className="mt-4 space-y-2">
                        {section.subpoints.map((subpoint) => (
                          <li key={subpoint} className="flex items-start gap-2 text-gray-500 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                            {subpoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 bg-gray-50 rounded-2xl border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">Questions About These Terms?</h3>
            <p className="text-sm text-gray-500 mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="sm" className="rounded-full">Contact Us</Button>
              </Link>
              <a href="mailto:support@helpfund.africa">
                <Button variant="outline" size="sm" className="rounded-full">
                  Email Support
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-8 text-center">
            <Link href="/privacy">
              <Button variant="link" className="text-sm">
                Read our Privacy Policy
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
