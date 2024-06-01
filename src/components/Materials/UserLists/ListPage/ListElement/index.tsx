'use client'
import React, { useState } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import {
    EllipsisHorizontalIcon,
  } from '@heroicons/react/24/solid'

type IProps = {
  content: string
}

export default function ListElement(props: IProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <div className={classes['root']} onClick={()=> setIsSelected(!isSelected)}>
      <div className={classes['circle']}>
        <div
          className={classNames(classes['circle-selected'], {
            [classes['is-selected']]: isSelected,
          })}
        ></div>
      </div>
      <div className={classes['content']}>{props.content}</div>
      {isSelected && <div className={classes["ellipsis-icon"]}><EllipsisHorizontalIcon className={classes["svg"]}/></div>}
    </div>
  )
}
