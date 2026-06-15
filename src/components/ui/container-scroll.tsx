"use client"

import * as React from "react"
import {
  type HTMLMotionProps,
  type MotionValue,
  type Variants,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

const variants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)

function useContainerScroll() {
  const ctx = React.useContext(ContainerScrollContext)
  if (!ctx) throw new Error("useContainerScroll must be used within ContainerScroll")
  return ctx
}

export function ContainerScroll({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative min-h-svh w-full", className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

interface ContainerAnimatedProps extends HTMLMotionProps<"div"> {
  inputRange?: number[]
  outputRange?: number[]
}

export const ContainerAnimated = React.forwardRef<HTMLDivElement, ContainerAnimatedProps>(
  ({ className, transition, style, inputRange = [0.2, 0.8], outputRange = [80, 0], ...props }, ref) => {
    const { scrollYProgress } = useContainerScroll()
    const y = useTransform(scrollYProgress, inputRange, outputRange)
    return (
      <motion.div
        ref={ref}
        className={cn("", className)}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ y, ...style }}
        transition={{ ...SPRING_TRANSITION, ...transition }}
        {...props}
      />
    )
  },
)
ContainerAnimated.displayName = "ContainerAnimated"

export const ContainerSticky = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sticky left-0 top-0 min-h-svh w-full", className)} {...props} />
  ),
)
ContainerSticky.displayName = "ContainerSticky"

interface ContainerInsetProps extends HTMLMotionProps<"div"> {
  insetYRange?: [number, number]
  insetXRange?: [number, number]
  roundednessRange?: [number, number]
}

export const ContainerInset = React.forwardRef<HTMLDivElement, ContainerInsetProps>(
  (
    {
      className,
      style,
      insetYRange = [45, 0],
      insetXRange = [45, 0],
      roundednessRange = [1000, 16],
      transition,
      ...props
    },
    ref,
  ) => {
    const { scrollYProgress } = useContainerScroll()
    const insetY = useTransform(scrollYProgress, [0, 0.8], insetYRange)
    const insetX = useTransform(scrollYProgress, [0, 0.8], insetXRange)
    const roundedness = useTransform(scrollYProgress, [0, 1], roundednessRange)
    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`

    return (
      <motion.div
        ref={ref}
        className={cn("relative pointer-events-none overflow-hidden", className)}
        style={{ clipPath, ...style }}
        {...props}
      />
    )
  },
)
ContainerInset.displayName = "ContainerInset"

export function HeroVideo({
  className,
  src,
  alt,
}: {
  className?: string
  src: string
  alt: string
}) {
  const { scrollYProgress } = useContainerScroll()
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1])

  return (
    <motion.div className={cn("relative z-10 size-auto max-h-full max-w-full", className)} style={{ scale }}>
      <img src={src} alt={alt} className="size-full object-cover" />
    </motion.div>
  )
}

export function HeroButton({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex w-fit items-center rounded-full border border-pink-500 bg-gray-950/10 px-4 py-2 shadow-[0px_4px_24px_rgba(219,39,119,0.3)] transition-colors hover:bg-slate-950/50",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
