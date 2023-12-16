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
      console.log(
        'je suis dans le check auth et je isJWTokenValid is',
        isJwtTokenValid,
      )

      if (!isJwtTokenValid) {
        console.log('je suis dans if du use Effect de la page Private space')
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])
  return <Layout pageType="default">{'coucou'}</Layout>
}
