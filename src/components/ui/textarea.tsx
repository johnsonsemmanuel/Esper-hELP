"use client"

import { forwardRef, type TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 
            placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20
            transition-all duration-200 resize-none ${error ? "border-red-400" : ""}
            ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
