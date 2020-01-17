import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const GET_USERS = gql`
  query {
    users {
      id
      name
      age
    }
  }
`

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS)

  console.log(data?.users?.length)

  if (loading || !data)
    return <p>Loading...</p>

  if (error)
    return <p>error</p>

  return (
    <div>
      <h1>List of users</h1>
      <ul>
        {
          data.users.map(user => {
            return (
              <li key={user.id}>{user.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}