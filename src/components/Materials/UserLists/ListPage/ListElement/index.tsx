'use client'
import React, { useRef, useState, useEffect } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid'

type IProps = {
  content: string
}

enum Status {
  LIVE = 'LIVE',
  CROSSED = 'CROSSED',
}

export default function ListElement(props: IProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [textContent, setTextContent] = useState<string>(props.content)
  const [isCrossed, setIsCrossed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isChoiceContainerOpen, setIsChoiceContainerOpen] = useState<boolean>(
    false,
  )
  const [errors, setErrors] = useState<{ [key: string]: string }>()
  const [isEditing, setIsEditing] = useState<boolean | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  const clickOutside = (event: MouseEvent | TouchEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false)
      setIsSelected(false)
      setIsChoiceContainerOpen(false)
    } else if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsSelected(false)
      setIsChoiceContainerOpen(false)
    }
  }

  const handleClickOnRootDiv = () => {
    if (isChoiceContainerOpen) {
      return
    }

    if (!isSelected) {
      setIsSelected(!isSelected)
    } else if (isSelected && !isEditing) {
      setIsCrossed(!isCrossed)
    }
  }

  const crossElement = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsCrossed(!isCrossed)
  }

  useEffect(() => {
    if (isEditing || isSelected) {
      document.addEventListener('click', clickOutside, true)
      document.addEventListener('touchstart', clickOutside, true)
    } else {
      document.removeEventListener('click', clickOutside, true)
      document.removeEventListener('touchstart', clickOutside, true)
    }

    return () => {
      document.removeEventListener('click', clickOutside, true)
      document.removeEventListener('touchstart', clickOutside, true)
    }
  }, [isEditing, isSelected])

  function changeMode(event: React.MouseEvent) {
    event.stopPropagation()
    setIsEditing(true)
    setIsSelected(true)
    setIsCrossed(false)
    setIsChoiceContainerOpen(false)
  }

  const isTextContentVisible =
    (!isEditing && !isSelected) || (!isEditing && isSelected)

  function editTextContent(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ ...errors, textEditContent: '' })
    setTextContent(e.target.value)
  }

  function openChoiceContainer(event: React.MouseEvent) {
    event.stopPropagation()
    console.log('state', isChoiceContainerOpen)
    setIsChoiceContainerOpen(!isChoiceContainerOpen)
  }

  return (
    <div
      className={classNames(classes['root'], {
        [classes['is-selected']]: isSelected,
      })}
      onClick={handleClickOnRootDiv}
      ref={elementRef}
    >
      {!isLoading && (
        <div className={classes['circle']}>
          <div
            className={classNames(classes['circle-selected'], {
              [classes['is-selected']]: isSelected,
              [classes['is-crossed']]: isCrossed,
            })}
          ></div>
        </div>
      )}
      <div
        className={classNames(classes['text-container'], {
          [classes['is-editing']]: isEditing,
        })}
        onDoubleClick={changeMode}
      >
        {isTextContentVisible && (
          <div
            className={classNames(classes['text'], {
              [classes['is-crossed']]: isCrossed,
            })}
          >
            {textContent}
          </div>
        )}
        {!isTextContentVisible && (
          <form className={classes['form']}>
            <input
              placeholder={props.content}
              ref={inputRef}
              className={classes['input']}
              value={textContent}
              onChange={editTextContent}
              autoFocus
            />
          </form>
        )}
      </div>
      {isSelected && !isEditing && (
        <div className={classes['ellipsis-icon']} onClick={openChoiceContainer}>
          <EllipsisHorizontalIcon className={classes['svg']} />
        </div>
      )}

      {isSelected && isEditing && (
        <div className={classes['ellipsis-icon']}>
          <PlusIcon className={classes['svg']} />
        </div>
      )}
      {isChoiceContainerOpen && (
        <div className={classes['choice-container']}>
          <div className={classes['choice']} onClick={changeMode}>
            Editer
          </div>
          <div className={classes['choice']} onClick={crossElement}>
            Barrer l'élement
          </div>
          <div className={classes['choice']}>Supprimer l'élement</div>
        </div>
      )}
    </div>
  )
}
