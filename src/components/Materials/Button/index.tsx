import React from 'react'
import classes from './classes.module.scss'
import { Loader } from '../../Elements/Loader'
import classNames from 'classnames'

type IProps = {
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  className: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}

export default function Button(props: IProps) {
  return (
    <button
      className={classNames(classes['root'], props.className)}
      onClick={props.onClick}
    >
      <div className={classes['loader-wrapper']}>
        {props.isLoading ? (
          <Loader />
        ) : (
          <div className={classes['loader-placeholder']}>{props.leftIcon}</div>
        )}
      </div>
      <div className={classes['content']}>{props.text}</div>
      {props.rightIcon && <div className={classes["right-icon"]}>{props.rightIcon}</div>}
    </button>
  )
}
