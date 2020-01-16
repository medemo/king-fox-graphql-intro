const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const { productTypeDefs, productResolvers } = require('./schemas/Product')
const { userTypeDefs, userResolvers } = require('./schemas/User')
const { transactionTypeDefs, transactionResolvers } = require('./schemas/Transaction')


const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, productTypeDefs, userTypeDefs, transactionTypeDefs],
  resolvers: [productResolvers, userResolvers, transactionResolvers]
})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});