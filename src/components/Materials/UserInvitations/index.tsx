'use client'

import React, { useEffect, useState } from 'react'

type IInvitation = {
  id: number
  created_at: Date
  email: string
  list_id: string
  is_already_active_user: boolean
  is_already_invited: boolean
  user_id: number
  status: number
}

export default function UserInvitations() {
  const [invitations, setInvitations] = useState<IInvitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchInvitations = async () => {
      try {
        const response = await fetch('/api/user/user', {
          credentials: 'same-origin', // Ensures cookies are included in the request within the same origin
        })
        console.log('response', response)

        // if (!response.ok) {
        //   throw new Error('Failed to fetch invitations')
        // }
        const data = await response.json()
        console.log('data', data)
        setInvitations(data) // Assuming the data is the list of invitations
        setLoading(false)
      } catch (error) {
        console.error('Error fetching invitations:', error)
        if (error instanceof Error) {
          setError(error.message)
        }
        setLoading(false)
      }
    }

    // Immediately call the async function
    fetchInvitations()
  }, []) // The empty array ensures this effect runs only once on component mount

  // Conditional rendering based on the state
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // Render your data as needed
  return (
    <div>
      <h2>Invitations</h2>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>{invitation.list_id}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  )
}
