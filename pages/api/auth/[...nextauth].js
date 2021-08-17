import axios from 'axios'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'WiroForce',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const login = await axios.post(
          `${process.env.API_INTERNAL_URL}/auth/login`,
          {
            password: credentials.password,
            email: credentials.email,
          }
        )
        if (login.status === 201 && login.data.user) {
          login.data.user['token'] = login.data.token
          return login.data.user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/wiroforce/login',
  },
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    session: (session, user) => {
      session.user = user.user
      return session
    },
    jwt: (token, user) => {
      user && (token.user = user)
      return token
    },
  },
  events: {},
  debug: false,
})
