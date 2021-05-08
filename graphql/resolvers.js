'use strict'

const client = require('@mntd/game-client')

const resolvers = {
  Query: {
    listGames (_, args) {
      return new Promise((resolve, reject) => {
        client.listGames(null, (err, result) => {
          if (err) return reject(err)

          resolve(result?.games)
        })
      })
    }
  }
}

module.exports = resolvers
