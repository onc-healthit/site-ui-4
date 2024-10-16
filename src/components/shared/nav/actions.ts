'use server'
const ETT_API_URL = process.env.ETT_API_URL

export async function registerAccount({ username, password }: { username: string; password: string }) {
  const ettAPIUrl = `${ETT_API_URL}/login/register`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        username: username,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}

export async function forgotPassword(username: string) {
  const ettAPIUrl = `${ETT_API_URL}/passwordManager/forgot`
  try {
    const response = await fetch(ettAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(`Error: ${data}`)
    }
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return JSON.stringify({
        status: 500,
        success: false,
        error: error.message || 'An error occurred',
      })
    }
  }
}
