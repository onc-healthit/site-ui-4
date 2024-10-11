import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
const ETT_API_URL = process.env.ETT_API_URL

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const response = await fetch(`${ETT_API_URL}/validationReport/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${jsessionid}`,
      },
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
    return NextResponse.json(data.map(data, { status: 200 }))
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
