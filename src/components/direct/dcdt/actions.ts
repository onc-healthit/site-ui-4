'use server'
import axios from 'axios'
export async function handleSubmitHosting(prevState: object | undefined, formData: FormData) {
  const hostingApi = process.env.DCDT_HOSTING_API
  const body = JSON.stringify({
    '@type': 'hostingTestcaseSubmission',
    directAddr: formData.get('directAddr'),
    testcase: formData.get('testcase'),
    year: '2015',
    hostingcase: 'YES',
  })
  const config = {
    method: 'post',
    url: hostingApi,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  }

  try {
    const response = await axios.request(config)
    // console.log(JSON.stringify(response.data))
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

export async function handleSubmitDiscover(prevState: object | undefined, formData: FormData) {
  const hostingApi = process.env.DCDT_HOSTING_API
  const body = JSON.stringify({
    '@type': 'discoveryTestcaseMailMapping',
    directAddr: formData.get('step2DirectAddress'),
    resultsAddr: formData.get('resultsAddr'),
    year: '2015',
    hostingcase: 'NO',
  })
  const config = {
    method: 'post',
    url: hostingApi,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  }

  try {
    const response = await axios.request(config)
    // console.log(JSON.stringify(response.data))

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
