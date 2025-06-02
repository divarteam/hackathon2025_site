'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/src/shared/ui/button'

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string | number
  placeholder?: string | number
  // variant?: 'ghost' | 'secondary'
}

export function CopyButton({ value, placeholder, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    // if (beforeAsyncCb) await beforeAsyncCb()
    
    setTimeout(() => {
      // console.log(value)
      navigator.clipboard.writeText(String(value))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }, 1000)
  }

  return (
    <Button variant={'ghost'} onClick={copyText} {...props}>
      <span>{placeholder ? placeholder : value}</span>
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}
