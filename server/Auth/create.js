const postgres = require('pg')

const bcrypt = require('bcryptjs')

const { CONNECTION_STRING } = process.env

module.exports = {
    function  create(user, callback) {
    const conString = CONNECTION_STRING
    postgres.connect(conString, function (err, client, done) {
      if (err) return callback(err)

      bcrypt.hash(user.password, 10, function (err, hashedPassword) {
        if (err) return callback(err)

        const query = 'INSERT INTO users(email, password) VALUES ($1, $2)'
        client.query(query, [user.email, hashedPassword], function (
          err,
          result
        ) {
          done()

          return callback(err)
        })
      })
    })
  },
}
