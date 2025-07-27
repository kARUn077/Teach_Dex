// badge.jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#537D5D] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#537D5D] text-white shadow hover:bg-[#3A5A40]",
        secondary: "border-transparent bg-[#2D6A4F] text-[#D8F3DC] hover:bg-[#1B4332]",
        destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        outline: "border-[#537D5D] text-[#537D5D] dark:border-[#6B8E71] dark:text-[#6B8E71] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]",
        premium: "bg-gradient-to-r from-[#537D5D] to-[#2D6A4F] text-white border-0"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }