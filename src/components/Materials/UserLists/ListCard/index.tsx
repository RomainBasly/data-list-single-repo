import React from 'react'
import classes from './classes.module.scss'
import { Cog8ToothIcon } from '@heroicons/react/24/solid'

type IProps = {
  id: string
  listName: string
  thematic: string
  sharedWith: string[]
  description: string
}

export default function ListCard(props: IProps) {
  function formatTitle(listName: string): string {
    const firstLetter = listName[0].toUpperCase()
    let restOfLetters: string = ''
    for (let i = 1; i < listName.length; i++) {
      restOfLetters += listName[i].toLowerCase()
    }

    return firstLetter + restOfLetters
  }

  return (
    <div className={classes['root']}>
      <div className={classes['header']}>
        <div className={classes['thematic']}>{props.thematic}</div>
        <div className={classes['icon']}>
          <Cog8ToothIcon />
        </div>
      </div>
      <div className={classes['title']}>{formatTitle(props.listName)}</div>
      {props.sharedWith.length > 0 && (
        <div className={classes['shared-with']}>
          Partagée avec {props.sharedWith[0]},{' '}
          {props.sharedWith[1] ? props.sharedWith[1] : ''}{' '}
          {props.sharedWith[2]
            ? `et ${props.sharedWith.length - 2} autre(s)
          personne(s)`
            : ''}
        </div>
      )}
    </div>
  )
}
