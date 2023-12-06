import React from 'react'
import classes from './classes.module.scss'
import Logo from '../../src/components/Materials/Logo'
import picture from '../../public/images/logos/logo-big-screen.png'

export default function Login() {
  return (
    <div className={classes['root']}>
      <div className={classes['content']}>
        <Logo
          src={String(picture.src)}
          alt={'Logo'}
          className={classes['logo']}
        />
        <h3 className={classes['title']}>
          Gérez vos listes en toute simplicité!
        </h3>
        <p className={classes['subtitle']}>Se connecter</p>
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
          <div className={classes['button-element']}>
            <button>Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  )
}
