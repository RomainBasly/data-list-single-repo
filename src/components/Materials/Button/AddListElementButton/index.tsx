import React, { useState } from 'react'
import classes from './classes.module.scss'
import { PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { sanitize } from 'isomorphic-dompurify'
import { validateCodeInput } from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'

type IProps = {
  onInputSubmit: (value: string) => Promise<boolean>
}

export default function DynamicButtonInput(props: IProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>()

  const changeButtonToInput = () => setIsEditing(true)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event?.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('value child handleKeydown', value)
      await submitForm(e)
    }
  }

  const submitForm = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    const sanitizedCode = sanitize(value)
    const formErrors = validateCodeInput(sanitizedCode)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    try {
      const success = await props.onInputSubmit(sanitizedCode)
      if (success) {
        setIsEditing(false)
        setValue('')
      }
    } catch (error) {
      // Todo : add error for that problem
      const errorMessage = getErrorMessage(error)
      setErrors({ ...errors, form: errorMessage })
    }
  }

  return (
    <div className={classes['root']} onClick={changeButtonToInput}>
      <button
        className={classNames(classes['dynamic-button'], {
          [classes['is-button-invisible']]: isEditing,
        })}
      >
        <div className={classes['svg']}>
          <PlusIcon />
        </div>
        <div className={classes['text']}>Ajouter un élément</div>
      </button>
      <form
        className={classNames(classes['form'], {
          [classes['is-form-visible']]: isEditing,
        })}
        onSubmit={submitForm}
      >
        <input
          className={classes['dynamic-input']}
          placeholder={'Text'}
          onChange={handleInputChange}
          autoFocus
          type={'text'}
          onKeyDown={handleKeyDown}
          value={value}
        />
        <div className={classes['svg']} onClick={submitForm}>
          <PlusIcon />
        </div>
      </form>
    </div>
  )
}
