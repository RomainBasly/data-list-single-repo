import React, { useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'

type IProps = {
  options: {
    value: string
    icon: JSX.Element
    label: string
  }[]
  id: string
}

export default function CustomSelector(props: IProps) {
  const [selected, setSelected] = useState<string>('')
  return (
    <div className={classes['root']} id={props.id}>
      <div className={classes['options-container']}>
        {props.options.map((option, index) => (
          <div
            className={classnames(classes['option'], {
              [classes['selected']]: selected === option.value,
            })}
            key={index}
            onClick={() => {
              setSelected(option.value)
            }}
          >
            <div className={classes['option-label']}>{option.label}</div>
            <div className={classes['option-svg']}>{option.icon}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
