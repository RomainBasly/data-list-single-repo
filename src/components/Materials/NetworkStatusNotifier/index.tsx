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
            ? 'Déconnecté à internet'
            : "Connecté d'internet"}
        </p>
      }
    </div>
  )
}
