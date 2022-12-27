import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        const msg = (
          credentials?.message
          ?? (() => { throw new Error('Missing `message` in body') })()
        )
        const siwe = new SiweMessage(JSON.parse(msg))
        const nextAuthURL = new URL(
          process.env.NEXTAUTH_URL
          ?? (() => { throw new Error('`$NEXTAUTH_URL` is not defined') })()
        )

        const result = await siwe.verify({
          signature: credentials?.signature || "",
          domain: nextAuthURL.host,
          nonce: await getCsrfToken({ req }),
          time: new Date().toISOString(),
        })

        return { id: siwe.address }
      },
    }),
  ]

  // const isDefaultSigninPage = (
  //   req.method === 'GET' && req.query.nextauth.includes('signin')
  // )

  // Hide Sign-In with Ethereum from default sign page
  // if(isDefaultSigninPage) {
  //   providers.pop()
  // }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: (
      process.env.NEXTAUTH_SECRET
      ?? (() => { throw new Error('`$NEXTAUTH_SECRET` is not defined') })()
    ),
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub
        session.user.name = token.sub
        session.user.image = 'https://www.fillmurray.com/128/128'
        return session
      },
    },
  })
}