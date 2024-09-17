'use server'
import axios from 'axios'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'
import { getServerSession } from 'next-auth'

interface APICallData {
  testCaseNumber: number | string
  sutSmtpAddress: string
  sutEmailAddress: string
  useTLS: boolean
  sutCommandTimeoutInSeconds: number
  sutUserName: string
  sutPassword: string
  tttUserName: string
  tttPassword: string
  startTlsPort: number
  status: string
  ccdaReferenceFilename: string
  ccdaValidationObjective: string
  ccdaFileLink: string
  cures: boolean
  year: string
  hostingcase: string
  ip_address?: string
  port?: string
  direct_to?: string
  direct_from?: string
  targetEndpointTLS?: string
  outgoing_from?: string
  attachmentType?: string
}

export interface Documents {
  [key: string]: {
    dirs: Directory[]
    files: FileDetail[]
  }
}

interface XDRAPICallData {
  ip_address?: string
  port?: string
  direct_to?: string
  direct_from?: string
  targetEndpointTLS?: string
  outgoing_from?: string
  name: string
  path: string
  link: string
  id: string
  jsession: string
  cures: boolean
  itemNumber: string
  selected: boolean
  svap: boolean
  uscdiv3: boolean
}
export interface FileDetail {
  svap: boolean
  cures: boolean
  name: string
  link: string
  uscdiv3: boolean
}

export interface Directory {
  name: string
  dirs: Directory[]
  files: FileDetail[]
}

interface APIResponse {
  criteriaMet: string
  testRequestResponses: string
}

interface XDRAPIResponse {
  criteriaMet: string
  testRequest: string
  testResponse: string
}

export async function handleAPICall(data: APICallData): Promise<APIResponse> {
  const apiUrl = process.env.SMTP_TEST_BY_CRITERIA_ENDPOINT
  const config = {
    method: 'post',
    url: apiUrl,
    headers: { 'Content-Type': 'application/json' },
    data: data,
  }

  try {
    const response = await axios(config)
    return {
      criteriaMet: response.data[0].criteriaMet,
      testRequestResponses: response.data[0].testRequestResponses,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
      console.error('Headers:', error.response.headers)
    } else {
      console.error('Error Message:')
    }
    throw error
  }
}

export async function handleXDRAPICall(data: XDRAPICallData): Promise<XDRAPIResponse> {
  const apiUrl = process.env.XDR_TEST_BY_CRITERIA_ENDPOINT + data.id + '/run'
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const formattedData = {
    targetEndpointTLS: data.targetEndpointTLS,
    ip_address: data.ip_address,
    port: data.port,
    direct_to: data.direct_to,
    direct_from: data.direct_from,
    outgoing_from: data.outgoing_from,
    payload: {
      svap: data.svap,
      cures: data.cures,
      name: data.name,
      link: data.link,
      uscdiv3: data.uscdiv3,
      path: [null, data.path],
      selected: data.selected,
      itemNumber: data.itemNumber,
    },
  }

  const config = {
    method: 'post',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${jsessionid}`,
    },
    data: JSON.stringify(formattedData),
  }

  console.log('Sending data:', config)

  try {
    const response = await axios(config)
    console.log('Raw content 1226:', response.data)
    const content = response.data

    const testRequest = content.content.value.request || content.message
    const testResponse = content.content.value.response || content.message

    return {
      criteriaMet: content.status,
      testRequest: testRequest,
      testResponse: testResponse,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
      console.error('Headers:', error.response.headers)
    } else {
      console.error('Error')
    }
    throw error
  }
}

export async function fetchCCDADocuments(receive: boolean): Promise<Documents> {
  const baseUrl = receive
    ? process.env.CCDA_DOCUMENTS_XDR || 'https://ett.healthit.gov/ett/api/ccdadocuments?testCaseType=xdr'
    : process.env.CCDA_DOCUMENTS || 'https://ett.healthit.gov/ett/api/ccdadocuments?testCaseType'

  const config = {
    method: 'get',
    url: baseUrl.toString(),
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
      console.error('Headers:', error.response.headers)
    } else {
      console.error('Error')
    }
    throw error
  }
}
