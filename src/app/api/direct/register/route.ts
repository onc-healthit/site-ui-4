import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'
const ETT_API_URL = process.env.ETT_API_URL

const getETTProperties = async () => {
  const response = await fetch(`${ETT_API_URL}/properties`)
  return await response.json()
}
async function isEmailDomainValid(emailAddressToRegister: any): Promise<boolean> {
  const emailDomain = emailAddressToRegister.split('@')[1]
  const invalidDomains = await getInvalidDomains()
  if (invalidDomains.includes(emailDomain)) {
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(false)
  }
  try {
    const jsessionid = session.user.jsessionid
    const body = await request.json()
    const emailAddressToRegister = body.directEmailAddress?.toLowerCase()
    if (_.isEmpty(emailAddressToRegister)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address is required',
        },
        { status: 500 }
      )
    }
    const isValidEmailDomain = await isEmailDomainValid(emailAddressToRegister)
    if (!isValidEmailDomain) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email domain',
        },
        { status: 500 }
      )
    }
    const response = await fetch(`${ETT_API_URL}/registration/direct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
      body: emailAddressToRegister,
    })
    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: 500 }
      )
    }
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred',
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const jsessionid = session.user.jsessionid
  const response = await fetch(`${ETT_API_URL}/registration/direct`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${jsessionid}`,
    },
  })
  const data = await response.json()
  return NextResponse.json(data, { status: 200 })
}

async function getInvalidDomains() {
  const properties = await getETTProperties()
  const dcdt2014Domain = `${properties?.dcdt2014domain}`
  const dcdt2015Domain = `${properties?.dcdt2015domain}`
  const dcdtDomain = 'dcdt31'
  const invalidDomains = [dcdt2014Domain, dcdt2015Domain, dcdtDomain]
  return invalidDomains
}
