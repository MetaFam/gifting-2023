import { sessionOpts } from '@/config'
import { APIError, MeResponse } from '@/types'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IronSession } from 'iron-session'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MeResponse | APIError>
) => {
  const reqSesh = req.session as IronSession & MeResponse

  if(!reqSesh.siwe) {
    res.status(401).json({ message: 'You have to login.' })
    return
  }
  
  if(reqSesh.expirationTime) {
    const exp = new Date(reqSesh.expirationTime)

    if(new Date() > exp) {
      res.status(401).json({
        message: `Your session expired ${exp.toISOString()}.`
      })
      return
    }
  }

  res.status(200).json({
    address: reqSesh.siwe.address,
    ens: reqSesh.ens ?? undefined,
    username: reqSesh.username ?? undefined,
    avatar: reqSesh.avatar,
  })
}

export default withIronSessionApiRoute(handler, sessionOpts)