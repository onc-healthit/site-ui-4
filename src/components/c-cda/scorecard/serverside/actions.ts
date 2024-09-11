'use server'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ScorecardJsonResponseType } from '../types/ScorecardJsonResponseType'
import { NextResponse } from 'next/server'

// Add an interceptor to log requests
// axios.interceptors.request.use(
//   (request) => {
//     console.log('Starting Request', request)
//     return request
//   },
//   (error) => {
//     console.error('Request error', error)
//     return Promise.reject(error)
//   }
// )

export async function saveScorecardReportAction(jsonToSaveReportWith: ScorecardJsonResponseType) {
  const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'
  // const apiUrl = 'http://ccda.healthit.gov/scorecard/savescorecardservice'
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      // prettier-ignore
      // 'Accept': 'application/pdf',
      ContentType: 'application/json',
      Accept: 'application/pdf',
    },
    body: JSON.stringify(jsonToSaveReportWith),
  })

  if (!response.ok) {
    throw new Error(`Failed to save scorecard results: ${response.status} ${response.statusText}`)
  }

  const pdfBlob = await response.blob()
  const url = URL.createObjectURL(pdfBlob)
  window.open(url)

  return pdfBlob
}

export async function saveScorecardReportAxiosAction(jsonToSaveReportWith: ScorecardJsonResponseType) {
  // export async function saveScorecardReportAxiosAction(jsonToSaveReportWith: string) {
  // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'
  // const apiUrl = 'http://ccda.healthit.gov/scorecard/savescorecardservice/'
  const config = {
    method: 'POST',
    url: apiUrl,
    // url: corsProxyUrl + apiUrl,
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Accept': '*/*',
      // 'Accept': 'application/pdf',
    },
    // data: JSON.stringify(jsonToSaveReportWith),
    data: jsonToSaveReportWith, // axios turns it into a string automatically...
    // data: JSON.stringify(jsonWithSchemaErrors),
    responseType: 'arraybuffer' as const, // Ensure binary data is correctly handled
    // responseType: 'blob' as const,
  }

  console.log('Request data: ', config)

  // try {
  // const response = await axios.request(config);

  //     // If the request fails, axios will throw an error, so no need for explicit response.ok check
  //   const pdfBuffer = response.data;

  //   // Return the PDF buffer as a response with appropriate headers
  //   return new NextResponse(pdfBuffer, {
  //     status: 200,
  //     headers: {
  //       'Content-Type': 'application/pdf',
  //       'Content-Disposition': 'attachment; filename="scorecard.pdf"',
  //     },
  //   });
  // } catch (error) {
  //   // Handle errors, providing more detailed error information from axios
  //   return new NextResponse(`Error: ${error.response?.status || 500} - ${error.message}`, {
  //     status: error.response?.status || 500,
  //   });
  // }

  try {
    console.log('right before request made...')
    const response = await axios.request(config) // we never get past this line...
    console.log('response!: ', response)

    console.log('attempt to make pdf blob from response data...')
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
    // const pdfBlob = response.data
    console.log('made blob...')

    console.log('attempt to create url from blob...')
    const url = URL.createObjectURL(pdfBlob)
    console.log('made url...')

    console.log('attempt to open window with url...')
    window.open(url)
    console.log('opened window with url...')

    return pdfBlob
  } catch (error) {
    const e = error as AxiosError
    throw new Error(
      `Failed to save scorecard results: ${e.response?.status || 'Unknown'} ${e.response?.statusText || e.message}`
    )
  }

  // try {
  //   const response = await axios.request(config)
  //   //console.log(JSON.stringify(response.data))
  //   console.log('Validator V1 response status', response.status)
  //   return { response: response.data }
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.error(error.response?.data)
  //     return {
  //       response: {
  //         error: 'Validator Service had an issue, Please try again later!',
  //         errorStatus: error.response?.status,
  //       },
  //     }
  //   } else {
  //     console.error(error)
  //   }
  // }
}

// export async function saveScorecardReportAxiosDebugAction(jsonToSaveReportWith: ScorecardJsonResponseType) {
export async function saveScorecardReportAxiosDebugAction() {
  const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'

  const config: AxiosRequestConfig = {
    method: 'POST',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Accept': '*/*', // Accept any content type
    },
    // data: JSON.parse(JSON.stringify(jsonToSaveReportWith)), // Explicitly stringify the data
    // data: jsonToSaveReportWith,
    // data: jsonWithSchemaErrors,
    data: JSON.stringify(jsonWithSchemaErrors),
    // transformRequest: [(data) => data], // Prevent axios from stringifying again
    responseType: 'arraybuffer',
    validateStatus: function (status: number): boolean {
      return status >= 200 && status < 300 // Default validateStatus
    },
  }

  try {
    const response = await axios.request(config)

    // Check the content type of the response
    const contentType = response.headers['content-type']
    if (contentType && contentType.includes('application/pdf')) {
      // It's a PDF, proceed as before
      return new NextResponse(response.data, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="scorecard.pdf"',
        },
      })
    } else {
      // It's not a PDF, might be an error message
      const textData = new TextDecoder().decode(response.data)
      console.error('Unexpected response:', textData)
      return new NextResponse(`Unexpected response from server: ${textData}`, {
        status: 500,
      })
    }
  } catch (error) {
    console.error('Error details:', error)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const errorMessage = axiosError.response?.data
        ? new TextDecoder().decode(axiosError.response.data as ArrayBuffer)
        : axiosError.message
      return new NextResponse(`Failed to save scorecard results: ${errorMessage}`, {
        status: axiosError.response?.status || 500,
      })
    }
    return new NextResponse(`An unexpected error occurred: ${(error as Error).message}`, {
      status: 500,
    })
  }
}

export const jsonWithSchemaErrors: ScorecardJsonResponseType = {
  errorMessage: 'HL7 CDA Schema Errors must be addressed before a score can be provided.',
  filename: 'sampleWithSchemaErrors.xml',
  ccdaDocumentType: 'CCD',
  results: null,
  referenceResults: [],
  schemaErrorList: [
    {
      description:
        "The 'validateST' invariant is violated on 'org.eclipse.mdht.uml.hl7.datatypes.impl.ENXPImpl@310d33d{http:///resource33.xml#//@clinicalDocument/@recordTarget.0/@patientRole/@patient/@name.0/@given.0}'",
      type: 'C-CDA MDHT Conformance Error',
      xPath: '/ClinicalDocument/recordTarget/patientRole/patient/name/given',
      validatorConfiguredXpath: null,
      documentLineNumber: '56',
      actualCode: null,
      actualCodeSystem: null,
      actualCodeSystemName: null,
      actualDisplayName: null,
      schemaError: true,
      dataTypeSchemaError: true,
      sectionName: null,
    },
    {
      description:
        "The 'validateST' invariant is violated on 'org.eclipse.mdht.uml.hl7.datatypes.impl.ENXPImpl@cd15055{http:///resource33.xml#//@clinicalDocument/@recordTarget.0/@patientRole/@patient/@name.0/@family.0}'",
      type: 'C-CDA MDHT Conformance Error',
      xPath: '/ClinicalDocument/recordTarget/patientRole/patient/name/family',
      validatorConfiguredXpath: null,
      documentLineNumber: '60',
      actualCode: null,
      actualCodeSystem: null,
      actualCodeSystemName: null,
      actualDisplayName: null,
      schemaError: true,
      dataTypeSchemaError: true,
      sectionName: null,
    },
    {
      description:
        "The 'validateST' invariant is violated on 'org.eclipse.mdht.uml.hl7.datatypes.impl.ENXPImpl@50dc304a{http:///resource33.xml#//@clinicalDocument/@recordTarget.0/@patientRole/@patient/@name.0/@suffix.0}'",
      type: 'C-CDA MDHT Conformance Error',
      xPath: '/ClinicalDocument/recordTarget/patientRole/patient/name/suffix',
      validatorConfiguredXpath: null,
      documentLineNumber: '62',
      actualCode: null,
      actualCodeSystem: null,
      actualCodeSystemName: null,
      actualDisplayName: null,
      schemaError: true,
      dataTypeSchemaError: true,
      sectionName: null,
    },
  ],
  schemaErrors: true,
  success: false,
}
