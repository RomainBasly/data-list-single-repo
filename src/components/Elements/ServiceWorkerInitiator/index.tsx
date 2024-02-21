'use client'
import React, { useEffect } from 'react'

export default function ServiceWorkerInitiator() {
  useEffect(() => {
    console.log('i passed here')
  }, [])
  useEffect(() => {
    try {
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
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  return <></>
}
