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

const postToUscdiValidator = async (formData: FormData, uscdiVersion: string) => {
  const ccdaValidatorUrl = process.env.CCDA_VALIDATOR_URL
  const token = await getToken()
  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File', uploadFile)

  formData.append('curesUpdate', uscdiVersion === 'v1' ? 'true' : 'false')
  formData.append('svap2022', uscdiVersion === 'v2' ? 'true' : 'false')
  formData.append('svap2023', uscdiVersion === 'v3' ? 'true' : 'false')
  // TODO: Update v4 based on arg value or impl if complex type when implemented in ref val
  formData.append('uscdiv4', uscdiVersion === 'v4' ? 'true' : 'false')

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

  console.log(`Submitted data for Validator ${uscdiVersion}: `, formData)

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
    console.log('Response data', JSON.stringify(response.data))
    console.log(`Validator ${uscdiVersion} API response status`, response.status)
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
