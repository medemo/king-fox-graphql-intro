const { gql, ApolloError } = require('apollo-server');
const uuid = require('uuid/v1')
const axios = require('axios')


exports.userTypeDefs = gql`
  extend type Query {
    users: [User]
    user (id: ID): User
  }
  extend type Mutation {
    addUser (name: String): User
  }
  type User {
    id: ID!
    name: String!
    age: Int
  }
`

exports.userResolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (!context.user) throw new ApolloError('You must login first')
      
      const { data } = await axios.get('http://localhost:3000/users')
      return data
    },
    user: async (parent, args, context, info) => {
      const { id } = args
      const { data } = await axios.get(`http://localhost:3000/users/${id}`)
      return data
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      // post ke microservice
      const { data } = await axios.post('http://localhost:3000/users', {
        name: args.name
      })
      return data
    }
  },
  User: {
    age: (parent) => {
      return parent.age || 20
    }
  }
}