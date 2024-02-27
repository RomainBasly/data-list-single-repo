'use client'
import UserStore from '@/Stores/UserStore'
import React, { useEffect } from 'react'

export default function ServiceWorkerInitiator() {
  useEffect(() => {
    console.log('i passed here')
  }, [])
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').then(
            function (registration) {
              console.log(
                'Service Worker registration successful with scope: ',
                registration.scope,
              )
            },
            function (err) {
              console.log('Service Worker registration failed: ', err)
            },
          )

          // navigator.serviceWorker.addEventListener(
          //   'message',
          //   ({ data }): void => {
          //     console.log(data, 'message from the service worker')
          //     if ('isOnline' in data) {
          //       UserStore.getInstance().setIsOnlineVariable(data.isOnline)
          //     }
          //   },
          // )
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  return <></>
}
