"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Shield,
  Database,
  Share2,
  Lock,
  Cookie,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  {
    title: "1. Information We Collect",
    icon: Database,
    content:
      "We collect information you provide directly when creating an account or campaign, including your name, email address, phone number, and payment information. We also automatically collect certain technical information when you use the Platform, such as your IP address, browser type, device information, and usage patterns. Campaign creators may provide additional content including photos, videos, and campaign descriptions.",
  },
  {
    title: "2. How We Use Your Information",
    icon: Shield,
    content:
      "We use your information to operate, maintain, and improve the Platform, process transactions, send notifications and updates, provide customer support, and detect and prevent fraud. We may use your email address to send service-related announcements and promotional communications (with your consent). Campaign information you provide will be publicly displayed on your campaign page.",
    subpoints: [
      "Process and manage your account and campaigns",
      "Process donations and withdrawals securely",
      "Send campaign updates and progress notifications",
      "Improve and personalize your experience",
      "Comply with legal obligations",
    ],
  },
  {
    title: "3. Information Sharing",
    icon: Share2,
    content:
      "We do not sell your personal information to third parties. We may share your information with trusted service providers who help us operate the Platform (payment processors, cloud hosting, analytics), when required by law, or with your explicit consent. Campaign supporters will see the campaigner's name and campaign details but not their personal contact information unless the campaigner chooses to share it.",
  },
  {
    title: "4. Data Security",
    icon: Lock,
    content:
      "We implement industry-standard security measures to protect your information, including SSL/TLS encryption for data transmission, secure data storage, and regular security audits. Payment information is processed and stored by our PCI-compliant payment partners. While we take every precaution, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies & Tracking",
    icon: Cookie,
    content:
      "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide essential platform functionality. You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality. We may use analytics cookies from third-party providers to understand how users interact with the Platform.",
  },
  {
    title: "6. Your Rights & Choices",
    icon: MessageCircle,
    content:
      "You have the right to access, update, or delete your personal information at any time through your account settings. You may opt out of promotional emails by clicking the unsubscribe link in any email we send. You can request a copy of your data or ask us to delete your account by contacting our support team. We will respond to your request within 30 days.",
    subpoints: [
      "Access and export your personal data",
      "Correct or update your information",
      "Delete your account and associated data",
      "Opt out of marketing communications",
      "Withdraw consent where applicable",
    ],
  },
  {
    title: "7. Contact Us",
    icon: MessageCircle,
    content:
      "If you have questions about this Privacy Policy or how we handle your data, please contact us. We're committed to protecting your privacy and will respond promptly to any concerns.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">Privacy</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              How we collect, use, and protect your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10">
            <p className="text-gray-500 leading-relaxed mb-4">
              At hELP Fund, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our fundraising platform.
            </p>
            <p className="text-gray-500 leading-relaxed">
              By using hELP Fund, you consent to the practices described in this policy.
              Last updated: June 15, 2026
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.slice(0, 6).map((section, index) => (
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

          {/* Contact section with CTA */}
          <motion.div {...fadeInUp} className="mt-12 bg-gray-50 rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{sections[6].title}</h2>
                <p className="text-gray-500 leading-relaxed mb-4">{sections[6].content}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact">
                    <Button size="sm" className="rounded-full">Contact Us</Button>
                  </Link>
                  <a href="mailto:support@helpfund.africa">
                    <Button variant="outline" size="sm" className="rounded-full">
                      support@helpfund.africa
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-8 text-center">
            <Link href="/terms">
              <Button variant="link" className="text-sm">
                Read our Terms of Service
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
