// button.jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#537D5D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#537D5D] text-white shadow hover:bg-[#3A5A40] hover:shadow-md",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline: "border border-[#537D5D] text-[#537D5D] dark:border-[#6B8E71] dark:text-[#6B8E71] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]",
        secondary: "bg-[#2D6A4F] text-[#D8F3DC] shadow-sm hover:bg-[#1B4332]",
        ghost: "hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748] hover:text-[#537D5D] dark:hover:text-[#6B8E71]",
        link: "text-[#537D5D] dark:text-[#6B8E71] underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-[#537D5D] to-[#2D6A4F] text-white shadow-lg hover:from-[#3A5A40] hover:to-[#1B4332]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }