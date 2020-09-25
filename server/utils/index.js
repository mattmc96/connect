require('dotenv').config()
const express = require('express')
const massive = require('massive')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')

const passport = require('./passport-setup')

const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
)

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}
// Auth0 endpoints
app.get('/', (req, res) => res.send('You are not logged in!'))

app.get('/failed', (req, res) => res.send('You failed'))
app.get('/success', isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user.email}!`)
)

app.get('/login', function (req, res) {
  res.render('login', { user: req.user })
})

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
)
app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['profile', 'email'] })
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home
    res.redirect('/')
  }
)

app.get('/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/')
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
