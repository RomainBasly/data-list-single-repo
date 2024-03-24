'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO } from 'socket.io-client'
import { getSocket } from '../Elements/Socket'

type SocketContextType = {
  isConnected: boolean
  listAttributes: {
    listId: number | null
    listName?: string
    author?: string
  }
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  listAttributes: {
    listId: null,
    listName: '',
    author: '',
  },
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [listAttributes, setListAttributes] = useState<{
    listId: number | null
    listName?: string
    author?: string
  }>({ listId: null, listName: '', author: '' })

  useEffect(() => {
    const socket = getSocket()

    const handleConnect = () => {
      setIsConnected(true)
    }
    const handleDisconnect = () => {
      deleteId()
      setIsConnected(false)
    }

    const assignId = (data: { socketConnectionId: string }) => {
      localStorage.setItem('socketConnectionId', data.socketConnectionId)
      const userId = localStorage.getItem('userId')
      socket.emit('register-user-id', {
        socketConnectionId: localStorage.getItem('socketConnectionId'),
        userId,
      })
    }
    const deleteId = () => localStorage.removeItem('socketConnectionId')

    socket.on('connect', handleConnect)
    socket.on('assign-id', assignId)
    socket.on('disconnect', handleDisconnect)

    socket.on(
      'list-invitation-socket',
      (data: { listId: number; listName?: string; author?: string }) => {
      console.log("data", data)
        setListAttributes({
          listId: data.listId,
          listName: data.listName,
          author: data.author,
        })
      },
    )

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [])
  return (
    <SocketContext.Provider value={{ isConnected, listAttributes }}>
      {children}
    </SocketContext.Provider>
  )
}
