import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { useState } from 'react';

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

const ADD_USER = gql`
  mutation addUser ($name: String) {
    addUser (name: $name) {
      id
      name
      age
    }
}
`

export default function Users() {
  const [addUser, { data, loading, error }] = useMutation(
    ADD_USER,
    {
      update(cache, { data: { addUser } }) {
        const data = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { users: [...data.users, addUser] }
        });
      }
    }
  )

  const [inputName, setInputName] = useState('')

  const handleInputChange = e => {
    setInputName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    addUser({
      variables: {
        name: inputName
      },
      // refetchQueries: [{ query: GET_USERS }],
    })
    setInputName('')
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
          value={inputName}
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}