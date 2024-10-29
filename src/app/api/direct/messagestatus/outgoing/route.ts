import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
const ETT_API_URL = process.env.ETT_API_URL
export async function GET() {
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  console.log(jsessionid)
  const response = await fetch(`${ETT_API_URL}/directMessageStatus/outgoing`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${jsessionid}`,
    },
  })
  const data = await response.json()
  if (!response.ok) {
    console.error(data)
    return NextResponse.json(
      {
        success: false,
        error: data,
      },
      { status: response.status }
    )
  }
  // console.log(data)
  return NextResponse.json(data, { status: 200 })
}
