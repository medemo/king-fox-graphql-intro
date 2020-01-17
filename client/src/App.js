import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './config/graphql'
import Users from './components/Users'
import User from './components/User'
import AddUser from './components/AddUser'

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <p>Add a new user</p>
        <AddUser />
        <Users />
        <p>Get User By Id</p>
        <User />
      </div>
    </ApolloProvider>
  );
}

export default App;
