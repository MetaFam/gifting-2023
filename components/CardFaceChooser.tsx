import React, { useEffect, useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client'
import { graphQLURL, hasuraAdminKey } from '@/config'
import { httpURL, noDefault } from '@/helpers'
import { Maybe } from '@/types'
import style from '../styles/CardFaceChooser.module.css'
import homeStyle from '../styles/Home.module.css'

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

export const FaceGroup = (
  { user }: { user: User }
) => (
  <optgroup key={user.name} label={`By @${user.name}`}>
    {user.faces.map((face) => (
      <option
        key={face.id}
        data-url={face.url}
        data-id={face.id}
        data-title={face.title}
      >
        {face.title}
      </option>
    ))}
  </optgroup>
)

export const CardFaceChooser: React.FC = () => {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState<Selected>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const q = async () => {
      const response = await client.query({ query: facesQuery })
      setUsers(response.data.users)
    }
    q()
  }, [])

  const changed = (
    { target }: { target: HTMLSelectElement }
  ) => {
    const {
      value, selectedOptions: [{ dataset }],
    } = target
    const { id, title = null, url } = dataset
    console.info({ id, title, url, dataset })
    setSelected({ id, title, url })
  }

  return (
    <>
      <fieldset
        className={[
          style.file,
          style[`${uploading ? 'in' : ''}active`],
        ].join(' ')}
      >
        <label onClick={() => setUploading(false)}>
          <h3>Existing:</h3>
          <select
            id="front"
            onChange={changed}
            disabled={uploading}
          >
            <option>No Selection</option>
            {users.map((user: User) => (
              user.faces.length > 0 ? (
                <FaceGroup key={user.name} {...{ user }}/>
              ) : (
                null
              )
            ))}
          </select>
        </label>
        <span>or</span>
        <label>
          <button
            className={
              [
                homeStyle.button,
                homeStyle[`${uploading ? '' : 'in'}active`],
              ].join(' ')
            }
            onClick={noDefault(() => setUploading((up) => !up))}
          >
            Upload
          </button>
          <input type="file" id="front" accept="image/*" />
        </label>
      </fieldset>
      {selected.url != null && (
        <img
          src={httpURL(selected.url) ?? ''}
          alt={selected.title ?? '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙'}
          className={style.card}
        />
      )}
    </>
  )
}
