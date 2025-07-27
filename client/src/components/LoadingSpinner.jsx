import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F7F4] dark:bg-[#16213E]">
      <Loader className="animate-spin h-16 w-16 text-[#537D5D] dark:text-[#D8F3DC]" />
      <p className="mt-4 text-lg font-semibold text-[#1B4332] dark:text-[#E2E8F0]">
        Loading, please wait...
      </p>
    </div>
  )
}

export default LoadingSpinner