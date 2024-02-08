'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { useState } from 'react'
import AuthenticationApi from '@/api/Back/AuthenticationApi'
import {
  isValidEmail,
  validateConnectFormInputs,
  validateEmailInput,
} from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'
import { useRouter } from 'next/navigation'
import StorageService from '@/Services/CookieService'
import Button from '@/components/Materials/Button'
import {
  PlusIcon,
  EyeSlashIcon,
  ShareIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid'
import { sanitize } from 'isomorphic-dompurify'
import CustomSelector from '@/components/Materials/CustomSelector'

export type IBody = {
  email: string
  password: string
}

export function CreateListForm() {
  const [email, setEmail] = useState<string>('')
  const [emailsArray, setEmailsArray] = useState<string[]>([])
  const [confidentiality, setConfidentiality] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    //const lowerCaseEmail = emailsArray.toLowerCase()
    //const formErrors = validateConnectFormInputs(lowerCaseEmail, password)
    // if (Object.keys(formErrors).length > 0) {
    //   setErrors(formErrors)
    //   return
    // }
    // const body = { email: lowerCaseEmail, password }

    try {
      //   const response = await AuthenticationApi.getInstance().login(body)
      //   response.accessToken &&
      //     StorageService.getInstance().setCookies(
      //       'accessToken',
      //       response.accessToken,
      //       true,
      //     )
      //   response.refreshToken &&
      //     StorageService.getInstance().setCookies(
      //       'refreshToken',
      //       response.refreshToken,
      //       false,
      //     )
      //   setIsLoading(!isLoading)
      //   router.push('/')
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

  function handleEnterKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.toLowerCase() === 'enter') {
      addEmailToList()
    }
  }

  function addEmailToList() {
    const sanitizedEmail = sanitize(email)
    const formErrors = validateEmailInput(sanitizedEmail)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    if (email) {
      setEmailsArray([...emailsArray, sanitizedEmail])
      setEmail('')
    }
  }

  function removeEmailFromList() {}

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, name: '', form: '' })
    setIsLoading(false)
    setName(e.target.value)
  }

  function handleConfidentialityChange(selectedValue: string) {
    setConfidentiality(selectedValue)
  }

  const options = [
    {
      value: 'private',
      icon: <EyeSlashIcon />,
      label: 'Privée',
      description: 'Seul(e) vous avez accès à la liste',
    },
    {
      value: 'shared',
      icon: <ShareIcon />,
      label: 'Partagée',
      description: 'Vous indiquez qui est autorisé',
    },
    {
      value: 'public',
      icon: <GlobeAltIcon />,
      label: 'Publique',
      description: 'Accessible à tout le monde',
    },
  ]

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="name">
          Comment souhaitez-vous nommer votre liste ?
        </label>
        <div className={classes['input-container']}>
          <input
            name="name"
            placeholder="(ex: Liste de courses)"
            id="name"
            onChange={handleName}
          />
        </div>
        {errors && <div className={classes['error']}>{errors.name}</div>}
      </div>
      <div className={classes['form-element']}>
        <label htmlFor="share">Votre liste est...</label>
        <CustomSelector
          options={options}
          onSelectionChange={handleConfidentialityChange}
        />
        {errors && <div className={classes['error']}>{errors.name}</div>}
      </div>
      <div className={classes['form-element']}>
        <label htmlFor="email">Avec qui partager votre liste ?</label>
        <div className={classes['input-container']}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Entrez ici l'email des personnes avec qui partager votre liste"
            onChange={handleEmail}
            onKeyDown={handleEnterKeyDown}
            value={email}
          />
          <PlusIcon onClick={addEmailToList} className={classes['plus-icon']} />
        </div>
        {errors && <div className={classes['error']}>{errors.email}</div>}
      </div>
      <div className={classes['emails']}>
        {emailsArray.map((email, index) => (
          <div className={classes['emailElement']} key={index}>
            {email}
          </div>
        ))}
      </div>
      <div className={classes['button-container']}>
        <Button
          text="Créer"
          onClick={sendForm}
          className={classes['button']}
          isLoading={isLoading}
        ></Button>
        {errors && <div className={classes['error']}>{errors.form}</div>}
      </div>
    </form>
  )
}
