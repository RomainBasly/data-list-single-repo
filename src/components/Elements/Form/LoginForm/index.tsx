'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { useState } from 'react'
import AuthenticationApi from '@/api/Back/AuthenticationApi'
import { validateConnectFormInputs } from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'
import { useRouter } from 'next/navigation'
import StorageService from '@/Services/CookieService'
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
    const lowerCaseEmail = email.toLowerCase()
    const formErrors = validateConnectFormInputs(lowerCaseEmail, password)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    const body = { email: lowerCaseEmail, password }

    try {
      const response = await AuthenticationApi.getInstance().login(body)
      response.accessToken &&
        StorageService.getInstance().setCookies(
          'accessToken',
          response.accessToken,
          true,
        )
      response.refreshToken &&
        StorageService.getInstance().setCookies(
          'refreshToken',
          response.refreshToken,
          false,
        )
      setIsLoading(!isLoading)
      router.push('/home')
    } catch (error) {
      setIsLoading(false)
      const errorMessage = getErrorMessage(error)
      setErrors({
        ...errors,
        form: errorMessage,
      })
    }
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, password: '', form: '' })
    setIsLoading(false)
    setPassword(e.target.value)
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, email: '', form: '' })
    setIsLoading(false)
    setEmail(e.target.value)
  }

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="gabriel@attable.com"
          id="email"
          onChange={handleEmail}
        />
        {errors && <div className={classes['error']}>{errors.email}</div>}
      </div>
      <div className={classes['form-element']}>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          onChange={handlePassword}
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
