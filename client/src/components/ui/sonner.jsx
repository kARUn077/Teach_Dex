import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#F0F7F4] group-[.toaster]:text-[#1B4332] group-[.toaster]:border-[#D8F3DC] group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-[#16213E] dark:group-[.toaster]:text-[#E2E8F0] dark:group-[.toaster]:border-[#2D3748]",
          description: "group-[.toast]:text-[#3A5A40] dark:group-[.toast]:text-[#A0AEC0]",
          actionButton:
            "group-[.toast]:bg-[#537D5D] group-[.toast]:text-white dark:group-[.toast]:bg-[#D8F3DC] dark:group-[.toast]:text-[#1B4332]",
          cancelButton:
            "group-[.toast]:bg-[#E5E7EB] group-[.toast]:text-[#4B5563] dark:group-[.toast]:bg-[#2D1B69] dark:group-[.toast]:text-[#A78BFA]",
          success: "group-[.toast]:bg-[#D4EDDA] group-[.toast]:text-[#155724] dark:group-[.toast]:bg-[#1A3E1E] dark:group-[.toast]:text-[#A3E9A5]",
          error: "group-[.toast]:bg-[#F8D7DA] group-[.toast]:text-[#721C24] dark:group-[.toast]:bg-[#3E1A1D] dark:group-[.toast]:text-[#F9A8A8]",
          info: "group-[.toast]:bg-[#E7F5FF] group-[.toast]:text-[#0C4B8E] dark:group-[.toast]:bg-[#1A2E4A] dark:group-[.toast]:text-[#93C5FD]"
        },
      }}
      {...props}
    />
  );
}

export { Toaster }