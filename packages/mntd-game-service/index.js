'use strict'

const db = require('./db')

const { GameService } = require('@mntd/proto-loader')

const getAllGames = () => {
  const selectAllGames = 'select * from public.game order by name'
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await db.query(selectAllGames)
      resolve(rows)
    } catch (error) {
     reject(error) 
    }
  })
}

const addGame = (game) => {
  const text = 'insert into public.game ( name, description ) values ($1, $2) RETURNING *'
  const values = [game?.name, game?.description]
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await db.query({text, values})
      resolve(rows)
    } catch (error) {
     reject(error) 
    }
  })
}

async function createGame (call, callback) {
  const game = call.request
  try {
    const row = await addGame(game)
    callback(null, { row, status: true })
  } catch (error) {
    callback(error, {})
  }
}

async function listGames (call, callback) {
  try {
    const games = await getAllGames()
    //console.log(games)
    callback(null, { games })
  } catch (error) {
    callback(error, {})
  }
}

async function joinGame (call, callback) {

}

module.exports = {
  GameService,
  createGame,
  listGames,
  joinGame
}
