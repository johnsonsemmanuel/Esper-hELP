interface BadgeProps {
  children: string
  variant?: "default" | "success" | "warning" | "danger" | "info"
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-pink-100 text-pink-700",
  warning: "bg-pink-100 text-pink-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  )
}
