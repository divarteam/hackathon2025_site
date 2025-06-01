'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/src/shared/ui/button'

interface CopyButtonProps {
  text: string | number
  // variant?: 'ghost' | 'secondary'
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  function copyText() {
    navigator.clipboard.writeText(String(text))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant={'ghost'} onClick={copyText}>
      <span>{text}</span>
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}
