'use client'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import React, { useEffect, useState } from 'react'
import classes from '../classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import StorageService from '@/Services/CookieService'

export default function Transition() {
  const router = useRouter()
  const [nonce, setNonce] = useState<string>('')

  useEffect(() => {
    const styleNonce = document
      .querySelector('meta[name="x-nonce"]')
      ?.getAttribute('content')
    if (styleNonce) {
      setNonce(styleNonce)
    }
  }, [nonce])

  useEffect(() => {
    ;(async () => {
      const refreshToken = Cookies.get('refreshToken')

      if (refreshToken) {
        try {
          const response = await AuthorizationApi.getInstance().getNewAccessToken(
            refreshToken,
          )

          if (response.accessToken) {
            StorageService.getInstance().setCookies(
              'accessToken',
              response.accessToken,
              true,
            )
            router.push('/home')
          }
        } catch (error) {
          router.push('/login')
          console.error('error', error)
        }
      } else {
        router.push('/login')
      }
    })()
  }, [router])

  return (
    <div className={classes['root']}>
      <div className={classes['top']}>
        <LandingHeader />
      </div>
      <div className={classes['content']}>
        <Loader variant="page" />
      </div>
    </div>
  )
}
