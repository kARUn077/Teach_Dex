// input.jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, value, ...props }, ref) => {
  return (
    <input
      type={type}
      value={value ?? ""}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#CBD5E0] dark:border-[#537D5D] bg-white dark:bg-[#16213E] px-3 py-2 text-sm text-[#2D3748] dark:text-[#E2E8F0] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#718096] dark:placeholder:text-[#A0AEC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#537D5D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }