"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, ChevronLeft, Building2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const userTypes = [
  { value: "business", label: "Business Owner", description: "Funding a business, startup, or agency" },
  { value: "individual", label: "Individual", description: "Raising funds for a personal project or passion" },
  { value: "nonprofit", label: "Nonprofit / NGO", description: "Raising for a charitable organization" },
  { value: "creator", label: "Creator / Artist", description: "Funding creative projects and art" },
]

const goals = [
  { value: "launch", label: "Launch a project or business" },
  { value: "grow", label: "Grow an existing venture" },
  { value: "emergency", label: "Emergency / medical funds" },
  { value: "community", label: "Community or social cause" },
  { value: "education", label: "Education or training" },
  { value: "other", label: "Something else" },
]

const hearAbout = [
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or family" },
  { value: "search", label: "Search engine" },
  { value: "ad", label: "Advertisement" },
  { value: "news", label: "News or article" },
  { value: "other", label: "Other" },
]

type Step = "questions" | "business" | "account" | "review"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("questions")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Onboarding questions
  const [userType, setUserType] = useState("")
  const [goal, setGoal] = useState("")
  const [location, setLocation] = useState("")
  const [referral, setReferral] = useState("")

  // Business details
  const [businessName, setBusinessName] = useState("")
  const [businessRegNumber, setBusinessRegNumber] = useState("")
  const [businessTin, setBusinessTin] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")

  // Account info
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isBusiness = userType === "business"
  const businessComplete = !isBusiness || (businessName && businessRegNumber && businessTin && businessAddress)
  const questionsComplete = userType && goal && location && referral
  const accountComplete = name && email && password.length >= 8

  function getStepProgress(): string {
    if (step === "questions") return "25%"
    if (step === "business") return "50%"
    if (step === "account") return "75%"
    return "100%"
  }

  function handleNextBusiness() {
    setStep("account")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          userType,
          goal,
          location,
          referral,
          businessName: isBusiness ? businessName : undefined,
          businessRegNumber: isBusiness ? businessRegNumber : undefined,
          businessTin: isBusiness ? businessTin : undefined,
          businessAddress: isBusiness ? businessAddress : undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-pink-50 p-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-100">
            <motion.div
              className="h-full bg-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: getStepProgress() }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                {step !== "questions" && (
                  <button
                    onClick={() => {
                      if (step === "business") setStep("questions")
                      else if (step === "account") setStep(isBusiness ? "business" : "questions")
                      else if (step === "review") setStep("account")
                    }}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-2"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <h1 className="text-2xl font-bold text-gray-900">
                  {step === "questions" && "Tell us about yourself"}
                  {step === "business" && "Business Details"}
                  {step === "account" && "Create your account"}
                  {step === "review" && "Review & finish"}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {step === "questions" && "Help us personalize your experience"}
                  {step === "business" && "We need a few details to verify your business"}
                  {step === "account" && "Set up your login credentials"}
                  {step === "review" && "Make sure everything looks right"}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${["questions", "business", "account", "review"].indexOf(step) >= 0 ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-600"}`}>1</span>
                <div className={`w-6 h-0.5 ${["business", "account", "review"].includes(step) ? "bg-pink-300" : "bg-gray-200"}`} />
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${["business", "account", "review"].includes(step) ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-400"}`}>2</span>
                <div className={`w-6 h-0.5 ${["account", "review"].includes(step) ? "bg-pink-300" : "bg-gray-200"}`} />
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${["account", "review"].includes(step) ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-400"}`}>3</span>
                <div className={`w-6 h-0.5 ${step === "review" ? "bg-pink-300" : "bg-gray-200"}`} />
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === "review" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-400"}`}>4</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Pre-onboarding Questions */}
                {step === "questions" && (
                  <motion.div
                    key="questions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        I am a... <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {userTypes.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setUserType(t.value)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              userType === t.value
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-900">{t.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{t.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        What&apos;s your main goal? <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {goals.map((g) => (
                          <button
                            key={g.value}
                            type="button"
                            onClick={() => setGoal(g.value)}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                              goal === g.value
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              goal === g.value ? "border-pink-500 bg-pink-500" : "border-gray-300"
                            }`}>
                              {goal === g.value && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="text-sm text-gray-700">{g.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Where are you located? (Country) <span className="text-pink-500">*</span>
                      </label>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ghana, Nigeria, Kenya..."
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        How did you hear about us? <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {hearAbout.map((h) => (
                          <button
                            key={h.value}
                            type="button"
                            onClick={() => setReferral(h.value)}
                            className={`flex items-center justify-center p-3 rounded-xl border-2 text-sm transition-all ${
                              referral === h.value
                                ? "border-pink-500 bg-pink-50 text-pink-700 font-medium"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {h.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      disabled={!questionsComplete}
                      onClick={() => setStep(isBusiness ? "business" : "account")}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 1.5: Business Details (only for business users) */}
                {step === "business" && (
                  <motion.div
                    key="business"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100">
                      <Building2 className="h-8 w-8 text-pink-600 flex-shrink-0" />
                      <p className="text-sm text-pink-800">
                        Business accounts require verification details. This information is kept secure and used only for compliance.
                      </p>
                    </div>

                    <Input
                      label="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your registered business name"
                      required
                    />
                    <Input
                      label="Business Registration Number"
                      value={businessRegNumber}
                      onChange={(e) => setBusinessRegNumber(e.target.value)}
                      placeholder="e.g. RC-123456, BN-7890"
                      required
                    />
                    <Input
                      label="Tax Identification Number (TIN)"
                      value={businessTin}
                      onChange={(e) => setBusinessTin(e.target.value)}
                      placeholder="e.g. TIN-1234567890"
                      required
                    />
                    <Input
                      label="Business Address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Registered business address"
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate of Incorporation / Business Document
                      </label>
                      <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:border-pink-300 transition-colors cursor-pointer">
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Upload business document (optional)</p>
                          <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      disabled={!businessComplete}
                      onClick={handleNextBusiness}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Account Info */}
                {step === "account" && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <Input
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                    <Input
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                    />
                    {password.length > 0 && password.length < 8 && (
                      <p className="text-xs text-amber-600">Password must be at least 8 characters</p>
                    )}

                    <Button
                      type="button"
                      className="w-full"
                      disabled={!accountComplete}
                      onClick={() => setStep("review")}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Account</p>
                        <p className="text-sm text-gray-900 mt-1">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Profile</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {userTypes.find((t) => t.value === userType)?.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          Goal: {goals.find((g) => g.value === goal)?.label}
                        </p>
                        <p className="text-sm text-gray-500">Location: {location}</p>
                      </div>
                      {isBusiness && (
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Business</p>
                          <p className="text-sm text-gray-900 mt-1">{businessName}</p>
                          <p className="text-sm text-gray-500">Reg: {businessRegNumber}</p>
                          <p className="text-sm text-gray-500">TIN: {businessTin}</p>
                          <p className="text-sm text-gray-500">{businessAddress}</p>
                        </div>
                      )}
                    </div>

                    <Button type="submit" loading={loading} className="w-full">
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-600 font-semibold hover:text-pink-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
