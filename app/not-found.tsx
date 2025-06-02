'use client'

import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFoundPage() {
  const router = useRouter()

  useEffect(() => {
    const token = getCookie('token')
    if (token) {
        router.push('/profile')
    } else {
        router.push('/login')
    }
  }, [])
  return <></>
}