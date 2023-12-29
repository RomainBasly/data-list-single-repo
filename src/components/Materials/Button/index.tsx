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
    <div className={classNames(classes['root'], props.className)}>
      {props.isLoading && <Loader />}
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
