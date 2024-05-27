'use client'
import React, { Suspense, useEffect, useState } from 'react'
import classes from './classes.module.scss'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import ListCard from './ListCard'
import { useAuthInitialization } from '@/components/hooks/useAuthInitialization'
import { useTokenRefresh } from '@/components/hooks/useTokenRefresh'
import StorageService from '@/Services/CookieService'

type IHomeList = {
  'app-lists': {
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
}

export default function UserLists() {
  const [loading, setLoading] = useState(true)
  const [userLists, setUserLists] = useState<IHomeList[]>([])
  const [error, setError] = useState<string>('')
  const { accessToken } = useAuthInitialization()

  useEffect(() => {
    const fetchListsByUser = async () => {
      try {
        if (accessToken) {
          // This part of the setCookies is essential to propagate the token to the next request I am about to do
          // TODO : see if we can do it differently later
          StorageService.getInstance().setCookies(
            'accessToken',
            accessToken,
            true,
          )
          const response = await fetch(`/api/user/getLists`, {
            credentials: 'include',
          })

          if (!response.ok) {
            throw new Error('Failed to fetch invitations')
          }
          const data = await response.json()
          setUserLists(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching list beneficiaries:', error)
        if (error instanceof Error) {
          setError(error.message)
        }
        setLoading(false)
      }
    }

    fetchListsByUser()
  }, [accessToken])

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
            {userLists.map(async (list, index) => (
              <>
                {console.log('list element', list['app-lists'])}
                <ListCard
                  key={index}
                  id={list['app-lists'].id}
                  listName={list['app-lists'].listName}
                  thematic={list['app-lists'].thematic}
                  beneficiaries={list['app-lists'].beneficiaries}
                  description={list['app-lists'].description}
                />
              </>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  )
}
