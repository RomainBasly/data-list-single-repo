'use client'
import React, { useEffect } from 'react'

export default function ServiceWorkerInitiator() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
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
  }, [])
  return <></>
}
