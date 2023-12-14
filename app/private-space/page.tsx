'use client'
import { AuthorizationApi } from '@/api/Back/Authorization'
import Layout from '@/components/Elements/Layout'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface PrivateSpaceProps {}

interface PrivateSpaceState {}

export default function PrivateSpace() {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const isJwtTokenValid = await AuthorizationApi.getInstance().isValidToken()

      if (!isJwtTokenValid) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])
  return <Layout pageType="default">{'coucou'}</Layout>
}
