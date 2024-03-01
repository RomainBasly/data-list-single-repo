'use client'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'
import { useNetworkStatus } from '@/components/hooks/useNetworkStatus'

type IProps = {
  className?: string
}

export default function NetworkStatusNotifier(props: IProps) {
  const isOnline = useNetworkStatus()

  return (
    <div className={classnames(classes['root'], props.className, {})}>
      <div
        className={classnames(classes['status'], {
          [classes['disconnected']]: isOnline === false || null,
        })}
      ></div>
      {
        <p className={classes['text']}>
          {isOnline === false || null
            ? 'Connexion internet perdue'
            : 'Connecté à internet'}
        </p>
      }
    </div>
  )
}
