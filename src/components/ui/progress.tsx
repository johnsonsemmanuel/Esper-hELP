"use client"

import { motion } from "framer-motion"

interface ProgressProps {
  value: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Progress({ value, className = "", size = "md" }: ProgressProps) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" }

  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]} ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${
          "bg-pink-500"
        }`}
      />
    </div>
  )
}
