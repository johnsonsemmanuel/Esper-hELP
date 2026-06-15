"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${hover ? "hover:shadow-xl hover:border-pink-100" : ""} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}
