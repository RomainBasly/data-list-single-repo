'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import classes from './classes.module.scss'
import { useAuthInitialization } from '@/components/hooks/useAuthInitialization'
import StorageService from '@/Services/CookieService'
import ListCard from '../ListCard'
import { ListStatus } from '../../../../../types'
import LoadingMaterial from '../../LoadingMaterial'
import DynamicButtonInput from '../../Button/AddListElementButton'
import { sortItemObjectByUpdatedDate } from '@/components/Helpers'

export type IList = {
  'app-lists': IListContent
}
export type IListContent = {
  id: string
  listName: string
  thematic: string
  description: string
  beneficiaries: IBeneficiary[]
  items: IElement[]
}

export type IBeneficiary = {
  'app-users': IUser
}

export type IUser = {
  userName: string
  user_id: string
}

export type IElement = {
  id: number
  updated_at: string
  content: string
  status: string
}

export default function ListPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [elementValue, setElementValue] = useState<string>('')
  const [listElements, setListElements] = useState<IList | null>(null)
  const { accessToken } = useAuthInitialization()
  const router = useRouter()
  const paramsInitiator = useParams()
  const listId = paramsInitiator?.listId as string | undefined

  useEffect(() => {
    const fetchListData = async () => {
      try {
        if (accessToken) {
          StorageService.getInstance().setCookies(
            'accessToken',
            accessToken,
            true,
          )

          const response = await fetch(
            `/api/lists/getListItems?listId=${listId}`,
            {
              credentials: 'include',
            },
          )

          if (!response.ok) {
            throw new Error('Failed to fetch lists items')
          }
          const data = await response.json()

          if (data) {
            const sortedItems = data[0]['app-lists'].items.sort(
              sortItemObjectByUpdatedDate,
            )

            const sortedElements: IList = {
              ...data[0],
              'app-lists': {
                ...data[0]['app-lists'],
                items: sortedItems,
              },
            }
            setListElements(sortedElements)
            setLoading(false)
          }
        }
      } catch (error) {
        console.error('Error fetching list items:', error)
        if (error instanceof Error) {
          setError(error.message)
        }
        setLoading(false)
        // prévoir le cas où ce n'est pas où la personne n'est pas autorisée
      }
    }

    if (accessToken && listId) {
      fetchListData()
    }
  }, [accessToken, listId])
  if (!listElements) {
    return (
      <div className={classes['root']}>
        <div className={classes['loading']}>
          <LoadingMaterial />
          Loading...
        </div>
      </div>
    )
  }

  const addItemToList = async (inputElement: string): Promise<boolean> => {
    console.log('inputlistElement', inputElement)
    try {
      const response = await fetch(
        `/api/lists/addItemToList?listId=${listId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ listId, content: inputElement }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to post item to list')
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const listDetails = listElements['app-lists']
  return (
    <div className={classes['root']}>
      <div className={classes['list-item']}>
        <div className={classes['element']} key={listDetails.id}>
          <ListCard
            id={listDetails.id}
            listName={listDetails.listName}
            thematic={listDetails.thematic}
            beneficiaries={listDetails.beneficiaries.map(
              (beneficiary) => beneficiary,
            )}
            description={listDetails.description}
          />
        </div>
      </div>
      {listDetails.items &&
        listDetails.items.map((element, index) => {
          return <ul key={index}>{element.content}</ul>
        })}
      <DynamicButtonInput onInputSubmit={addItemToList} />
      {/* button form pour créer un element de la liste */}
    </div>
  )
}
