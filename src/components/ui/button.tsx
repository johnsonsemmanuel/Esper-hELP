"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { motion } from "framer-motion"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const variants = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25",
  secondary: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25",
  outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  ghost: "text-gray-600 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
}

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className = "", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 
          ${variants[variant]} ${sizes[size]} 
          ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"
