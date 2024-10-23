'use server'
import { GENERIC_ERROR_MESSAGE } from '@/constants/errorConstants'
import axios from 'axios'

export async function postToScorecardForValidation(prevState: object | undefined, formData: FormData) {
  const scorecardApiUrl = process.env.SCORECARD_VALIDATION_URL
  const uploadFile = formData.get('ccdaFile')
  console.log('uploaded File for Scorecard', uploadFile)
  console.log('Submitted data for Scorecard: ', formData)
  const config = {
    method: 'post',
    url: scorecardApiUrl,
    data: formData,
  }

  try {
    const response = await axios.request(config)
    console.log('Scorecard Response JSON: ', JSON.stringify(response.data))
    console.log('Scorecard API response status', response.status)
    return { response: response.data }
  } catch (error) {
    console.error('Error in postToScorecardForValidation:', error)
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return { error: 'The request timed out. Please check your internet connection and try again.' }
      }
      if (!error.response) {
        return { error: 'The API cannot be reached at this time. Please try again later.' }
      }
      return {
        error: error.response.data?.error || GENERIC_ERROR_MESSAGE,
        errorStatus: error.response.status,
      }
    }
    return { error: GENERIC_ERROR_MESSAGE }
  }
}
