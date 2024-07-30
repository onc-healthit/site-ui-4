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

export async function handleAPICall(data: APICallData): Promise<APIResponse> {
  const apiUrl = process.env.TEST_BY_CRITERIA_ENDPOINT
  const config = {
    method: 'post',
    url: apiUrl,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
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

export async function fetchCCDADocuments(): Promise<Documents> {
  const apiUrl = process.env.CCDA_DOCUMENTS
  const config = {
    method: 'get',
    url: apiUrl,
    headers: { 'Content-Type': 'application/json' },
  }
  try {
    const response = await axios(config)
    return response.data // Assuming the data is in the format expected by DocumentSelector
  } catch (error) {
    console.error('Error fetching CCDA documents:', error)
    throw error
  }
}
