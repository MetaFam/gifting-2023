export const sessionOpts = (() => {
  const {
    NODE_ENV,
    SESSION_PASSWORD,
    NEXT_PUBLIC_SESSION_COOKIE_NAME
  } = process.env

  return {
    cookieName: NEXT_PUBLIC_SESSION_COOKIE_NAME ?? 'mimis-default',
    password: SESSION_PASSWORD ?? 'This is a password.',
    cookieOptions: {
      secure: NODE_ENV === 'production'
    }
  }
})()

export const ipfsLinkPattern =
  process.env.NEXT_PUBLIC_IPFS_LINK_PATTERN ??
  'https://w3s.link/ipfs/{cid}/{path}' ??
  'https://{v1cid}.ipfs.dweb.link/{path}' ??
  'https://ipfs.io/ipfs/{cid}/{path}'
export const ipfsLimitingDelay =
  process.env.NEXT_PUBLIC_IPFS_LIMITING_DELAY ?? (60 * 1000) / 75 // 75 per minute (< 100 / min which fails intermittently)
export const gwPatternKey = 'Mïmis-Gateway-Pattern'
export const limitingDelayKey = 'Mïmis-Gateway-Limiting-Delay'

export const ipfsAPIURL =
  process.env.NEXT_PUBLIC_IPFS_API_URL ?? 'http://localhost:5001/api/v0'
