const pg = require("pg");

const postgres = {
  database: process.env.PG_DB ?? "mntd",
  host: process.env.PG_HOST ?? "localhost",
  port: process.env.PG_PORT ?? "5432",
  user: process.env.PG_USER ?? "postgres",
  password: process.env.PG_PASS ?? "postgres",
};

module.exports = {
  query: (strSQL) => {
    return new Promise((resolve, reject) => {
      const client = new pg.Client(postgres);
      client.connect((err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          client.query(strSQL, (err, result) => {
            if (err) {
              reject(err);
            } else {
              let res = { rows: [] };
              switch (result.command) {
                case 'CREATE':
                  resolve(result.command)
                case 'SELECT':
                  resolve(result.rows);
                  break;
                case 'INSERT':
                  if (result.rowCount > 0) {
                    res.rows = result.rows;
                  }
                  resolve(res);
                  break;
                case 'UPDATE':
                  if (result.rowCount > 0) {
                    res.rows = result.rows;
                  }
                  resolve(res);
                  break;
                case 'DELETE':
                  if (result.rowCount > 0) {
                    res.rows = result.rows;
                  }
                  resolve(res);
                  break;
                default:
                  resolve(result);
                  break;
              }
              client.end();
            }
          });
        }
      });
    });
  },
};
