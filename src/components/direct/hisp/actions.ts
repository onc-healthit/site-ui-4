'use server'
import { authOptions } from '@/lib/auth'
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

async function getUserSession() {
  const session = await getServerSession(authOptions)
  if (session === null) {
    throw new Error('No session found')
  }
  return session
}

export async function saveProfile(data: Profile) {
  console.log(`'Saving profile:', ${JSON.stringify(data)}`)
  const { hostname, email, username, password, istls, profilename } = data
  try {
    const session = await getUserSession()
    const jsessionid = session?.user?.jsessionid ?? ''
    const ettAPIUrl = `${ETT_API_URL}/smtpProfile`
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
    console.log(`Error saving profile: ${error}`)
    return null
  }
}

export async function deleteProfile(profilename: string) {
  console.log(`deleting profile: ${profilename}`)
  try {
    const session = await getUserSession()
    const jsessionid = session?.user?.jsessionid ?? ''
    const ettAPIUrl = `${ETT_API_URL}/smtpProfile/${profilename}`
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
    console.log(`Error deleting profile: ${error}`)
    return null
  }
}

export async function fetchProfiles() {
  try {
    const session = await getUserSession()
    const jsessionid = session?.user?.jsessionid ?? ''
    const ettAPIUrl = `${ETT_API_URL}/smtpProfile`
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
    console.log(`Error fetching profile: ${error}`)
    return null
  }
}

export async function fetchProfileReport(profilename: string) {
  try {
    const session = await getUserSession()
    const jsessionid = session?.user?.jsessionid ?? ''
    const ettAPIUrl = `${ETT_API_URL}/smtpLog/${profilename}`
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
    console.log(`Error fetching profile report: ${error}`)
    return null
  }
}
