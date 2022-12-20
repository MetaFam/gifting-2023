import React, { useEffect, useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://metagifting.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY ?? '',
  },
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

export const CardFaceChooser: React.FC = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const q = async () => {
      const response = await client.query({ query: facesQuery })
      setUsers(response.data.users)
    }
    q()
  }, [])

  return (
    <fieldset className="file">
      <label>
        <h3>Existing:</h3>
        <select id="front">
          <option>No Selection</option>
          {users.map((user: User) => {
            if (user.faces.length > 0) {
              return (
                <optgroup key={user.id} label={`By @${user.name}`}>
                  {user.faces.map((face) => (
                    <option data-url={face.url} data-id={face.id}>
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
  )
}
