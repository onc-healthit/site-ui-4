'use server'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Profile from '../direct/shared/Profile'

const ETT_API_URL = process.env.ETT_API_URL

export interface AccountInfo {
  smtpProfiles?: Profile[]
  directList?: string[]
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/passwordManager/change`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
      body: JSON.stringify({ newPassword: newPassword, oldPassword: oldPassword }),
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${JSON.stringify(data)}`)
      return data.message
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

export async function fetchAccountInfo() {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const accountInfo: AccountInfo = {}
    return Promise.allSettled([fetchProfiles(jsessionid), fetchDirectEmails(jsessionid)]).then(
      ([profiles, directEmails]) => {
        if (profiles.status === 'fulfilled') {
          accountInfo.smtpProfiles = profiles.value.filter((profile: Profile) => profile.profileName !== null)
        }
        if (directEmails.status === 'fulfilled') {
          accountInfo.directList = directEmails.value
        }
        return accountInfo
      }
    )
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

async function fetchProfiles(jsessionid: string) {
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

async function fetchDirectEmails(jsessionid: string) {
  const ettAPIUrl = `${ETT_API_URL}/registration/direct`
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
