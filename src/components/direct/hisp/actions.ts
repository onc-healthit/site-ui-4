'use server'

import { authOptions } from '@/lib/auth'
import { StringIterator } from 'lodash'
import { getServerSession } from 'next-auth'

const ETT_API_URL = process.env.ETT_API_URL
export interface Profile {
  hostname: string
  email: string
  username: string
  password: string
  istls: boolean
  profilename: string
  profileid: string
}

export async function saveProfile(data: Profile) {
  console.log(`'Saving profile:', ${JSON.stringify(data)}`)
  const { hostname, email, username, password, istls, profilename } = data
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/smtpProfile`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
      body: JSON.stringify({
        sutSMTPAddress: hostname,
        sutEmailAddress: email,
        sutUsername: username,
        sutPassword: password,
        useTLS: istls,
        profileName: profilename,
        username: session?.user?.name,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}

export async function deleteProfile(profilename: string) {
  console.log(`deleting profile: ${profilename}`)
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/smtpProfile/${profilename}`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}

export async function fetchProfiles() {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/smtpProfile`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}

export async function fetchProfileReport(profilename: string) {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/smtpLog/${profilename}`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}
