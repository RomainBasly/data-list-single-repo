'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const UserInfoContext = createContext<any>({
  userId: null,
})

export const useUserInfo = () => {
  return useContext(UserInfoContext)
}

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userAttributes, setUserAttributes] = useState<{
    userId: string | null
  }>({ userId: null })

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      setUserAttributes({ userId })
    }
  }, [])

  return (
    <UserInfoContext.Provider value={{ userAttributes }}>
      {children}
    </UserInfoContext.Provider>
  )
}
