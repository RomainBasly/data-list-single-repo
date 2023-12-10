'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { isValidElement, useEffect, useState } from 'react'
import AuthApi from '@/api/Back/Auth/Auth'
import { isValidEmail } from '@/Services/validation'

export type IBody = {
  email: string
  password: string
}

export function Form() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>()

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (!email) {
      setErrors({
        ...errors,
        email: 'Votre email doit être renseigné pour vous connecter',
      })
      return
    }
    if (!password) {
      setErrors({
        ...errors,
        password: 'Votre mot de passe doit être renseigné pour vous connecter',
      })
      return
    }
    if (!isValidEmail(email)) {
      setErrors({ ...errors, email: "L'email renseigné n'est pas valide" })
      return
    }
    const body = { email, password }

    try {
      const response = await AuthApi.getInstance().login(body)
      // Rest of the authent
    } catch (error) {
      if (error === 'UserDoNotExists') {
        setErrors({
          ...errors,
          form: 'Veuillez vous enregistrer',
        })
      } else {
        setErrors({
          ...errors,
          form: 'Vpaté en croute',
        })
      }
    }
  }
  // sanitize the inputs

  // gestion des erreurs

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="John@john.com"
          onChange={(e) => {
            setErrors({ ...errors, email: '' })
            setEmail(e.target.value)
          }}
        />
        {errors && <div className={classes['error']}>{errors.email}</div>}
      </div>
      <div className={classes['form-element']}>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => {
            setErrors({ ...errors, password: '' })
            setPassword(e.target.value)
          }}
        />
        {errors && <div className={classes['error']}>{errors.password}</div>}
      </div>
      <div className={classes['button-container']}>
        <button className={classes['connexion-button']} onClick={sendForm}>
          Se connecter
        </button>
        {errors && <div className={classes['error']}>{errors.form}</div>}
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
  )
}
