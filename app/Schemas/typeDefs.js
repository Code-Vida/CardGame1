const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    hello: String
  }
`

module.exports = { typeDefs }
