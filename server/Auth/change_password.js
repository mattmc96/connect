const postgres = require('pg')

const bcrypt = require('bcryptjs')

const { CONNECTION_STRING } = process.env

module.exports = {

    function changePassword(email, newPassword, callback) {
        const conString = CONNECTION_STRING
        postgres.connect(conString, function (err, client, done) {
            if (err) return callback(err)
            
            bcrypt.hash(newPassword, 10, function (err, hash) {
                if (err) return callback(err)
                
                const query = 'UPDATE users SET password = $1 WHERE email = $2'
                client.query(query, [hash, email], function (err, result) {
                    done()
                    
                    return callback(err, result && result.rowCount > 0)
                })
            })
        })
    }
    
}