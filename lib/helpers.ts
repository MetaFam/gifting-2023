import { CID } from 'multiformats/cid'
import { ipfsLinkPattern } from '@/config'
import { Maybe } from '@/types'
import { EventHandler, SyntheticEvent } from 'react'

export const httpURL = (
  uri: Maybe<string>,
  { gwPattern = ipfsLinkPattern } = {}
) => {
  const [, origCID, path] =
    uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? []

  if (origCID) {
    const cid = CID.parse(origCID)
    const v0CID = cid.toV0().toString()
    const v1CID = cid.toV1().toString()
    return encodeURI(
      gwPattern
        .replace(/{cid}/g, origCID)
        .replace(/{v0cid}/g, v0CID)
        .replace(/{v1cid}/g, v1CID)
        .replace(/{path}/g, path ?? '')
    ).replace(/#/g, '%23')
  }

  return uri
}


// The goal is to be able to write:
//   onClick={noDefault(disconnect)}
export const noDefault = (
  <Evt extends SyntheticEvent>(func: EventHandler<Evt>) => (
    (evt: Evt) => {
      evt.preventDefault()
      func.call(null, evt)
    }
  )
)