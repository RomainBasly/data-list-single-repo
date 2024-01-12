'use client'
import React, { useState } from 'react'
import classes from '../LoginForm/classes.module.scss'
import Link from 'next/link'
import { sanitize } from 'isomorphic-dompurify'
import { validateEmailInput } from '@/Services/validation'
import EmailVerificationApi from '@/api/Back/EmailVerificationApi'
import { getErrorMessage } from '@/Services/errorHandlingService'
import { useRouter } from 'next/navigation'
import Button from '@/components/Materials/Button'
import UserStore from '@/Stores/UserStore'

export default function RegistrationForm() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    const sanitizedEmail = sanitize(email)
    const formErrors = validateEmailInput(sanitizedEmail)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    const body = { email }

    try {
      setIsLoading(!isLoading)
      const response = await EmailVerificationApi.getInstance().sendVerificationEmail(
        body,
      )
      if (response) {
        setIsLoading(!isLoading)
        UserStore.getInstance().setEmail(email)
        router.push('/register/verify-code')
      }
    } catch (error) {
      setIsLoading(false)
      const errorMessage = getErrorMessage(error)
      setErrors({ ...errors, form: errorMessage })
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, email: '' })
    setEmail(e.target.value)
  }
  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="gabriel@attable.com"
          onChange={handleEmail}
        />
        {errors && <div className={classes['error']}>{errors.email}</div>}
      </div>
      <div className={classes['button-container']}>
        <Button
          onClick={sendForm}
          text={"S'enregistrer"}
          isLoading={isLoading}
          className={classes['connexion-button']}
        ></Button>
        {errors && <div className={classes['error']}>{errors.form}</div>}
        <Link
          href="/login"
          className={classes['registration-button-container']}
        >
          <button className={classes['registration-button']}>
            Vous avez déjà un compte? Connectez-vous
          </button>
        </Link>
      </div>
    </form>
  )
}
