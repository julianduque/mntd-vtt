'use strict'

const pino = require('pino')
const { grpc } = require('@mntd/proto-loader')
const { GameService, createGame, listGames, joinGame } = require('@mntd/game-service')
const port = process.env.GRPC_PORT ?? 5000

const logger = pino({
  prettyPrint: require('pino-pretty')
})

const server = new grpc.Server()
server.addService(GameService.service, {
  createGame,
  listGames,
  joinGame
})

server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      logger.error(err)
      process.exit(1)
    }
    server.start()
    logger.info(`gRPC Server running on port ${port}`)
  })
