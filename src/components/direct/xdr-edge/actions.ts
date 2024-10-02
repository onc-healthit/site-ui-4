'use server'
import axios from 'axios'

export async function getSampleCCDAFiles(sampleCCDAFilesEndpoint: string) {
  const res = await fetch(sampleCCDAFilesEndpoint, { next: { revalidate: 3600 } })
  if (!res.ok) {
    console.error(res)
    return []
  }
  return res.json()
}

export async function handleSendMessage(prevState: object | undefined, formData: FormData) {
  let Api = ''
  if (formData.has('attachmentFilePath')) {
    Api = process.env.XDR_SEND_MESSAGE_WITH_ATTACHEMENTFILEPATH || ''
  } else if (formData.has('attachment')) {
    Api = process.env.XDR_SEND_MESSAGE_WITH_ATTACHEMENTFILE || ''
  }

  const config = {
    method: 'post',
    url: Api,

    data: formData,
  }
  console.log('Submitted data for XDR SendMessage ', config, formData)
  try {
    const response = await axios.request(config)
    console.log('XDR SendMessage response status', response.status)
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
      return {
        response: {
          error: 'They was an error connecting to the backend, Please try again later!',
          errorStatus: error.response?.status,
        },
      }
    } else {
      console.error(error)
    }
  }
}

export async function handleMessageValidation(prevState: object | undefined, formData: FormData) {
  const address = formData.get('fromAddress') || ''
  const url = process.env.XDR_SEARCH_MESSAGE_LOGS_BY_FROM_ADDRESS_URL || ''
  const Api = url + address

  const config = {
    method: 'get',
    url: Api,
  }
  console.log('Submitted data for XDR ValidateMessage ', config)
  try {
    const response = await axios.request(config)
    console.log('XDR ValidateMessage response status', response.status)
    console.log('XDR ValidateMessage response data', response.data)
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
      return {
        response: {
          error: 'They was an error connecting to the backend, Please try again later!',
          errorStatus: error.response?.status,
        },
      }
    } else {
      console.error(error)
    }
  }
}
