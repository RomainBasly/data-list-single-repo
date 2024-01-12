'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { useState } from 'react'
import AuthenticationApi from '@/api/Back/AuthenticationApi'
import { validateConnectFormInputs } from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'
import { useRouter } from 'next/navigation'
import CookieService from '@/Services/CookieService'
import Button from '@/components/Materials/Button'

export type IBody = {
  email: string
  password: string
}

export function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    const formErrors = validateConnectFormInputs(email, password)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    const body = { email, password }

    try {
      const response = await AuthenticationApi.getInstance().login(body)
      response.accessToken &&
        CookieService.getInstance().setCookie('jwt', response.accessToken)
      setIsLoading(!isLoading)
      router.push('/private-space')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setErrors({
        ...errors,
        form: errorMessage,
      })
      setIsLoading(!isLoading)
    }
  }

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="gabriel@attable.com"
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
        <Button
          text="Se connecter"
          onClick={sendForm}
          className={classes['connexion-button']}
          isLoading={isLoading}
        ></Button>
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
