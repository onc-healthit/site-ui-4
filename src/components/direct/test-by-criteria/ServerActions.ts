'use server'
import axios from 'axios'

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

interface XDRAPICallData {
  ip_address?: string
  port?: string
  direct_to?: string
  direct_from?: string
  targetEndpointTLS?: string
  outgoing_from?: string
  ccdaReferenceFilename: string
  ccdaValidationObjective: string
  ccdaFileLink: string
  id: string
  jsession: string
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

export interface Documents {
  [key: string]: {
    dirs: Directory[]
    files: FileDetail[]
  }
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
  const config = {
    method: 'post',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `JSESSIONID=${data.jsession}`,
    },
    data: data,
  }

  console.log('Sending data:', config)

  try {
    const response = await axios(config)
    console.log('Raw content:', response.data)
    const content = response.data

    return {
      criteriaMet: response.data.status,
      testRequest: response.data.content.value.request,
      testResponse: response.data.content.value.response,
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

export async function fetchCCDADocuments(): Promise<Documents> {
  const apiUrl = process.env.CCDA_DOCUMENTS
  const config = {
    method: 'get',
    url: apiUrl,
    headers: { 'Content-Type': 'application/json' },
  }
  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error('Error fetching CCDA documents:', error)
    throw error
  }
}
