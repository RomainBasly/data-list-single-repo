'use client'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'
import React, { useEffect } from 'react'
import classes from '../classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import StorageService from '@/Services/CookieService'

export default function Transition() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const refreshToken = Cookies.get('refreshToken')
      console.log('refreshToken', refreshToken)
      if (refreshToken) {
        try {
          const response = await AuthorizationApi.getInstance().getNewAccessToken(
            refreshToken,
          )
          response.accessToken &&
            StorageService.getInstance().setCookies(
              'accessToken',
              response.accessToken,
              true,
            )
          router.push('/private-space')
        } catch (error) {
          router.push('/login')
          console.error('error', error)
        }
      } else {
        console.log('je passe dans le else')
        router.push('/login')
      }
    })()
  }, [router])
  return (
    <Layout pageType="login">
      <div className={classes['root']}>
        <div className={classes['top']}>
          <LandingHeader />
        </div>
        <div className={classes['content']}>
          <Loader variant="page" />
        </div>
      </div>
    </Layout>
  )
}
