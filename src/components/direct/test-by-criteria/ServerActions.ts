'use server'
import axios from 'axios'
import { authOptions } from '@/lib/auth'
import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'
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
  endpoint: string
  endpointTLS: string
}

interface StatusResponse {
  criteriaMet: string
  testRequest: string
  testResponse: string
  message: string
  status: string
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
    headers: session
      ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
      : { 'Content-Type': 'application/json' },
    data: JSON.stringify(formattedData),
  }

  console.log('Sending data:', config)

  try {
    const response = await axios(config)
    console.log('Raw content 1205:', response.data)
    const content = response.data

    let testRequest = ''
    let testResponse = ''
    let endpoint = ''
    let endpointTLS = ''

    if (content && content.content && content.content.value) {
      testRequest = content.content.value.request || content.message
      testResponse = content.content.value.response || content.message
      endpoint = content.content.value.endpoint || content.message
      endpointTLS = content.content.value.endpointTLS || content.message
    } else {
      console.error('Invalid response structure:', content)
      testRequest = content.message
      testResponse = content.message
    }

    return {
      criteriaMet: content.status,
      testRequest: testRequest,
      testResponse: testResponse,
      endpoint: endpoint,
      endpointTLS: endpointTLS,
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

export async function GetStatus(testCaseId: string): Promise<StatusResponse> {
  const statusUrl = process.env.XDR_TEST_BY_CRITERIA_ENDPOINT + testCaseId + '/status'
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  try {
    const response = await axios.get(statusUrl, {
      headers: session
        ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
        : { 'Content-Type': 'application/json' },
    })
    const content = response.data
    let testRequest = ''
    let testResponse = ''
    let criteriaMet = ''
    if (content && content.content && content.content.value) {
      testRequest = content.content.value.request || content.message
      testResponse = content.content.value.response || content.message
      criteriaMet = content.content.criteriaMet
    }
    console.log('Status fetched: ', content)
    return {
      criteriaMet: criteriaMet,
      testRequest: testRequest,
      testResponse: testResponse,
      message: content.message,
      status: content.status,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch status:', error.response?.data)
      throw new Error(`Failed to fetch status: ${error.message}`)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
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
