import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#D8F3DC] dark:bg-[#2D6A4F]/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }