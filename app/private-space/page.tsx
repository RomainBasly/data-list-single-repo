'use client'
import StorageService from '@/Services/CookieService'
import AuthorizationService from '@/Services/authorizationService'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import Layout from '@/components/Elements/Layout'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface PrivateSpaceProps {}

interface PrivateSpaceState {}

export default function PrivateSpace() {
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = StorageService.getInstance().getAccessToken(
        'accessToken',
      )
      if (accessToken) {
        if (!AuthorizationService.getInstance().isTokenValid(accessToken)) {
          try {
            const newAccessToken = await AuthorizationApi.getInstance().getNewAccessToken()
            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken.accessToken)
            }
          } catch (error) {
            console.log('error in PrivatePSace useEffect', error)
          }
        }
      }
    }
    checkAndRefreshToken()
  }, [])
  return <Layout pageType="default">{'coucou'}</Layout>
}
