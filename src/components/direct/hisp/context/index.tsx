import { createContext } from 'react'

interface ProfileContextType {
  profileid?: string
  profilename: string
  hostname: string
  email: string
  username: string
  password: string
  tls: boolean
  setProfileid: (profileid: string) => void
  setHostname: (hostname: string) => void
  setEmail: (email: string) => void
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  setTls: (tls: boolean) => void
  setProfilename: (profilename: string) => void
}
const defaultValue: ProfileContextType = {
  profileid: '',
  hostname: '',
  email: '',
  username: '',
  password: '',
  tls: false,
  profilename: 'Default Profile',
  setProfileid: () => {},
  setHostname: () => {},
  setEmail: () => {},
  setUsername: () => {},
  setPassword: () => {},
  setTls: () => {},
  setProfilename: () => {},
}

export const ProfileContext = createContext<ProfileContextType>(defaultValue)
