'use server'
import axios from 'axios'
import { authOptions } from '@/lib/auth'
import _ from 'lodash'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export interface Profile {
  hostname?: string
  email?: string
  username?: string
  password?: string
  istls?: boolean
}
// export async function fetchUserProfiles() {
//   const apiUrl = process.env.XDR_TEST_BY_CRITERIA_ENDPOINT + data.id + '/run'
//   const session = await getServerSession(authOptions)
//   const jsessionid = session?.user?.jsessionid ?? ''

//   const config = {
//     method: 'post',
//     url: apiUrl,
//     headers: session
//       ? { 'Content-Type': 'application/json', Cookie: `JSESSIONID=${jsessionid}` }
//       : { 'Content-Type': 'application/json' },
//     data: JSON.stringify(formattedData),
//   }

//   console.log('Sending data:', config)

//   try {
//     const response = await axios(config)
//     console.log('Raw content 1205:', response.data)
//     const content = response.data

//     let testRequest = ''
//     let testResponse = ''

//     if (content && content.content && content.content.value) {
//       testRequest = content.content.value.request || content.message
//       testResponse = content.content.value.response || content.message
//     } else {
//       console.error('Invalid response structure:', content)
//       testRequest = content.message
//       testResponse = content.message
//     }

//     return {
//       criteriaMet: content.status,
//       testRequest: testRequest,
//       testResponse: testResponse,
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.error('API Error Response:', error.response.data)
//       console.error('Status:', error.response.status)
//       console.error('Headers:', error.response.headers)
//     } else {
//       console.error('Error')
//     }
//     throw error
//   }
// }

export async function saveProfile(data: Profile) {
  console.log(`'Saving profile:', ${JSON.stringify(data)}`)
}
