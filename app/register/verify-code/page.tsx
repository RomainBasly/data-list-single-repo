'use client'
import UserStore from '@/Stores/UserStore'
import React, { useEffect, useState } from 'react'

export default function VerifyEmail() {
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    setEmail(UserStore.getInstance().getEmail())
  }, [])

  return <div>{email}</div>
}
