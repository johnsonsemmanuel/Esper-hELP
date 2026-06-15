"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Mail,
  MessageCircle,
  Globe,
  X,
  Send,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    label: "Email",
    value: "support@helpfund.africa",
    href: "mailto:support@helpfund.africa",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "+233 50 000 0000",
    href: "https://wa.me/233500000000",
    icon: MessageCircle,
  },
  {
    label: "Location",
    value: "Accra, Ghana",
    icon: MapPin,
  },
  {
    label: "Response Time",
    value: "Within 24 hours",
    icon: Clock,
  },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Globe },
  { label: "X (Twitter)", href: "https://x.com", icon: X },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-2 block">Contact</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Have a question, feedback, or need help? We're here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <Card hover={false} className="p-5 flex items-start gap-4 cursor-pointer hover:border-pink-100 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.value}</p>
                        </div>
                      </Card>
                    </a>
                  ) : (
                    <Card hover={false} className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.value}</p>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card hover={false} className="p-5">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        aria-label={link.label}
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card hover={false} className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-500 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Fill out the form and we'll respond as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          error={errors.name}
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          error={errors.email}
                        />
                      </div>
                      <Input
                        label="Subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        error={errors.subject}
                      />
                      <Textarea
                        label="Message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        error={errors.message}
                      />
                      <Button type="submit" size="lg" className="w-full rounded-xl">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2 block">Quick Help</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Before You Reach Out</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Most questions are answered in our FAQ. Check there first for instant answers.
            </p>
          </motion.div>
          <motion.div {...fadeInUp} className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Account Setup", desc: "Learn how to create and manage your account.", href: "/faq#account" },
              { title: "Campaign Creation", desc: "Step-by-step guide to launching your campaign.", href: "/faq#campaigns" },
              { title: "Fees & Withdrawals", desc: "Understanding our fees and payout process.", href: "/faq#fees" },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="p-5 h-full">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </Card>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
