'use client'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import React, { useEffect, useState } from 'react'
import classes from '../classes.module.scss'
import { Loader } from '@/components/Elements/Loader'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import StorageService from '@/Services/CookieService'
import JwtService from '@/Services/jwtService'
import { useAuthInitialization } from '@/components/hooks/useAuthInitialization'
// import { getSocket } from '@/components/Elements/Socket'

export default function Transition() {
  const router = useRouter()
  const [nonce, setNonce] = useState<string>('')
  const { accessToken } = useAuthInitialization()

  useEffect(() => {
    const styleNonce = document
      .querySelector('meta[name="x-nonce"]')
      ?.getAttribute('content')
    if (styleNonce) {
      setNonce(styleNonce)
    }
  }, [nonce])

  useEffect(() => {
    try {
      if (accessToken) {
        StorageService.getInstance().setCookies(
          'accessToken',
          accessToken,
          true,
        )
      }
      router.push('/')
    } catch (error) {
      console.error('Error doing what you do', error)
      router.push('/')
    }
    // ;(async () => {
    //   const refreshToken = Cookies.get('refreshToken')
    //   const accessToken = Cookies.get('accessToken')
    //   console.log('transition page token1', refreshToken, accessToken)

    //   if (accessToken) {
    //     console.log('I should be passing here1')
    //     router.push('/home')
    //   }

    //   if (!accessToken && refreshToken) {
    //     try {
    //       console.log('transition page token2', refreshToken)
    //       const response = await fetch(`/api/token/getNewAccessToken`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({ refreshToken }),
    //       })
    //       const result = await response.json()
    //       console.log('transition page token3', result, result.accessToken)

    //       if (result.accessToken) {
    //         StorageService.getInstance().setCookies(
    //           'accessToken',
    //           result.accessToken,
    //           true,
    //         )
    //         // const socket = getSocket()
    //         // socket.emit('register-user-id', {
    //         //   socketId: localStorage.getItem('socketId'),
    //         //   accessTokenJWT: response.accessToken,
    //         // })
    //         console.log('I pass here', result.accessToken)
    //         router.push('/home')
    //       }
    //     } catch (error) {
    //       console.log('I pass here while I should not1')
    //       router.push('/login')
    //       console.error('error', error)
    //     }
    //   } else {
    //     console.log('I pass here while I should not2')
    //     router.push('/login')
    //   }
    // })()
  }, [router, accessToken])

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
