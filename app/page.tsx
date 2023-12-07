import DefaultTemplate from '@/components/Elements/DefaultTemplate'
import Head from 'next/head'

import classes from './classes.module.scss'
import { useAuth } from '@/components/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  // const isAuthenticated = useAuth();
  // const router = useRouter();

  // useEffect(()=> {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={classes['root']}>
        <DefaultTemplate></DefaultTemplate>
      </div>
    </>
  )
}
