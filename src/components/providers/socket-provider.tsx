'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO } from 'socket.io-client'
import { getSocket } from '../Elements/Socket'

type SocketContextType = {
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()
    console.log('socket', socket)

    const handleConnect = () => {
      setIsConnected(true)
    }
    const handleDisconnect = () => {
      deleteId()
      setIsConnected(false)
    }

    const assignId = (data: { id: string }) => {
      console.log('receivedData', data.id)
      localStorage.setItem('SocketConnectorId', data.id)
    }
    const deleteId = () => localStorage.removeItem('SocketConnectorId')

    socket.on('connect', handleConnect)
    socket.on('assign-id', assignId)
    socket.on('disconnect', handleDisconnect)

    socket.on('list-invitation', (data) => {
      console.log('List invitation received: ', data)
    })

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [])
  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
