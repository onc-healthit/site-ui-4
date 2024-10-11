import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
const ETT_API_URL = process.env.ETT_API_URL
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(false)
  }
  try {
    const jsessionid = session?.user?.jsessionid ?? ''
    const body = await request.json()
    const mdnId = body.mdnId

    const response = await fetch(`${ETT_API_URL}/findmdn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
      body: mdnId,
    })
    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: response.status }
      )
    }
    return NextResponse.json(data, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'An error occurred',
        },
        { status: 500 }
      )
    }
  }
}
