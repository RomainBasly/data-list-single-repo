'use client'
import UserStore from '@/Stores/UserStore'
import React, { useEffect, useState } from 'react'
import classes from './classes.module.scss'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

import Layout from '@/components/Elements/Layout'

export default function VerifyEmail() {
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    //setEmail(UserStore.getInstance().getEmail())
  }, [])

  return (
    <Layout pageType="register">
      <div className={classes['root']}>
        <div className={classes['content']}>
          <div className={classes['top']}>
            <div className={classes['icon']}>
              <InformationCircleIcon />
            </div>
            <div className={classes['text-container']}>
              Code de vérification envoyé à
              <span className={classes['bold-text']}>{email}</span>
            </div>
          </div>
          <h2 className={classes['title']}>
            Veuillez indiquer votre code de vérification
          </h2>
        </div>
      </div>
    </Layout>
  )
}
