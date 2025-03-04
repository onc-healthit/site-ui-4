'use server'
import axios from 'axios'
import { authOptions } from '@/lib/auth'
import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export interface APICallData {
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
  previousResult?: APICallResponse
}

export interface SMTPLogAPICallData {
  attachments: string[]
  criteriaMet: boolean
  testCaseNumber: string
  testRequestResponses: TestRequestResponses
  profileName: string
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

export interface APICallResponse {
  didRequestTimeOut: boolean
  timeElapsedInSeconds: number
  proctored: boolean
  attachments: Record<string, unknown>
  CCDAValidationReports: Record<string, unknown>
  MessageId: string
  fetchType: string
  searchType: string
  startTime: string
  lastTestResultStatus: number
  lastTestResponse: string
  testCaseId: number
  testCaseDesc: string | null
  messageId: string
  criteriaMet: string
  testRequestResponses: TestRequestResponses
  ccdavalidationReports: Record<string, unknown>
}

export interface TestRequestResponses {
  [key: string]: string
}

interface XDRAPIResponse {
  criteriaMet: string
  testRequest: string
  testResponse: string
  endpoint: string
  endpointTLS: string
}

interface ResultsMetaData {
  documentType: string
  validationObjective: string
  ccdaVersion: string
  curesUpdate: boolean
  svap2022: boolean
  uscdi: boolean
  validationDate: string
}

interface CCDAValidationResult {
  errorType: string
  messageId: string
}

interface ValidationResults {
  resultsMetaData: ResultsMetaData
  ccdaValidationResults: CCDAValidationResult[]
}

interface StatusResponse {
  criteriaMet: string
  testRequest: string
  testResponse: string
  message: string
  status: string
  results?: ValidationResults
}

export async function handleAPICall(data: APICallData): Promise<APICallResponse[]> {
  const apiUrl = process.env.SMTP_TEST_BY_CRITERIA_ENDPOINT
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const config = {
    method: 'post',
    url: apiUrl,
    headers: session
      ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
      : { 'Content-Type': 'application/json' },
    data: data,
  }

  try {
    const response = await axios(config)
    console.log('raw API call data: ', response)
    console.log('raw API call response.data: ', response.data)
    const responseData: APICallResponse[] = response.data
    return responseData
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

export async function handleSMTPLogAPICall(data: SMTPLogAPICallData): Promise<boolean> {
  const apiUrl = `${process.env.ETT_API_URL}/smtpLog/${data.profileName}`
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''
  const formattedData = {
    attachments: data.attachments,
    criteriaMet: data.criteriaMet,
    testCaseNumber: data.testCaseNumber,
    testRequestResponses: data.testRequestResponses,
  }
  const config = {
    method: 'post',
    url: apiUrl,
    responseType: 'text' as const,
    headers: session
      ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
      : { 'Content-Type': 'application/json' },
    data: JSON.stringify(formattedData),
  }
  try {
    const response = await axios(config)
    console.log('Raw content:', response.data)
    const content = response.data

    return content
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
  return true
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
    console.log('Raw content:', response.data)
    const content = response.data

    let testRequest = ''
    let testResponse = ''
    let endpoint = ''
    let endpointTLS = ''

    if (content && content.content && content.content.value) {
      testRequest = content.content.value.request
      testResponse = content.content.value.response
      endpoint = content.content.value.endpoint
      endpointTLS = content.content.value.endpointTLS
    } else {
      console.error('Invalid response structure:', content)
      testRequest = content.message
      testResponse = content.message
    }

    let criteriaMet = content.status

    if (content && content.content && content.content.criteriaMet != null) {
      criteriaMet = content.content.criteriaMet
    }

    return {
      criteriaMet: criteriaMet,
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

export async function handleCheckMDNCall(data: APICallData): Promise<XDRAPIResponse> {
  const apiUrl = process.env.SMTP_TEST_BY_CRITERIA_ENDPOINT
  const session = await getServerSession(authOptions)
  const jsessionid = session?.user?.jsessionid ?? ''

  const config = {
    method: 'post',
    url: apiUrl,
    headers: session
      ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
      : { 'Content-Type': 'application/json' },
    data: data,
  }

  console.log('Sending data:', config)

  try {
    const response = await axios(config)
    console.log('MDN check raw content:', response.data)
    return response.data[0]
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
      console.error('Headers:', error.response.headers)
    } else {
      console.error('MDN Check Error')
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
    let results: ValidationResults | undefined

    if (content && content.content && content.content.value) {
      testRequest = content.content.value.request || ''
      testResponse = content.content.value.response || ''
      criteriaMet = content.content.criteriaMet || ''

      const ccdaReport = content.content.value.ccdaReport
      if (ccdaReport) {
        const resultsMetaData: ResultsMetaData = ccdaReport.resultsMetaData
        const ccdaValidationResults: CCDAValidationResult[] = ccdaReport.ccdaValidationResults

        results = {
          resultsMetaData: resultsMetaData,
          ccdaValidationResults: ccdaValidationResults,
        }
      }
    }

    console.log('Status fetched: ', content)
    return {
      criteriaMet: criteriaMet,
      testRequest: testRequest,
      testResponse: testResponse,
      message: content.message,
      status: content.status,
      results: results,
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

export async function fetchCCDADocuments(protocol: string): Promise<Documents> {
  console.log(protocol)
  const baseUrl =
    protocol === 'xdr'
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
