'use client'
import React, { MouseEventHandler, useState } from 'react'
import classes from './classes.module.scss'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'

type IProps = {
  creatorName: string
  listName: string
  description?: string
}

export default function InvitationCard(props: IProps) {
  // Todo : faire apparaitre la description et la possibilité d'accepter ou refuser
  // Prévoir dans le back que la personne refuse et vérifier que l'id de app-invitation ne soit pas unique pour la réinviter si besoin
  // Qui gère le fait d'envoyer l'information d'acceptation ou de refus?
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null)

  function openDescription() {
    setIsOpen(!isOpen)
  }
  function setAccept(e: React.MouseEvent<SVGSVGElement>) {
    console.log('click accept')
    e.stopPropagation()
    setIsAccepted(true)
  }
  function setReject(e: React.MouseEvent<SVGSVGElement>) {
    console.log('click refused')
    e.stopPropagation()
    setIsAccepted(false)
  }

  return (
    <div className={classes['root']}>
      <div className={classes['content']} onClick={openDescription}>
        <div className={classes['header']}>
          <div className={classes['text']}>
            Vous a invité(e) à la liste
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
          <div className={classes['text']}>Créateur: {props.creatorName}</div>
          {props.description && (
            <div className={classes['text']}>
              Description: {props.description}
            </div>
          )}
          <div className={classes['decision-buttons']}>
            {' '}
            <ChevronDownIcon className={classes['icon']} onClick={setAccept} />
            <ChevronDownIcon className={classes['icon']} onClick={setReject} />
          </div>
        </div>
      </div>
    </div>
  )
}
