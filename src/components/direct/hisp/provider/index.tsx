'use client'
import { useState } from 'react'
import { ProfileContext } from '../context'

import { ReactNode } from 'react'

interface ProfileProviderProps {
  children: ReactNode
}

export default function ProfileProvider({ children }: ProfileProviderProps) {
  const [hostname, setHostname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tls, setTls] = useState(false)

  return (
    <ProfileContext.Provider
      value={{
        hostname,
        email,
        username,
        password,
        tls,
        setHostname,
        setEmail,
        setUsername,
        setPassword,
        setTls,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
