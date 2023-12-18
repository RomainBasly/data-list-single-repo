'use client'
import React, { useState } from 'react'
import classes from '../Login/classes.module.scss'
import Link from 'next/link'
import { sanitize } from 'isomorphic-dompurify'
import { validateRegisterFormInputs } from '@/Services/validation'

export default function RegistrationForm() {
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>()

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    const sanitizedEmail = sanitize(email)
    const formErrors = validateRegisterFormInputs(sanitizedEmail)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, email: '' })
    console.log(e.target.value)
    setEmail(e.target.value)
  }
  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="John@john.com"
          onChange={handleEmail}
        />
        {errors && <div className={classes['error']}>{errors.email}</div>}
      </div>
      <div className={classes['button-container']}>
        <button className={classes['connexion-button']} onClick={sendForm}>
          S'enregistrer
        </button>
        {errors && <div className={classes['error']}>{errors.form}</div>}
        <Link
          href="/register"
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
