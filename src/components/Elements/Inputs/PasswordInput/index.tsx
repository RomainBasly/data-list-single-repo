import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import classes from './classes.module.scss'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

type IProps = {
  name: string
  id?: string
  placeholder: string
  className?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordInput(props: IProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      className={classNames(classes['root'], {
        [classes['is-focused']]: isFocused,
      })}
    >
      <input
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        type={showPassword ? 'text' : 'password'}
        className={classes['input-element']}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={props.onChange}
      />
      {showPassword && (
        <EyeIcon className={classes['icon']} onClick={togglePassword} />
      )}
      {!showPassword && (
        <EyeSlashIcon className={classes['icon']} onClick={togglePassword} />
      )}
    </div>
  )
}
