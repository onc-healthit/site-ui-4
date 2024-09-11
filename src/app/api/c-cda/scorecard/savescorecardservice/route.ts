import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const jsonDataToSaveReportWith = await request.json()

  try {
    const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'
    // console.log('jsonDataToSaveReportWith proxy: ', JSON.stringify(jsonDataToSaveReportWith))
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Accept: 'application/pdf',
      },
      // body: JSON.stringify(jsonReportData),
      body: jsonDataToSaveReportWith,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Read the response as an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer()

    // Create a new response with the ArrayBuffer
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        ContentType: 'application/pdf',
        ContentDisposition: 'attachment; filename="scorecardReport.pdf"',
      },
    })
  } catch (error) {
    console.error('Error calling Java API:', error)
    return NextResponse.json({ error: 'Failed to generate results PDF' }, { status: 500 })
  }
}

/*
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const jsonReportData = await request.json()

  try {
    const response = await fetch('https://ccda.healthit.gov/scorecard/savescorecardservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      },
      body: JSON.stringify(jsonReportData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Forward the streamed response from the Java API
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="scorecardReport.pdf"',
      },
    })
  } catch (error) {
    console.error('Error calling Java API:', error)
    return NextResponse.json({ error: 'Failed to generate results PDF' }, { status: 500 })
  }
}
*/
