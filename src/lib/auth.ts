import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'ETT Login',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const ettAuth = `${[process.env.ETT_AUTH_OK]}`

        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const formData = new URLSearchParams()
        formData.append('submit', 'Login')
        formData.append('username', `${credentials?.username}`)
        formData.append('password', `${credentials?.password}`)

        try {
          const res = await fetch(`${process.env.LOGIN_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'same-origin',
            body: formData.toString(),
          })

          if (res.ok) {
            const responseText = await res.text()
            if (responseText === ettAuth) {
              const responseHeader = res.headers.getSetCookie()[0]
              const jsessionid = responseHeader.substring(responseHeader.indexOf('=') + 1, responseHeader.indexOf(';'))

              return {
                id: jsessionid, //This is a bit of a hack, setting the user id to the jsessionid so we can use it in the jwt callback in order to call ETT API
                email: `${credentials?.username}`,
                name: `${credentials?.username}`,
              }
            }
            console.error(`ERROR ---> username or password is invalid`)
            return null
          }
        } catch (error) {
          console.error(`ERROR ---> ${error}`)
          return null
        }
        return null
      },
    }),
  ],
  session: {
    maxAge: 30 * 60, // 30 mins
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.jsessionid = token.jsessionid
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
        token.accessToken = account.access_token
        token.jsessionid = user.id
      }
      return token
    },
  },
}
