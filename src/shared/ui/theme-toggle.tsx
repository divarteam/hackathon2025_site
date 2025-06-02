'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/src/shared/ui/button'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button
      variant='ghost'
      size='icon'
      className='rounded-full'
      onClick={() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
      }}
    >
      <Sun className='visible h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:invisible dark:-rotate-90 dark:scale-0' />
      <Moon className='invisible absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:visible dark:rotate-0 dark:scale-100' />
    </Button>
  )
}
