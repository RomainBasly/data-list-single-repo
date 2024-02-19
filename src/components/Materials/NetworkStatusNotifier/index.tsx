'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'

export default function NetworkStatusNotifier() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    setIsConnected(window.navigator.onLine)
  }, [isConnected])

  useEffect(() => {
    const updateConnectionStatus = () => {
      setIsConnected(window.navigator.onLine)
    }

    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)

    return () => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)
    }
  }, [isConnected])

  return (
    <div className={classes['root']}>
      <div
        className={classnames(classes['status'], {
          [classes['disconnected']]: isConnected === false,
        })}
      ></div>
      {
        <p className={classes['text']}>
          {isConnected === false || null
            ? "Déconnecté d''internet"
            : 'Connecté à internet'}
        </p>
      }
    </div>
  )
}
