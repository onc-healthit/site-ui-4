'use client'
import { useState } from 'react'
import { ProfileContext } from '../context'

import { ReactNode } from 'react'

interface ProfileProviderProps {
  children: ReactNode
}

export default function ProfileProvider({ children }: ProfileProviderProps) {
  const [profileid, setProfileid] = useState('')
  const [hostname, setHostname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tls, setTls] = useState(false)
  const [profilename, setProfilename] = useState('')

  return (
    <ProfileContext.Provider
      value={{
        profileid,
        hostname,
        email,
        username,
        password,
        tls,
        setProfileid,
        profilename,
        setHostname,
        setEmail,
        setUsername,
        setPassword,
        setTls,
        setProfilename,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
