import React, { useState } from 'react'
import classes from './classes.module.scss'
import classnames from 'classnames'

type IProps = {
  options: {
    value: string
    icon: JSX.Element
    label: string
    description: string
  }[]
  onSelectionChange: (value: string) => void
}

export default function CustomSelector(props: IProps) {
  const [selected, setSelected] = useState<string>('')

  function handleOptionClick(value: string) {
    setSelected(value)
    props.onSelectionChange(value)
  }
  return (
    <div className={classes['root']}>
      <div className={classes['options-container']}>
        {props.options.map((option, index) => (
          <div
            className={classes['option']}
            key={index}
            onClick={() => handleOptionClick(option.value)}
          >
            <div className={classes['flip-card-container']}>
              <div
                className={classnames(classes['card-front'], {
                  [classes['selected']]: selected === option.value,
                })}
              >
                <div className={classes['option-label']}>{option.label}</div>
                <div className={classes['option-svg']}>{option.icon}</div>
              </div>
              <div
                className={classnames(classes['card-back'], {
                  [classes['selected']]: selected === option.value,
                })}
              >
                <div className={classes['option-description']}>
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
