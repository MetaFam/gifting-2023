import { CID } from 'multiformats/cid'
import { ipfsLinkPattern } from '@/config'
import { Maybe } from '@/types'

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
