"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { slugify } from "@/lib/utils"

const categories = [
  { value: "business-startup", label: "Business & Startup" },
  { value: "community-social", label: "Community & Social" },
  { value: "education-training", label: "Education & Training" },
  { value: "health-medical", label: "Health & Medical" },
  { value: "agriculture-farming", label: "Agriculture & Farming" },
  { value: "technology-innovation", label: "Technology & Innovation" },
  { value: "arts-culture", label: "Arts & Culture" },
  { value: "emergency-crisis", label: "Emergency & Crisis" },
  { value: "environment-sustainability", label: "Environment & Sustainability" },
  { value: "sports-recreation", label: "Sports & Recreation" },
]

const currencies = [
  { value: "NGN", label: "₦ NGN - Nigerian Naira" },
  { value: "KES", label: "KSh KES - Kenyan Shilling" },
  { value: "GHS", label: "₵ GHS - Ghanaian Cedi" },
  { value: "ZAR", label: "R ZAR - South African Rand" },
  { value: "USD", label: "$ USD - US Dollar" },
  { value: "EUR", label: "€ EUR - Euro" },
  { value: "GBP", label: "£ GBP - British Pound" },
]

const steps = ["Basic Info", "Story & Media", "Goal & Category", "Review"]

export default function CreateCampaignPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    story: "",
    goalAmount: "",
    currency: "NGN",
    categoryId: "",
    location: "",
    country: "",
    deadline: "",
    coverImage: "",
    videoUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {}
    if (step === 0) {
      if (!form.title.trim()) newErrors.title = "Title is required"
      if (!form.story.trim()) newErrors.story = "Story is required"
      if (form.story.length < 50) newErrors.story = "Story must be at least 50 characters"
    }
    if (step === 2) {
      if (!form.goalAmount || parseFloat(form.goalAmount) < 100) newErrors.goalAmount = "Minimum goal is 100"
      if (!form.categoryId) newErrors.categoryId = "Select a category"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function nextStep() {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit() {
    if (!validateStep()) return
    setLoading(true)
    try {
      const slug = slugify(form.title) + "-" + Date.now().toString(36)
      const res = await fetch("/api/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug,
          goalAmount: parseFloat(form.goalAmount),
          deadline: form.deadline || null,
        }),
      })

      if (!res.ok) throw new Error("Failed to create campaign")
      const data = await res.json()
      router.push(`/campaign/${data.slug}`)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Start a Campaign</h1>
        <p className="text-gray-500 mb-8">Tell your story and raise funds for what matters.</p>

        {/* Steps Progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i <= step ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i <= step ? "text-gray-900" : "text-gray-400"}`}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
          >
            {step === 0 && (
              <div className="space-y-5">
                <Input
                  label="Campaign Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Give your campaign a clear, compelling title"
                  error={errors.title}
                />
                <Textarea
                  label="Your Story"
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  placeholder="Tell people why you're raising funds. Who are you? What will the funds be used for? Why should someone support you? (minimum 50 characters)"
                  rows={8}
                  error={errors.story}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-700 mb-4">
                  Add media to make your campaign stand out. Campaigns with images raise 5x more funds.
                </div>
                <Input
                  label="Cover Image URL"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <Input
                  label="Video URL (YouTube/Vimeo)"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
                {form.coverImage && (
                  <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                    <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Funding Goal"
                    type="number"
                    value={form.goalAmount}
                    onChange={(e) => setForm({ ...form, goalAmount: e.target.value })}
                    placeholder="500000"
                    error={errors.goalAmount}
                  />
                  <Select
                    label="Currency"
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    options={currencies}
                  />
                </div>
                <Select
                  label="Category"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  options={categories}
                  placeholder="Select a category"
                  error={errors.categoryId}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Lagos, Nigeria"
                  />
                  <Input
                    label="Deadline (optional)"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Review Your Campaign</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">Title</span>
                    <span className="font-semibold text-gray-900 text-right max-w-md">{form.title}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">Goal</span>
                    <span className="font-semibold text-gray-900">
                      {form.currency === "NGN" ? "₦" : form.currency === "KES" ? "KSh " : form.currency === "GHS" ? "₵" : "$"}
                      {parseFloat(form.goalAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-gray-900">
                      {categories.find((c) => c.value === form.categoryId)?.label || "Not set"}
                    </span>
                  </div>
                  {form.location && (
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500">Location</span>
                      <span className="font-semibold text-gray-900">{form.location}</span>
                    </div>
                  )}
                  {form.coverImage && (
                    <div className="py-3 border-b border-gray-100">
                      <span className="text-gray-500 block mb-2">Cover Image</span>
                      <img src={form.coverImage} alt="Preview" className="h-32 rounded-xl object-cover" />
                    </div>
                  )}
                  <div className="py-3">
                    <span className="text-gray-500 block mb-2">Story Preview</span>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{form.story}</p>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-sm text-emerald-700">
                  By publishing, you agree to our Terms of Service and confirm that all information is accurate.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button variant="ghost" onClick={prevStep} disabled={step === 0}>
                Back
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                >
                  Save Draft
                </Button>
                {step < steps.length - 1 ? (
                  <Button onClick={nextStep}>Continue</Button>
                ) : (
                  <Button onClick={handleSubmit} loading={loading}>
                    Publish Campaign
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
