import React from 'react'
import classes from './classes.module.scss'
import { Loader } from '../../Elements/Loader'
import classNames from 'classnames'
import classnames from 'classnames'

type IProps = {
  text: string
  textColor?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  className?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  disabled?: boolean
}

export default function Button(props: IProps) {
  return (
    <button
      className={classNames(classes['root'], props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className={classes['loader-wrapper']}>
        {props.isLoading ? (
          <Loader />
        ) : (
          <div className={classes['loader-placeholder']}>{props.leftIcon}</div>
        )}
      </div>
      <div className={classNames(classes['content'], props.textColor)}>
        {props.text}
      </div>
      {props.rightIcon && (
        <div className={classes['right-icon']}>{props.rightIcon}</div>
      )}
    </button>
  )
}
