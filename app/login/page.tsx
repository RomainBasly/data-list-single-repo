import React from 'react'
import classes from './classes.module.scss'
import { LandingHeader } from '@/components/Elements/Headers/LandingHeader'
import Link from 'next/link'

export default function Login() {
  return (
    <div className={classes['root']}>
      <div className={classes['top']}>
        <LandingHeader />
      </div>
      <div className={classes['content']}>
        <h2 className={classes['title']}>Bienvenue!</h2>
        <h3 className={classes['subtitle']}>Connexion à l'app</h3>
        <form className={classes['form']}>
          <div className={classes['form-element']}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="John@john.com" />
            <div className={classes['error']}>Error</div>
          </div>
          <div className={classes['form-element']}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Entrez un mot de passe"
            />
            <div className={classes['error']}>Error</div>
          </div>
          <div className={classes['button-container']}>
            <button className={classes['connexion-button']}>
              Se connecter
            </button>
            <Link
              href="/register"
              className={classes['registration-button-container']}
            >
              <button className={classes['registration-button']}>
                Pas encore de compte?
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
