import { createContext } from 'react'

interface ProfileContextType {
  hostname: string
  email: string
  username: string
  password: string
  tls: boolean
  setHostname: (hostname: string) => void
  setEmail: (email: string) => void
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  setTls: (tls: boolean) => void
}
const defaultValue: ProfileContextType = {
  hostname: '',
  email: '',
  username: '',
  password: '',
  tls: false,
  setHostname: () => {},
  setEmail: () => {},
  setUsername: () => {},
  setPassword: () => {},
  setTls: () => {},
}

export const ProfileContext = createContext<ProfileContextType>(defaultValue)
