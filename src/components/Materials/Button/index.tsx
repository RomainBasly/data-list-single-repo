import React from 'react'
import classes from './classes.module.scss'
import { Loader } from '../../Elements/Loader'
import classNames from 'classnames'

type IProps = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
  className: string
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
          <div className={classes['loader-placeholder']}></div>
        )}
      </div>
      {props.text}
    </button>
  )
}
