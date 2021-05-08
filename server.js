'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  logger: {
    prettyPrint: require('pino-pretty')
  }
})
const mercurius = require('mercurius')
const resolvers = require('./graphql/resolvers')

const schema = fs.readFileSync(path.join(__dirname, 'graphql', 'schema.gql'), 'utf8')

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: 'playground',
  playgroundHeaders (window) {
    return {
      authorization: `bearer ${window.sessionStorage.getItem('token')}`
    }
  }
})

fastify.listen(3000)
