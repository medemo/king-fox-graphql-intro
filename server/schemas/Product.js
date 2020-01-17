const { gql } = require('apollo-server');

exports.productTypeDefs = gql`
  extend type Query {
    products: [Product]
  }
  
  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String
  }
`

exports.productResolvers = {
  Query: {
    products: () => {
      return [
        {
          id: 'aaaa',
          name: 'Asus Laptop',
          price: 7000000,
          description: '8 GB RAM, i5 Processor',
        }
      ]
    },
  },
  Product: {
    description: () => 'Ganti Description di resolver Product'
  },
}