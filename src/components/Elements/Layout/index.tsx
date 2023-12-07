'use client'
import { useAuth } from '@/components/hooks/useAuth'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/register') {
      router.push('/login')
    }
  }, [isAuthenticated, router])
  return <>{children}</>
}
