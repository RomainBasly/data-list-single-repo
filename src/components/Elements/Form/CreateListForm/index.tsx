'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { useState, useEffect } from 'react'
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
  ChevronRightIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'
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

    // TODO perform a check if selectedValue !== "shared" => set the EmailsArray to []

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
    setEmail(e.target.value.toLowerCase())
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

  function removeEmailFromList(index: number) {
    const newArray = emailsArray.filter(
      (_, currentIndex) => currentIndex !== index,
    )
    setEmailsArray(newArray)
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, name: '', form: '' })
    setIsLoading(false)
    setName(e.target.value)
  }

  function handleConfidentialityChange(selectedValue: string) {
    setConfidentiality(selectedValue)
  }

  function displayEmail(email: string): string {
    if (window.innerWidth < 500 && email.length > 30) {
      return email.slice(0, 6) + '...@' + email.split('@')[1]
    }
    if (window.innerWidth < 340 && email.length > 24) {
      return email.slice(0, 6) + '...@' + email.split('@')[1]
    }
    return email
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
      description:
        'Est accessible aux personnes dont vous renseignez le mail, et qui pourront modifier la liste',
    },
    {
      value: 'public',
      icon: <GlobeAltIcon />,
      label: 'Publique',
      description:
        'Accessible aux personnes à qui vous envoyez son url, mais ils ne pourront pas la modifier',
    },
  ]

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <label htmlFor="name" className={classes['label']}>
          Comment souhaitez-vous nommer votre liste ?
        </label>
        <div className={classes['input-section']}>
          <div className={classes['input-container']}>
            <input
              name="name"
              placeholder="(ex: Liste de courses)"
              id="name"
              onChange={handleName}
              className={classes['input']}
            />
            {errors && <div className={classes['error']}>{errors.name}</div>}
          </div>
        </div>
      </div>
      <div className={classes['form-element']}>
        <label htmlFor="share" className={classes['label']}>
          Votre liste est...
        </label>
        <CustomSelector
          options={options}
          onSelectionChange={handleConfidentialityChange}
        />
        {errors && <div className={classes['error']}>{errors.name}</div>}
      </div>
      {confidentiality === 'shared' && (
        <div className={classes['emails-section']}>
          <div className={classes['form-element']}>
            <label htmlFor="email" className={classes['label']}>
              Avec qui partager votre liste ?
            </label>
            <div className={classes['input-section']}>
              <div className={classes['input-container']}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Entrez ici l'email des personnes avec qui partager votre liste"
                  onChange={handleEmail}
                  onKeyDown={handleEnterKeyDown}
                  value={email}
                  className={classes['input']}
                />
                <PlusIcon
                  onClick={addEmailToList}
                  className={classes['plus-icon']}
                />
              </div>
              {errors && <div className={classes['error']}>{errors.email}</div>}
            </div>
          </div>

          <div className={classes['emails']}>
            {emailsArray.map((email, index) => (
              <div className={classes['email-element']} key={index}>
                <div className={classes['email-picto']}>
                  <ChevronRightIcon className={classes['chevron-icon']} />
                </div>
                <div className={classes['email-text']}>
                  {displayEmail(email)}
                </div>
                <div className={classes['email-picto']}>
                  <MinusIcon
                    className={classes['minus-icon']}
                    onClick={() => removeEmailFromList(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
