import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GridCardProps {
  children: ReactNode
  className?: string
}

export function GridCard({ children, className = "" }: GridCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent/50",
        className,
      )}
    >
      {children}
    </div>
  )
}
