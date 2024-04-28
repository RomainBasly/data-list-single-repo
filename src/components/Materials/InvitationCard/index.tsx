'use client'
import React, { useState } from 'react'
import classes from './classes.module.scss'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import {
  CheckCircleIcon,
  UserIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import classnames from 'classnames'
import Button from '../Button'

type IProps = {
  key: number
  creatorName: string
  creatorEmail: string
  invitationId: string
  listId: string
  listName: string
  description?: string
  onAccept: (
    invitationId: string,
    listId: string,
    status: number,
  ) => Promise<void>
  onRefuse?: (invitationId: string, listId: string, status: number) => void
  acceptButtonText?: string
  isMasked?: boolean
}

export default function InvitationCard(props: IProps) {
  // Todo : faire apparaitre la description et la possibilité d'accepter ou refuser
  // Prévoir dans le back que la personne refuse et vérifier que l'id de app-invitation ne soit pas unique pour la réinviter si besoin
  // Qui gère le fait d'envoyer l'information d'acceptation ou de refus?
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function openDescription() {
    setIsOpen(!isOpen)
  }
  function setAccept(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    props.onAccept(props.invitationId, props.listId, 2)
  }

  function setReject(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    props.onRefuse && props.onRefuse(props.invitationId, props.listId, 3)
  }

  return (
    <div className={classes['root']}>
      <div className={classes['content']} onClick={openDescription}>
        <div className={classes['header']}>
          <div className={classes['text']}>
            <span className={classes['emphasis-right']}>{props.listName}</span>
          </div>
          <div className={classes['icon-container']}>
            <ChevronDownIcon
              className={classnames(classes['icon'], {
                [classes['turnUp']!]: !isOpen,
              })}
            />
          </div>
        </div>
        <div
          className={classnames(classes['hidden-content'], {
            [classes['content-visible']]: isOpen,
          })}
        >
          <div className={classes['text-author']}>
            <UserIcon className={classes['icon']} /> {props.creatorName} -{' '}
            {props.creatorEmail}
          </div>
          {props.description && (
            <div className={classes['text-description']}>
              <BookOpenIcon className={classes['icon']} />
              {props.description}
            </div>
          )}
          <div className={classes['decision-buttons']}>
            <Button
              text={
                props.acceptButtonText ? props.acceptButtonText : 'Accepter'
              }
              className={classnames(classes['button-accept'])}
              textColor={classes['text-color']}
              leftIcon={<CheckCircleIcon className={classes['icon-accept']} />}
              onClick={setAccept}
            ></Button>
            {!props.isMasked && (
              <Button
                text={'Refuser'}
                className={classnames(classes['button-refuse'])}
                leftIcon={<XMarkIcon className={classes['icon']} />}
                onClick={setReject}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
