'use server'
import https from 'https'
import axios from 'axios'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'

// Get Scenario file options
export async function getScenarioOptions(criteriaUrl: string) {
  const res = await fetch(criteriaUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

// Get token from keycloak
async function getToken() {
  const clientSecret = process.env.CCDA_VALIDATOR_CLIENT_SECRET || ''
  const clientId = process.env.CCDA_VALIDATOR_CLIENT_ID || ''
  const keycloakUrl = process.env.KEYCLOAK_URL || ''
  const httpsAgentOptions = {
    rejectUnauthorized: false,
    keepAlive: true,
  }
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'client_credentials')
  try {
    const response = await axios.post(keycloakUrl, params, {
      httpsAgent: new https.Agent(httpsAgentOptions), //this was needed for dev endpoint TLS issue with IP match, can remove for Prod
    })
    console.log('Token retrieved from keycloak: response.data', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
      return { response: { error: 'Failed to fetch token from keycloak', errorStatus: error.response?.status } }
    } else {
      console.error(error)
    }
  }
}

function ensureTrailingSlash(url: string): string {
  // We define our env vars so this should never happen but if it does,
  // this will keep it from redirecting and failing the request
  if (!url.endsWith('/')) {
    return `${url}/` // Add a slash if it doesn't exist
  }
  return url // Return the original URL if it already ends with a slash
}

const postToUscdiValidator = async (formData: FormData, uscdiVersion: string) => {
  const ccdaValidatorUrl = process.env.CCDA_VALIDATOR_URL
  if (!ccdaValidatorUrl) {
    throw new Error('The C-CDA Validator API URL is undefined, there is no valid endpoint to call')
  }
  const ccdaValUrlWithTrailngSlash = ensureTrailingSlash(ccdaValidatorUrl!)
  console.log('C-CDA Validator API URL:', ccdaValUrlWithTrailngSlash)

  const token = await getToken()
  // console.log('Acces Token: ', token.access_token)

  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File', uploadFile)

  // Handle new string format in RefVal for uscdi type
  const uscdiVersionApiFormDataKey = 'ccdaType'
  switch (uscdiVersion) {
    case 'v1':
      // uscdiv1
      formData.append(uscdiVersionApiFormDataKey, 'cures')
      break
    case 'v2':
      // uscdiv2
      formData.append(uscdiVersionApiFormDataKey, 'svap')
      break
    case 'v3':
      formData.append(uscdiVersionApiFormDataKey, 'uscdiv3')
      break
    case 'v4':
      formData.append(uscdiVersionApiFormDataKey, 'uscdiv4')
  }

  // Note: version formData is set externally
  console.log('formData version:', formData.get('version'))
  if (formData.get('version') === `${uscdiVersion}IG`) {
    formData.append('referenceFileName', 'Readme.txt')
    formData.append('validationObjective', 'C-CDA_IG_Only')
  }

  if (
    formData.get('validationObjective') === 'C-CDA_IG_Only' ||
    formData.get('validationObjective') === 'C-CDA_IG_Plus_Vocab'
  ) {
    formData.append('referenceFileName', 'Readme.txt')
  }

  console.log('Submitted form data for validator:')
  const formDataEntries = Array.from(formData.entries())
  formDataEntries.forEach((pair) => {
    console.log(pair[0] + ', ' + pair[1])
  })

  const config = {
    method: 'post',
    url: ccdaValUrlWithTrailngSlash,
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
    data: formData,
  }

  try {
    const response = await axios.request(config)
    console.log(`URL submitted to API: ${config.url}`)
    console.log('Response data', JSON.stringify(response.data))
    console.log(`Validator ${uscdiVersion} API response status`, response.status)
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error', error)
      console.error('error.response:', error.response)
      console.error('errorResponseData:', error.response?.data)
      console.error('responseUrl: ', +error.response?.request.res.responseUrl)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
          errorStatus: error.response?.status,
        },
      }
    } else {
      console.error(error)
    }
  }
}

// C-CDA R2.1 Validator API Post Call for USCDI version 1
// Note: C-CDA R2.1 Validator for USCDI version 2 has been sunsetted by the ONC - but version 1 is still supported
export async function postToValidatorV1(prevState: object | undefined, formData: FormData) {
  return await postToUscdiValidator(formData, 'v1')
}

// C-CDA R2.1 Validator API Post Call for USCDI version 3
export async function postToValidatorV3(prevState: object | undefined, formData: FormData) {
  return await postToUscdiValidator(formData, 'v3')
}

// C-CDA R2.1 Validator API Post Call for USCDI version 4
export async function postToValidatorV4(prevState: object | undefined, formData: FormData) {
  return await postToUscdiValidator(formData, 'v4')
}
