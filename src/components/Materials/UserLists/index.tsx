import React, { Suspense, useState } from 'react'
import classes from './classes.module.scss'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import ListCard from './ListCard'

type IHomeList = {
  id: string
  thematic: string
  listName: string
  sharedWith: string[]
  description: string
}

export default function UserLists() {
  // const [userLists, setUserLists] = useState<IHomeList[]>([])
  const userLists: IHomeList[] = [
    {
      id: '12',
      thematic: 'Cinéma',
      listName: 'Tata',
      sharedWith: ['Romain', 'Alexis'],
      description: "C'est de la dopamine",
    },
  ]

  return (
    <div className={classes['root']}>
      <Suspense>
        <h2 className={classes['title']}>Mes listes</h2>
        {userLists.length === 0 && (
          <div className={classes['no-invitation']}>
            <div className={classes['svg']}>{<InformationCircleIcon />}</div>
            <div className={classes['text-content']}>
              Vous n'avez pas de liste
            </div>
          </div>
        )}
        {userLists.length > 0 && (
          <div className={classes['user-lists-container']}>
            {userLists.map(async (list) => (
              <ListCard
                id={list.id}
                listName={list.listName}
                thematic={list.thematic}
                sharedWith={list.sharedWith}
                description={list.description}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  )
}
