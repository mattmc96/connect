const postgres = require('pg')

const { CONNECTION_STRING } = process.env

module.exports = {
  function oginByEmail(email, callback) {
    const conString = CONNECTION_STRING
    postgres.connect(conString, function (err, client, done) {
      if (err) return callback(err)

      const query = 'SELECT id, nickname, email FROM users WHERE email = $1'
      client.query(query, [email], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done()

        if (err || result.rows.length === 0) return callback(err)

        const user = result.rows[0]

        return callback(null, {
          user_id: user.id,
          nickname: user.nickname,
          email: user.email,
        })
      })
    })
  },
}
