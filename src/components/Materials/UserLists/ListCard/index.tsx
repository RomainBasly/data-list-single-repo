import React from 'react'
import classes from './classes.module.scss'
import { Cog8ToothIcon } from '@heroicons/react/24/solid'

type IProps = {
  id: string
  listName: string
  thematic: string
  description: string
  beneficiaries: {
    'app-users': {
      userName: string
    }
  }[]
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

  function formatBeneficiaries(
    beneficiaryList: {
      'app-users': {
        userName: string
      }
    }[],
  ) {
    switch (beneficiaryList.length) {
      case 0:
        return 'Liste privée ou non acceptée par les autres bénéficiaires'
      case 1:
        return `Partagée avec ${props.beneficiaries[0]['app-users'].userName}`
      case 2:
        return `Partagée avec ${props.beneficiaries[0]['app-users'].userName} et ${props.beneficiaries[1]['app-users'].userName}`
      case 3:
        return `Partagée avec ${props.beneficiaries[0]['app-users'].userName}, ${props.beneficiaries[1]['app-users'].userName}
    et ${props.beneficiaries[2]['app-users'].userName}`
      case 4:
        return `Partagée avec ${props.beneficiaries[0]['app-users'].userName}, ${props.beneficiaries[1]['app-users'].userName}
    et ${props.beneficiaries[2]['app-users'].userName} et une autre personne`
      default:
        return `Partagée avec ${
          props.beneficiaries[0]['app-users'].userName
        }, ${props.beneficiaries[1]['app-users'].userName} et ${
          props.beneficiaries[2]['app-users'].userName
        } et ${props.beneficiaries.length - 2} autres personnes`
    }
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

      <div className={classes['shared-with']}>
        <>{console.log('props', props)}</>
      </div>
      {props.beneficiaries.length > 0 && (
        <div className={classes['shared-with']}>
          <>{formatBeneficiaries(props.beneficiaries)}</>
        </div>
      )}
    </div>
  )
}
