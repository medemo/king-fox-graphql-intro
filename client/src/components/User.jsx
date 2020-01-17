import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { useState } from 'react';

const GET_USER_BY_ID = gql`
  query getUserById ($id: ID) {
    user(id: $id) {
      id
      name
      age
    }
  }
`

export default function Users() {
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER_BY_ID)
  const [inputId, setInputId] = useState('')

  const handleInputChange = e => {
    setInputId(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    getUser({
      variables: {
        id: inputId
      }
    })
    setInputId('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            padding: '1rem',
            width: '20rem'
          }}
          type="text"
          value={inputId}
          onChange={handleInputChange}
          />
      </form>

      <p>User:</p>

      {
        loading
          ? <p>Loading..</p>
          : error
            ? <p>error!!!</p>
            : data && data.user
              ? <p>{data.user.name}</p>
              : <p>No Data</p>
      }
    </div>
  )
}