import React from 'react'
import classes from './classes.module.scss'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Link from 'next/link'
import { Form } from '@/components/Elements/Form'

export default function Login() {
  return (
    <div className={classes['root']}>
      <div className={classes['top']}>
        <LandingHeader />
      </div>
      <div className={classes['content']}>
        <h2 className={classes['title']}>Bienvenue!</h2>
        <h3 className={classes['subtitle']}>Connexion à l'app</h3>
        <Form/>
      </div>
    </div>
  )
}
