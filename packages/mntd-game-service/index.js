'use strict'

const { GameService } = require('@mntd/proto-loader')

const games = []

function createGame (call, callback) {
  const game = call.request
  games.push(game)
  callback(null, { game, status: true })
}

function listGames (call, callback) {
  callback(null, { games })
}

function joinGame (call, callback) {

}

module.exports = {
  GameService,
  createGame,
  listGames,
  joinGame
}
