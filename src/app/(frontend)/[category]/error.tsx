'use client'

import ErrorCard from '@/components/ErrorCard'
import { useEffect } from 'react'

interface ErrorProps {
  error?: Error & { digest?: string }
  reset?: () => void
  fallback: React.ReactNode
  children: React.ReactNode
}

export default function Error({ error, reset, fallback, children }: ErrorProps) {
  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        {fallback || <ErrorCard />}
      </div>
    )
  }

  return <>{children}</>
}
