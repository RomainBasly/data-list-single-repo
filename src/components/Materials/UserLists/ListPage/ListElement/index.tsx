'use client'
import React, { useRef, useState, useEffect } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid'

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSelected(false)
        setIsChoiceContainerOpen(false)
        setIsEditing(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
    setIsChoiceContainerOpen(false)
  }

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
    setIsChoiceContainerOpen(!isChoiceContainerOpen)
  }

  return (
    <div
      className={classNames(classes['root'], {
        [classes['is-selected']]: isSelected,
        [classes['blurred']]: !isSelected && isChoiceContainerOpen,
      })}
      onClick={handleClickOnRootDiv}
      ref={elementRef}
    >
      {isChoiceContainerOpen && <div className={classes['blur-overlay']}></div>}
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
        <div className={classes['icon']} onClick={openChoiceContainer}>
          <EllipsisHorizontalIcon className={classes['svg']} />
        </div>
      )}

      {isSelected && isEditing && (
        <div className={classes['icon']}>
          <PlusIcon className={classes['svg']} />
        </div>
      )}
      {isChoiceContainerOpen && (
        <div className={classes['choice-container']}>
          {!isCrossed && (
            <div className={classes['choice']} onClick={changeMode}>
              Editer
            </div>
          )}
          <div className={classes['choice']} onClick={crossElement}>
            <div className={classes['text']}>
              {isCrossed ? "Décocher l'élément" : "Barrer l'élement"}
            </div>
          </div>
          {isCrossed && (
            <div className={classes['choice']}>
              <ExclamationTriangleIcon className={classes['svg']} />
              <div className={classes['text']}>Supprimer l'élement</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
