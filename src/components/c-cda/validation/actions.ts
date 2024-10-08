'use server'
import https from 'https'
import axios from 'axios'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
//Get Scenario file options
export async function getScenarioOptions(criteriaUrl: string) {
  const res = await fetch(criteriaUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//Get token from keycloak
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

//CCDA Validator API Post Call for version V3
export async function postToValidatorV3(prevState: object | undefined, formData: FormData) {
  const ccdaValidatorUrl = process.env.CCDA_VALIDATOR_URL
  const token = await getToken()
  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File', uploadFile)
  formData.append('curesUpdate', 'false')
  formData.append('svap2022', 'false')
  formData.append('svap2023', 'true')
  if (formData.get('version') === 'v3IG') {
    formData.append('referenceFileName', 'Readme.txt')
    formData.append('validationObjective', 'C-CDA_IG_Only')
  }
  if (
    formData.get('validationObjective') === 'C-CDA_IG_Only' ||
    formData.get('validationObjective') === 'C-CDA_IG_Plus_Vocab'
  ) {
    formData.append('referenceFileName', 'Readme.txt')
  }
  console.log('Submitted data for Validator V3: ', formData)
  const config = {
    method: 'post',
    url: ccdaValidatorUrl,
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
    data: formData,
  }

  try {
    const response = await axios.request(config)
    //console.log(JSON.stringify(response.data))
    console.log('Validator V3 API response status', response.status)
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
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

//CCDA Validator API Post Call for version V1
export async function postToValidatorV1(prevState: object | undefined, formData: FormData) {
  const ccdaValidatorUrl = process.env.CCDA_VALIDATOR_URL
  const token = await getToken()
  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File', uploadFile)
  formData.append('curesUpdate', 'true')
  formData.append('svap2022', 'false')
  formData.append('svap2023', 'false')
  if (formData.get('version') === 'v1IG') {
    formData.append('referenceFileName', 'Readme.txt')
    formData.append('validationObjective', 'C-CDA_IG_Only')
  }
  if (
    formData.get('validationObjective') === 'C-CDA_IG_Only' ||
    formData.get('validationObjective') === 'C-CDA_IG_Plus_Vocab'
  ) {
    formData.append('referenceFileName', 'Readme.txt')
  }
  console.log('Submitted data for Validator V1: ', formData)
  const config = {
    method: 'post',
    url: ccdaValidatorUrl,
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
    data: formData,
  }

  try {
    const response = await axios.request(config)
    //console.log(JSON.stringify(response.data))
    console.log('Validator V1 response status', response.status)
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
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
