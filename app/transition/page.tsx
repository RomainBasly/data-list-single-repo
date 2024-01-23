'use client'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Layout from '@/components/Elements/Layout'
import React, { useEffect } from 'react'
import classes from '../classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Transition() {
  const router = useRouter()

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken')

    if (!refreshToken) {
      router.push('/login')
    } else {
      console.log('we are beeeee')
    }
  }, [])
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
