'use server'

import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
const ETT_API_URL = process.env.ETT_API_URL
export async function fetchValidationReport(messageId: string) {
  console.log(`'messageId:', ${messageId}`)
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const response = await fetch(`${ETT_API_URL}/validationReport/${messageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: response.status,
        },
      }
    }
    return { response: data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: 500,
        },
      }
    }
  }
}

export async function fetchValidationReportRawContent(messageId: string) {
  console.log(`'messageId:', ${messageId}`)
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const response = await fetch(`${ETT_API_URL}/validationReport/rawContent/${messageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: response.status,
        },
      }
    }
    return { response: data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: 500,
        },
      }
    }
  }
}

export async function fetchCcdaReport(messageId: string) {
  console.log(`'messageId:', ${messageId}`)
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const response = await fetch(`${ETT_API_URL}/ccdaReport/${messageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: response.status,
        },
      }
    }
    return { response: data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: 500,
        },
      }
    }
  }
}

export async function findMdn(messageId: string) {
  console.log(`'messageId:', ${messageId}`)

  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const ettAPIUrl = `${ETT_API_URL}/findmdn`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
      body: `${messageId}`,
    })
    console.log(response.json)
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${response}`)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: response.status,
        },
      }
    }
    return { response: data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: 500,
        },
      }
    }
  }
}
