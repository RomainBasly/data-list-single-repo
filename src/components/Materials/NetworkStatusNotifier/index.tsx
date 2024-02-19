'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'

export default function NetworkStatusNotifier() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    setIsConnected(window.navigator.onLine)
  }, [])

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true)
    }
    const handleOffline = () => {
      setIsConnected(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
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
          {isConnected === true
            ? 'Connecté à internet'
            : "Déconnecté d'internet"}
        </p>
      }
    </div>
  )
}
