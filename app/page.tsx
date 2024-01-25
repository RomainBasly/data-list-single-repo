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
