import React from 'react'
import classes from './classes.module.scss'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import { Form } from '@/components/Elements/Form'
import Layout from '@/components/Elements/Layout'

export default function Login() {
  return (
    <Layout pageType="login">
      <div className={classes['root']}>
        <div className={classes['top']}>
          <LandingHeader />
        </div>
        <div className={classes['content']}>
          <h2 className={classes['title']}>Bienvenue!</h2>
          <h3 className={classes['subtitle']}>Connexion</h3>
          <Form />
        </div>
      </div>
    </Layout>
  )
}
