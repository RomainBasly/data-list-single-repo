'use client'
import Link from 'next/link'
import classes from './classes.module.scss'
import { useState, useEffect } from 'react'
import AuthenticationApi from '@/api/Back/AuthenticationApi'
import {
  validateCreateListForm,
  validateEmailInput,
} from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'
import { useRouter } from 'next/navigation'

import Button from '@/components/Materials/Button'
import {
  UserPlusIcon,
  EyeSlashIcon,
  ShareIcon,
  ChevronRightIcon,
  UserMinusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { sanitize } from 'isomorphic-dompurify'
import CustomSelector from '@/components/Materials/CustomSelector'
import classnames from 'classnames'
import classNames from 'classnames'

export type IBody = {
  email: string
  password: string
}

export function CreateListForm() {
  const [emailState, setEmailState] = useState<string>('')
  const [removeEmailAnimationIndex, setRemoveEmailAnimationIndex] = useState<
    number | null
  >(null)
  const [emails, setEmailsArray] = useState<string[]>([])
  const [confidentiality, setConfidentiality] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [thematic, setThematic] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    const isThereAnyError = Object.values(errors).some((value) => value !== '')

    setIsButtonDisabled(isThereAnyError)
  }, [errors])

  async function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault()
    setIsLoading(true)
    if (emailState) {
      addEmailToList()
    }

    const body = {
      listName: name.trim(),
      emails,
      thematic: thematic.trim(),
      accessLevel: confidentiality,
      description: description.trim(),
      cyphered: true,
    }

    const formErrors = validateCreateListForm(body)

    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors)
      setIsLoading(false)
      return
    } else {
      setErrors({})
    }

    try {
      const response = await fetch('/api/lists/createList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setIsLoading(false)
        router.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      const errorMessage = getErrorMessage(error)
      setErrors({
        ...errors,
        form: errorMessage,
      })
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, email: '' })
    setIsLoading(false)
    setEmailState(e.target.value.toLowerCase())
  }

  function handleEnterKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault()
      addEmailToList()
    }
  }

  function addEmailToList() {
    const sanitizedEmail = sanitize(emailState.trim())
    const formErrors = validateEmailInput(sanitizedEmail)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    if (emailState) {
      setEmailsArray([...emails, sanitizedEmail])
      setEmailState('')
    }
  }

  function removeEmailFromList(index: number) {
    setRemoveEmailAnimationIndex(index)
    setTimeout(() => {
      const newArray = emails.filter(
        (_, currentIndex) => currentIndex !== index,
      )
      setEmailsArray(newArray)
      setRemoveEmailAnimationIndex(null)
    }, 400)
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, listName: '' })
    setIsLoading(false)
    setName(e.target.value)
  }

  function handleThematic(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, thematic: '' })
    setIsLoading(false)
    setThematic(e.target.value)
  }
  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, description: '' })
    setIsLoading(false)
    setDescription(e.target.value)
  }

  function handleConfidentialityChange(selectedValue: string) {
    setErrors({ ...errors, access_level: '' })
    setIsLoading(false)
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
    // Todo  : think about having a public access to a list
    // {
    //   value: 'public',
    //   icon: <GlobeAltIcon />,
    //   label: 'Publique',
    //   description:
    //     'Accessible aux personnes à qui vous envoyez son url, mais ils ne pourront pas la modifier',
    // },
  ]

  return (
    <form className={classes['root']}>
      <div className={classes['form-element']}>
        <div className={classes['input-section']}>
          <label htmlFor="name" className={classes['label']}>
            Nom de la liste
          </label>
          <div className={classes['input-container']}>
            <input
              name="name"
              placeholder="(ex: Liste de courses)"
              id="name"
              onChange={handleName}
              className={classes['input']}
            />
            {errors && (
              <div className={classes['error']}>{errors.listName}</div>
            )}
          </div>
        </div>
        <div className={classes['input-section']}>
          <label htmlFor="thematic" className={classes['label']}>
            Thématique
          </label>
          <div className={classes['input-container']}>
            <input
              name="thematic"
              placeholder="(ex: Maison)"
              id="thematic"
              onChange={handleThematic}
              className={classes['input']}
            />
            {errors && (
              <div className={classes['error']}>{errors.thematic}</div>
            )}
          </div>
        </div>
        <div className={classes['input-section']}>
          <label htmlFor="description" className={classes['label']}>
            Description
          </label>
          <div className={classes['input-container']}>
            <input
              name="description"
              placeholder="(ex: Fini le PQ qu'on oublie parce que la liste de courses est resté sur la table!)"
              id="description"
              onChange={handleDescription}
              className={classes['input']}
            />
            {errors && (
              <div className={classes['error']}>{errors.description}</div>
            )}
          </div>
        </div>
      </div>
      <div className={classes['form-element']}>
        <div className={classes['input-section']}>
          <label htmlFor="share" className={classes['label']}>
            Elle est...
          </label>
          <CustomSelector
            options={options}
            onSelectionChange={handleConfidentialityChange}
          />
          {errors && (
            <div className={classes['error']}>{errors.access_level}</div>
          )}
        </div>
      </div>
      {confidentiality === 'shared' && (
        <div
          className={classnames(classes['emails-section'], {
            [classes['email-section-visible']]: confidentiality === 'shared',
          })}
        >
          <div className={classes['form-element']}>
            <div className={classes['input-section']}>
              <label htmlFor="email" className={classes['label']}>
                Avec qui la partager ?
              </label>
              <div
                className={classNames(
                  classes['input-container'],
                  classes['input-container-row'],
                )}
              >
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="ex: jordan@rangeTaChambre.fr"
                  onChange={handleEmail}
                  onKeyDown={handleEnterKeyDown}
                  value={emailState}
                  className={classes['input']}
                />
                <UserPlusIcon
                  onClick={addEmailToList}
                  className={classes['plus-icon']}
                />
              </div>
              {errors && <div className={classes['error']}>{errors.email}</div>}
            </div>
          </div>

          <div className={classes['emails-container']}>
            <div className={classes['title-email']}>Liste partagée avec...</div>
            {emails.length === 0 && (
              <div className={classes['nobody']}>
                <UserIcon className={classes['icon']} />
                <div className={classes['text']}>Personne pour l'instant</div>
              </div>
            )}
            {emails.map((email, index) => (
              <div
                className={classnames(classes['email-element'], {
                  [classes['email-invisible']]:
                    removeEmailAnimationIndex === index,
                })}
                key={index}
              >
                <div className={classnames(classnames(classes['email-picto']))}>
                  <ChevronRightIcon className={classes['chevron-icon']} />
                </div>
                <div className={classes['email-text']}>
                  {displayEmail(email)}
                </div>
                <div className={classes['email-picto']}>
                  <UserMinusIcon
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
          disabled={isButtonDisabled}
        ></Button>
        {errors && <div className={classes['error']}>{errors.form}</div>}
      </div>
    </form>
  )
}
