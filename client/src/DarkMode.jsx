import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './components/ThemeProvider'

const DarkMode = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="border-[#D8F3DC] text-[#537D5D] hover:bg-[#D8F3DC]/30 dark:border-[#2D3748] dark:text-[#D8F3DC] dark:hover:bg-[#2D6A4F]/30"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-[#F0F7F4] border-[#D8F3DC] dark:bg-[#16213E] dark:border-[#2D3748]"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="focus:bg-[#D8F3DC] focus:text-[#1B4332] dark:focus:bg-[#2D6A4F] dark:focus:text-[#E2E8F0]"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="focus:bg-[#D8F3DC] focus:text-[#1B4332] dark:focus:bg-[#2D6A4F] dark:focus:text-[#E2E8F0]"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="focus:bg-[#D8F3DC] focus:text-[#1B4332] dark:focus:bg-[#2D6A4F] dark:focus:text-[#E2E8F0]"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DarkMode