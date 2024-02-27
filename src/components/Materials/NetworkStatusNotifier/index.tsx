'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'
import { useNetworkStatus } from '@/components/hooks/useNetworkStatus'

export default function NetworkStatusNotifier() {
  const isOnline = useNetworkStatus()

  return (
    <div className={classes['root']}>
      <div
        className={classnames(classes['status'], {
          [classes['disconnected']]: isOnline === false || null,
        })}
      ></div>
      {
        <p className={classes['text']}>
          {isOnline === false || null
            ? "Déconnecté d''internet"
            : 'Connecté à internet'}
        </p>
      }
    </div>
  )
}
