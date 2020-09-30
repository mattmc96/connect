require('dotenv').config()
const chalk = require('chalk')
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport')
// const authCtrl = require('../controllers/authController')

const app = express()
// const successStyle = chalk.bgOrange.bold.magenta

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// MiddleWare
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(cors())
app.use(require('body-parser').urlencoded({ extended: true }))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('=> DB CONNECTED')
  app.listen(SERVER_PORT, () =>
    console.log(`=> SERVER CONNECTED ON PORT: ${SERVER_PORT}`)
  )
})
