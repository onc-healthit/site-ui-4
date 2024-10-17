'use server'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
import axios from 'axios'
import _ from 'lodash'

export async function handleXDMUpload(prevState: object | undefined, formData: FormData) {
  const Api = process.env.XDM_VALIDATOR_API
  const uploadFile = formData.get('zip')
  // console.log('uploaded File', uploadFile)
  if (_.isEmpty(uploadFile)) {
    return {
      response: {
        error: 'Please upload a file',
        errorStatus: 400,
      },
    }
  } else {
    const body = JSON.stringify({
      zip: uploadFile,
    })
    const config = {
      method: 'post',
      url: Api,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('Submitted data XDM Validator ', config)
    try {
      const response = await axios.request(config)
      console.log('XDM Validator response status', response.status)
      //console.log('XDM Validator response status', response.data)
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
}
