"use client"

import { forwardRef, type SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20
            transition-all duration-200 ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Select.displayName = "Select"
