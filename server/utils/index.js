require('dotenv').config()
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')

const router = express.Router()
// const authCtrl = require('../controllers/authController')

const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// MiddleWare
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
router.get('/join', (req, res) => {
  res.send({ response: 'Server is up and running.' }).status(200)
})

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
