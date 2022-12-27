export const cookieName = (
  process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME
  ?? 'mg-gifts-default'
)
export const sessionPassword = (
  process.env.SESSION_PASSWORD
  ?? 'This is a password which must be more than 32 characters.'
)
export const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
}

export const sessionOpts = {
  cookieName, password: sessionPassword, cookieOptions,
}

export const ipfsLinkPattern = (
  process.env.NEXT_PUBLIC_IPFS_LINK_PATTERN ??
  'https://w3s.link/ipfs/{cid}/{path}' ??
  'https://{v1cid}.ipfs.dweb.link/{path}' ??
  'https://ipfs.io/ipfs/{cid}/{path}'
)
export const ipfsLimitingDelay = (
  process.env.NEXT_PUBLIC_IPFS_LIMITING_DELAY
  ?? (60 * 1000) / 75 // 75 per minute (< 100 / min which fails intermittently)
)
export const gwPatternKey = 'Mïmis-Gateway-Pattern'
export const limitingDelayKey = 'Mïmis-Gateway-Limiting-Delay'

export const ipfsAPIURL = (
  process.env.NEXT_PUBLIC_IPFS_API_URL
  ?? 'http://localhost:5001/api/v0'
)
export const graphQLURL = (
  process.env.NEXT_PUBLIC_GRAPHQL_URL
  ?? (() => { throw new Error('Missing NEXT_PUBLIC_GRAPHQL_URL') })()
)

export const hasuraAdminKey = (
  process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY ?? null
)

export const loginMessage = (
  process.env.NEXT_PUBLIC_LOGIN_MESSAGE ?? '🎁 SIWE for MetaGame Gifts. 🎁'
)
