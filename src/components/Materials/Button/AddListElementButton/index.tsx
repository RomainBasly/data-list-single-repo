import React, { useState } from 'react'
import classes from './classes.module.scss'
import { PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { sanitize } from 'isomorphic-dompurify'
import { validateInputAddItemToList } from '@/Services/validation'
import { getErrorMessage } from '@/Services/errorHandlingService'

type IProps = {
  onInputSubmit: (value: string) => Promise<boolean>
}

export default function DynamicButtonInput(props: IProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>()

  const changeButtonToInput = () => setIsEditing(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target.value)
    setErrors({ ...errors, itemContent: '' })
  }

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await submitForm(e)
    }
  }

  const submitForm = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    const sanitizedCode = sanitize(value)
    const formErrors = validateInputAddItemToList(sanitizedCode)
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
        <div className={classes['content']}>
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
        </div>
        <div className={classes['error-container']}>
          {errors && (
            <div className={classes['error']}>{errors.itemContent}</div>
          )}
        </div>
      </form>
    </div>
  )
}
