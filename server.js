const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const passport = require('passport')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { join } = require('path')
//const { googleLogin } = require('./app/Utils/passport')
const { googlePassportConfig } = require('./app/Utils/passport')
const { googleAuth } = require('./app/Utils/socialProvidersAuth')

googlePassportConfig()

async function startApolloServer() {
  try {
    const app = express()
    const typeDefs = loadFilesSync(join(__dirname, 'app', 'Schemas'))
    const resolvers = require('./app/Resolvers/index')
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

    app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:3000',
      }),
      googleAuth
    )

    app.get('/ping', (req, res) => {
      res.send('Oi Erikito!!')
    })
    await server.start()

    server.applyMiddleware({ app })
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready ataaaa http://localhost:4000${server.graphqlPath}`)
    )
  } catch (error) {
    console.log(error)
  }
}

startApolloServer()
