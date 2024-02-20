'use client'
import React, { useEffect } from 'react'

export default function ServiceWorkerInitiator() {
  useEffect(() => {
    console.log('I pass here somewhere')
  }, [])
  useEffect(() => {
    try {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/swInit.js')
            .then((registration) => {
              console.log('SW registered: ', registration)
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError)
            })
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  return <></>
}
