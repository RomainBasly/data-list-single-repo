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

      try {
        if (refreshToken) {
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
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    })()
  }, [])
  return (
    <Layout pageType="login">
      <div className={classes['root']}>
        <div className={classes['top']}>
          <LandingHeader />
        </div>
        <div className={classes['content']}>
          <Loader variant="page" className={classes['toto']} />
        </div>
      </div>
    </Layout>
  )
}
