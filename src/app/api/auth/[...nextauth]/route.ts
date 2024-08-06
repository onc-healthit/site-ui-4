import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { setCookie } from 'nookies'

const handler = NextAuth({
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

              setCookie({ res }, 'JSESSIONID', jsessionid)
              return {
                id: jsessionid, //This is a bit of a hack, setting the user id to the jsessionid so we can use it in the jwt callback in order to call ETT API
                email: `${credentials?.username}`,
                name: `${credentials?.username}`,
              }
            }
            console.error(`ERROR ---> username or password is invalid`)
            return false
          }
        } catch (error) {
          console.error(`ERROR ---> ${error}`)
          return false
        }
        return false
      },
      session: {
        maxAge: 30 * 60, // 30 mins
        jwt: true,
      },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      session.user.jsessionid = token.jsessionid
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
})

export { handler as GET, handler as POST }
