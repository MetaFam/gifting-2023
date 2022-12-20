import { sessionOpts } from '@/config'
import { generateNonce } from 'siwe'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IronSession } from 'iron-session'
import { APIError, NonceResponse } from '@/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<string | APIError>
) => {
  try {
    const reqSesh = req.session as IronSession & NonceResponse

    if (!process.env.SESSION_PASSWORD) {
      throw new Error('`$SESSION_PASSWORD` not configured.')
    }
    if (!reqSesh.nonce) {
      reqSesh.nonce = generateNonce()
      await reqSesh.save()
    }
    console.info({ non: reqSesh.nonce })
    res.status(200).send(reqSesh.nonce)
  } catch (err) {
    res.status(500).send({ message: (err as Error).message })
  }
}

export default withIronSessionApiRoute(handler, sessionOpts)
