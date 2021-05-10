const pg = require('pg')

const postgres = {
  database: process.env.PG_DB ?? 'mntd',
  host: process.env.PG_HOST ?? 'localhost',
  port: process.env.PG_PORT ?? '5432',
  user: process.env.PG_USER ?? 'postgres',
  password: process.env.PG_PASS ?? 'postgres'
}

module.exports = {
  query: strSQL => {
    return new Promise((resolve, reject) => {
      const client = new pg.Client(postgres)
      client.connect(err => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          client.query(strSQL, (err, result) => {
            if (err) {
              reject(err)
            } else {
              switch (result.command) {
                case 'SELECT':
                  resolve(result.rows)
                  break
                // Despues trataremos el INSERT, UPDATE, DELETE y demas.
                default:
                  resolve(result)
                  break
              }
              client.end()
            }
          })
        }
      })
    })
  },
}