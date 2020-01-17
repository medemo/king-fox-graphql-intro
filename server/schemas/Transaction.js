const { gql } = require('apollo-server');

exports.transactionTypeDefs = gql`
  extend type Query {
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    user: User!
    product: [Product]
  }
`

exports.transactionResolvers = {
  Query: {
    transactions: () => {
      // fetch ke microservice transaction
      return [
        {
          id: '2343',
          user: 'user1'
        }
      ]
    },

  },

  Transaction: {
    user: (parent) => {
      // fetch data user ke microservice user dengan id dari parent
      return { id: parent.user, name: 'First User' }
    }
  },
}