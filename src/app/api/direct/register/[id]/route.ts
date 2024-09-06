import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'

const ETT_API_URL = process.env.ETT_API_URL

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ettAPIUrl = `${ETT_API_URL}/registration/contact/${params.id}`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'GET',
    })
    const data = await response.json()
    return NextResponse.json(
      data.map((x) => x.result),
      { status: 200 }
    )
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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const emailAddressToRegister = body.contactEmailAddressToAdd?.toLowerCase()
  if (_.isEmpty(emailAddressToRegister)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Email address is required',
      },
      { status: 500 }
    )
  }
  const ettAPIUrl = `${ETT_API_URL}/registration/contact/${params.id}`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      body: emailAddressToRegister,
    })
    const data = await response.json()
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (request.nextUrl.searchParams.has('contact')) {
    const contactEmailAddress = request.nextUrl.searchParams.get('contact')
    const ettAPIUrl = `${ETT_API_URL}/registration/contact/${params.id}/${contactEmailAddress}`
    try {
      const response = await fetch(ettAPIUrl, {
        method: 'DELETE',
      })
      const data = await response.json()
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
  } else {
    try {
      const ettAPIUrl = `${ETT_API_URL}/registration/direct/${params.id}`
      const response = await fetch(ettAPIUrl, {
        method: 'DELETE',
      })
      const data = await response.json()
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
}
