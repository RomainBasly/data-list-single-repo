'use client'

import Head from 'next/head'
import classes from './classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import { useEffect } from 'react'
import AuthorizationService from '@/Services/authorizationService'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import StorageService from '@/Services/CookieService'

export default function Home() {
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = StorageService.getInstance().getAccessToken(
        'accessToken',
      )
      console.log('accessToken', accessToken)
      // const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        if (!AuthorizationService.getInstance().isTokenValid(accessToken)) {
          try {
            const newAccessToken = await AuthorizationApi.getInstance().getNewAccessToken()
            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken.accessToken)
            }
          } catch (error) {
            console.log('error in Home useEffect', error)
          }
        }
      }
    }
    checkAndRefreshToken()
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={classes['root']}>
        <LandingHeader />
        <Loader />
      </div>
    </>
  )
}
