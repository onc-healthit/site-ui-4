'use server'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
import axios from 'axios'

export async function postTempUpload(file: File) {
  const Api = process.env.ETT_TEMP_UPLOAD_API
  const formData = new FormData()
  formData.append('file', file)
  formData.append('flowRelativePath', file.name)
  formData.append('flowTotalSize', file.size.toString())
  formData.append('flowFilename', file.name)
  const config = {
    method: 'post',
    url: Api,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  try {
    const response = await axios.request(config)
    console.log('Temp Upload response status', response.status)
    return { response: response.data.flowRelativePath }
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

// Send Direct Message API Post Call
export async function handleSendDirectMessage(prevState: object | undefined, formData: FormData) {
  const sendDirectApi = process.env.SEND_DIRECT_API
  const domainName = formData.get('domainName') as string
  const version = formData.get('version')
  const fromAddress = (formData.get('fromAddress') as string) + '@' + domainName
  const toAddress = formData.get('toAddress') as string
  const subject = formData.get('subject') !== '' ? (formData.get('subject') as string) : 'Test Message'
  const textMessage = formData.get('textMessage') !== '' ? (formData.get('textMessage') as string) : 'Test Message'
  const attachmentFile =
    formData.get('attachmentFile') !== '' ? (formData.get('attachmentFile') as string) : 'CCDA_Ambulatory.xml'
  const wrapped = version === 'v13' ? true : formData.get('wrapped') === 'on' ? true : false
  const invalidDigest = formData.get('invalidDigest') === 'on' ? true : false
  const signingCert = formData.get('signingCert') !== '' ? (formData.get('signingCert') as string) : ''
  const signingCertPassword = ''

  const digestAlgo =
    version === 'v13'
      ? formData.get('digestAlgo') !== ''
        ? (formData.get('digestAlgo') as string)
        : 'sha256'
      : formData.get('digestAlgo') !== ''
        ? (formData.get('digestAlgo') as string)
        : 'sha1'
  const ownCcdaAttachment = formData.get('ownCcdaAttachment') as File
  const encryptionCert = formData.get('encryptionCert') as File

  let ownCcdaAttachmentTempPath = ''
  if (ownCcdaAttachment.size !== 0) {
    const tempPath = await postTempUpload(ownCcdaAttachment)
    ownCcdaAttachmentTempPath = tempPath?.response || ''
    console.log('ownCcdaAttachmentTempPath', ownCcdaAttachmentTempPath)
  }
  let encryptionCertTempPath = ''
  if (encryptionCert.size !== 0) {
    const tempPath = await postTempUpload(encryptionCert)
    encryptionCertTempPath = tempPath?.response || ''
    console.log('encryptionCertTempPath', encryptionCertTempPath)
  }
  const data = JSON.stringify({
    fromAddress: fromAddress,
    toAddress: toAddress,
    subject: subject,
    textMessage: textMessage,
    attachmentFile: attachmentFile,
    wrapped: wrapped,
    invalidDigest: invalidDigest,
    signingCert: signingCert,
    signingCertPassword: signingCertPassword,
    directVersion: version,
    digestAlgo: digestAlgo,
    ownCcdaAttachment: ownCcdaAttachmentTempPath,
    encryptionCert: encryptionCertTempPath,
  })
  const config = {
    method: 'post',
    url: sendDirectApi,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }
  console.log('Submitted data for Send Direct ', config)
  try {
    const response = await axios.request(config)
    console.log(JSON.stringify(response.data))
    return { response: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
      return {
        response: {
          error: error.response?.data.message ? error.response?.data.message : GENERIC_ERROR_MESSAGE,
          errorStatus: error.response?.status,
        },
      }
    } else {
      console.error(error)
      return {
        response: {
          error: GENERIC_ERROR_MESSAGE,
        },
      }
    }
  }
}
