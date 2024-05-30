import React, { useState } from 'react'
import classes from './classes.module.scss'
import { PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

type IProps = {
  onInputSubmit: (value: string) => void
}

export default function DynamicButtonInput(props: IProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const changeButtonToInput = () => setIsEditing(true)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event?.target.value)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      props.onInputSubmit(value)
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
        onSubmit={(e) => {
          e.preventDefault()
          props.onInputSubmit(value)
          setIsEditing(false)
        }}
      >
        <input
          className={classes['dynamic-input']}
          placeholder={'Text'}
          onChange={handleInputChange}
          autoFocus
          type={'text'}
          onKeyDown={handleKeyDown}
        />
        <div
          className={classes['svg']}
          onClick={() => props.onInputSubmit(value)}
        >
          <PlusIcon />
        </div>
      </form>
    </div>
  )
}
