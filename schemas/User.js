const { gql } = require('apollo-server');
const uuid = require('uuid/v1')

const users = [
  {
    "id": "4afdc740-3831-11ea-8227-05cc6b95d096",
    "name": "Andreas",
    "age": 17
  },
  {
    "id": "6ebd8ad0-3831-11ea-8227-05cc6b95d096",
    "name": "Devita"
  }
]

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
    users: () => {
      return users
    },
    user: (parent, args, context, info) => {
      const { id } = args
      return {
        id: id,
        name: 'sdf'
      }
    }
  },
  Mutation: {
    addUser: (parent, args) => {
      // post ke microservice
      const newUser = {
        id: uuid(),
        name: args.name
      }
      users.push(newUser)
      return newUser
    }
  },
  User: {
    age: (parent) => {
      return parent.age || 20
    }
  }
}