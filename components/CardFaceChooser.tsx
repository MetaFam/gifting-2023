import React, { useEffect, useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client'
import Image from 'next/image'
import { graphQLURL, hasuraAdminKey } from '@/config'
import { httpURL } from '@/helpers'
import { Maybe } from '@/types'

const headers: Record<string, string> = {}
if(hasuraAdminKey) {
  headers['x-hasura-admin-secret'] = hasuraAdminKey
}

const client = new ApolloClient({
  uri: graphQLURL,
  cache: new InMemoryCache(),
  headers,
})

const facesQuery = gql`
  query Faces {
    users(order_by: { username: asc }) {
      name
      faces {
        title
        id
        url
      }
    }
  }
`

type Face = {
  id: string
  title: string
  url: string
}

type User = {
  id: string
  name: string
  username: string
  faces: Array<Face>
}

type Selected = {
  id?: string
  title?: Maybe<string>
  url?: string
}

export const CardFaceChooser: React.FC = () => {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState<Selected>({})

  useEffect(() => {
    const q = async () => {
      const response = await client.query({ query: facesQuery })
      setUsers(response.data.users)
    }
    q()
  }, [])

  const changed = (
    { target: { selectedOptions: opts } }:
    { target: { selectedOptions: HTMLCollection } }
  ) => {
    const [{ dataset }] = Array.from<HTMLOptionElement>(
      opts as Iterable<HTMLOptionElement>
    )

    const { id, title = null, url } = dataset
    console.info({ id, title, url, dataset })
    if (!url) throw new Error('Missing URL.')
    setSelected({ id, title, url })
  }

  return (
    <>
      <fieldset className="file">
        <label>
          <h3>Existing:</h3>
          <select id="front" onChange={changed}>
            <option>No Selection</option>
            {users.map((user: User, idx: number) => {
              if (user.faces.length > 0) {
                return (
                  <optgroup key={idx} label={`By @${user.name}`}>
                    {user.faces.map((face) => (
                      <option
                        key={face.id}
                        data-url={face.url}
                        data-id={face.id}
                      >
                        {face.title}
                      </option>
                    ))}
                  </optgroup>
                )
              }
              return null
            })}
          </select>
        </label>
        <span>or</span>
        <label>
          <h3 className="button">Upload</h3>
          <input type="file" id="front" accept="image/*" />
        </label>
      </fieldset>
      {selected.url != null && (
        <Image
          src={httpURL(selected.url) ?? ''}
          alt={selected.title ?? '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙'}
          width="856" height="540"
        />
      )}
    </>
  )
}
