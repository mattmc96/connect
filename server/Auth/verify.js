
const postgres = require('pg')


const { CONNECTION_STRING } = process.env



 module.exports = {

     function verify(email, callback) {
         
         
         const postgres = require('pg')
         
         const conString = CONNECTION_STRING
         postgres.connect(conString, function (err, client, done) {
             if (err) return callback(err)
             
             const query =
             'UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = $1'
             client.query(query, [email], function (err, result) {
                 // NOTE: always call `done()` here to close
                 done()
                 
                 return callback(err, result && result.rowCount > 0)
                })
            })
        }

    }