'use strict'

const { v4: uuidv4 } = require('uuid')
const { join } = require('path')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')

//const Logger = use('Logger')
const Route = require('Route')
const { graphqlHandler } = require('./graphql.js')
//const authDirective = require('../app/Directives/authDirective')
const resolvers = require('App/Resolvers/index')

const pkg = require('../package.json')

//const { getS3Url } = require('../app/Helpers')

Route.get('/ok', () => ({
  ok: 'ok',
  env: process.env.NODE_ENV,
  version: pkg.version,
}))

//const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective()

const typeDefs = loadFilesSync(join(__dirname, '..', 'app', 'Schemas'))

let schema = makeExecutableSchema({
  typeDefs: [...typeDefs, 'scalar Upload' /*authDirectiveTypeDefs*/],
  resolvers: {
    ...resolvers,
    Upload: require('graphql-upload-minimal').GraphQLUpload,
  },
})

schema = authDirectiveTransformer(schema)

Route.post('/graphql', async ({ request, response }) => {
  const start = Date.now()
  const body = request.post()
  const id = uuidv4()

  //   Logger.info('Received graphql request', {
  //     correlationId: id,
  //     operationName: body.operationName,
  //     body,
  //   })

  await graphqlHandler({
    schema,
    request,
    response,
    correlationId: id,
  })

  //   Logger.info('Finished request graphql', {
  //     correlationId: id,
  //     operationName: body.operationName,
  //     requestTime: Date.now() - start,
  //   })

  return
})

// Route.get('/download/:filename', ({ response, params }) => {
//   response.redirect(getS3Url(params.filename))
// })

// Route.post(process.env.PAGARME_POSTBACK_URL, 'PagarmePostbackController.index')

// Route.post('/redacaoonline-postback', 'ReadacaoOnlinePostbackController.index')
