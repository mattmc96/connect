const postgres = require('pg')

const bcrypt = require('bcryptjs')

const { CONNECTION_STRING } = process.env

module.exports = {
 function login(email, password, callback) {
    const conString = CONNECTION_STRING
    postgres.connect(conString, function (err, client, done) {
      if (err) return callback(err)

      const query =
        'SELECT id, nickname, email, password FROM users WHERE email = $1'
      client.query(query, [email], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done()

        if (err || result.rows.length === 0)
          return callback(err || new WrongUsernameOrPasswordError(email))

        const user = result.rows[0]

        bcrypt.compare(password, user.password, function (err, isValid) {
          if (err || !isValid)
            return callback(err || new WrongUsernameOrPasswordError(email))

          return callback(null, {
            user_id: user.id,
            nickname: user.nickname,
            email: user.email,
          })
        })
      })
    })
  },
}
