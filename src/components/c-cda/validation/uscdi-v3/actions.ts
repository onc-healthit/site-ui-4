'use server'
import https from 'https'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
export async function getScenarioOptions(criteriaUrl: string) {
  const res = await fetch(criteriaUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
const httpsAgentOptions = {
  rejectUnauthorized: false,
  keepAlive: true,
}
async function getToken() {
  const clientSecret = process.env.CCDA_VALIDATOR_V3_CLIENT_SECRET || ''
  const clientId = process.env.CCDA_VALIDATOR_V3_CLIENT_ID || ''
  const keycloakUrl = process.env.KEYCLOAK_URL || ''
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
    console.log(error)
    throw new Error('failed to fetch token from keycloak')
  }
}

export async function submitForm(prevState: object, formData: FormData) {
  const ccdaValidatorUrl = process.env.CCDA_VALIDATOR_URL
  const token = await getToken()
  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File', uploadFile)
  formData.append('curesUpdate', 'false')
  formData.append('svap2022', 'false')
  formData.append('svap2023', 'true')
  console.log(formData)
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
    //
    return { response: response.data }
  } catch (error) {
    console.error(error)
    throw new Error('failed to get validator results')
  }
  revalidatePath('/c-cda/uscdi-v3')
}
