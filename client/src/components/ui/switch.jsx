import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#537D5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0F7F4]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#537D5D] data-[state=unchecked]:bg-[#E5E7EB]",
      "dark:focus-visible:ring-[#D8F3DC] dark:focus-visible:ring-offset-[#16213E]",
      "dark:data-[state=checked]:bg-[#D8F3DC] dark:data-[state=unchecked]:bg-[#2D3748]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "dark:bg-[#E2E8F0]"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }