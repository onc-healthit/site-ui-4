'use server'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
import axios from 'axios'

export async function getSampleCCDAFiles(sampleCCDAFilesEndpoint: string) {
  const res = await fetch(sampleCCDAFilesEndpoint, { next: { revalidate: 3600 } })
  if (!res.ok) {
    console.error(res)
    return []
  }
  return res.json()
}

export async function handleSendMessageWithAttachmentFilepath(prevState: object | undefined, formData: FormData) {
  const Api = process.env.TTT_SEND_MESSAGE_WITH_ATTACHEMENTFILEPATH

  const config = {
    method: 'post',
    url: Api,

    data: formData,
  }
  console.log('Submitted data for TTT SendMessageWithAttachmentFilepath ', config, formData)
  try {
    const response = await axios.request(config)
    console.log('TTT SendMessageWithAttachmentFilepath response status', response.status)
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

export async function handleSendMessageWithAttachmentFile(prevState: object | undefined, formData: FormData) {
  const Api = process.env.TTT_SEND_MESSAGE_WITH_ATTACHEMENTFILE
  // const uploadFile = formData.get('attachment')
  //console.log('uploaded File', uploadFile)
  const config = {
    method: 'post',
    url: Api,

    data: formData,
  }

  console.log('Submitted data TTT SendMessageWithAttachmentFile ', config, formData)
  try {
    const response = await axios.request(config)
    console.log('TTT SendMessageWithAttachmentFile response status', response.status)
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

export async function handleSearchSITEInbox(prevState: object | undefined, formData: FormData) {
  const Api = process.env.TTT_SEARCH_SITEINBOX

  const config = {
    method: 'GET',
    url: Api,
    params: { fromAddress: formData.get('fromAddress') },
    timeout: 300000,
  }

  console.log('Submitted data TTT SearchSITEInbox', config)
  try {
    const response = await axios.request(config)
    console.log('TTT SearchSITEInbox response status', response.status)
    return { response: response.data }
  } catch (error) {
    console.error(error)
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

export async function handleSearchHHSInbox(prevState: object | undefined, formData: FormData) {
  const Api = process.env.TTT_SEARCH_HHSINBOX

  const config = {
    method: 'GET',
    url: Api,
    params: { fromAddress: formData.get('fromAddress') },
  }

  console.log('Submitted data TTT SearchHHSInbox ', config)
  try {
    const response = await axios.request(config)
    console.log('TTT SearchHHSInbox response status', response.status)
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

export async function handleUploadTrustAnchor(prevState: object | undefined, formData: FormData) {
  const Api = process.env.TTT_UPLOAD_TRUSTANCHOR
  // const uploadFile = formData.get('anchoruploadfile')
  //console.log('uploaded File', uploadFile)
  const config = {
    method: 'post',
    url: Api,

    data: formData,
  }

  console.log('Submitted data UploadTrustAnchor ', config, formData)
  try {
    const response = await axios.request(config)
    console.log('TTT UploadTrustAnchor response status', response.status)
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
