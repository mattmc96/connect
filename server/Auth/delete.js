const postgres = require('pg')

const { CONNECTION_STRING } = process.env

module.exports = {
    function remove(id, callback) {
    const conString = CONNECTION_STRING
    postgres.connect(conString, function (err, client, done) {
      if (err) return callback(err)

      const query = 'DELETE FROM users WHERE id = $1'
      client.query(query, [id], function (err) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done()

        return callback(err)
      })
    })
  },
}
