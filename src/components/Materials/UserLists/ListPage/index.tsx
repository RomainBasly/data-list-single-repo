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
import { sortItemObjectByUpdatedDateDSC } from '@/components/Helpers'
import ListElement from './ListElement'

type IResponse = IList[]

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
  id: string
  updated_at: string
  content: string
  statusOpen: boolean
}

export default function ListPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [animateSuppressionByItemId, setAnimateSuppressionByItemId] = useState<
    string | null
  >(null)
  const [listTop, setListTop] = useState<IList | null>(null)
  const [listItems, setListItems] = useState<IElement[] | null>(null)
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
          const data: IResponse = await response.json()

          if (data) {
            if (data[0]['app-lists'].items) {
              const LIVE = data[0]['app-lists'].items
                .filter((item) => item.statusOpen === true)
                .sort(sortItemObjectByUpdatedDateDSC)
              const CROSSED = data[0]['app-lists'].items
                .filter((item) => item.statusOpen === false)
                .sort(sortItemObjectByUpdatedDateDSC)

              const sortedItems = [...LIVE, ...CROSSED]
              setListItems(sortedItems)
            }

            const topElements: IList = {
              ...data[0],
              'app-lists': {
                ...data[0]['app-lists'],
              },
            }
            setListTop(topElements)
            setLoading(false)
          } else {
            router.push('/')
          }
        }
      } catch (error) {
        console.error('Error fetching list items:', error)
        if (error instanceof Error) {
          setError(error.message)
        }
        setLoading(false)
        router.push('/')
        // prévoir le cas où ce n'est pas où la personne n'est pas autorisée
      }
    }

    if (accessToken && listId) {
      fetchListData()
    }
  }, [accessToken, listId, router])

  if (!listTop) {
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
      const result = await response.json()

      if (listItems) {
        const updatedItems = [...listItems, result.itemAdded[0]]
        const sortedElements = updatedItems.sort(sortItemObjectByUpdatedDateDSC)
        setListItems(sortedElements)
      } else {
        setListItems(result.itemAdded)
      }

      if (!response.ok) {
        throw new Error('Failed to post item to list')
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const suppressElement = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/lists/suppressItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ listId, elementId: id }),
      })
      if (response.status === 200) {
        setAnimateSuppressionByItemId(id)
        setTimeout(() => {
          if (listItems) {
            const newList = listItems.filter((item) => item.id !== id)
            setListItems(newList)
            setAnimateSuppressionByItemId(null)
          }
        }, 700)
      }
      return true
    } catch (error) {
      return false
    }
  }
  const handleElementStatusChange = async (id: string, statusOpen: boolean) => {
    try {
      const response = await fetch('/api/lists/handleItemStatusChange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ listId, elementId: id, statusOpen: statusOpen }),
      })

      const responseData = await response.json()

      if (!Array.isArray(listItems)) {
        console.error('listItems is not an array:', listItems)
        return false
      }

      const otherElements = listItems.filter((element) => element.id !== id)

      const isArray = Array.isArray(otherElements)
      const hasLength = otherElements.length > 0

      if (isArray && hasLength) {
        if (Array.isArray(responseData.data.itemStatusChanged)) {
          const updatedListNotSorted = [
            ...responseData.data.itemStatusChanged,
            ...otherElements,
          ]
          const newLiveElementsSorted = updatedListNotSorted
            .filter((item) => item.statusOpen === true)
            .sort(sortItemObjectByUpdatedDateDSC)
          const newCrossedElementsSorted = updatedListNotSorted
            .filter((item) => item.statusOpen === false)
            .sort(sortItemObjectByUpdatedDateDSC)

          const newElements = [...newLiveElementsSorted, ...newCrossedElementsSorted]
          setListItems(newElements)
        }
      } else {
        console.error('otherElements is not an array or is empty')
      }

      return true
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  const listDetails = listTop['app-lists']
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
      <div className={classes['elements-container']}>
        {listItems?.map((element) => {
          return (
            <ListElement
              content={element.content}
              key={element.id}
              onCrossElement={handleElementStatusChange}
              onElementSuppress={suppressElement}
              id={element.id}
              animateSuppressionByItemId={
                animateSuppressionByItemId === element.id
              }
              statusOpen={element.statusOpen}
            />
          )
        })}
      </div>
      <div className={classes['dynamic-button-input']}>
        <DynamicButtonInput onInputSubmit={addItemToList} />
      </div>
    </div>
  )
}
