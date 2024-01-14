'use client'
import Head from 'next/head'
import classes from './classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CookieService from '@/Services/CookieService'
import AuthorizationService from '@/Services/authorizationService'

export default function Home({}) {
  // const router = useRouter()

  // useEffect(() => {
  //   const token = CookieService.getInstance().getCookie()
  //   const decodedToken = AuthorizationService.getInstance().decodeToken(token)
  //   const isTokenStillValid =
  //     token && AuthorizationService.getInstance().isTokenValid(decodedToken)

  //   if (isTokenStillValid) {
  //     router.push('/private-space')
  //   } else {
  //     router.push('/login')
  //   }
  // }, [])
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
