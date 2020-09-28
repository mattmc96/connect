require('dotenv').config()
const chalk = require('chalk')
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const authCtrl = require('../controllers/authController')

const app = express()
const successStyle = chalk.bgBlue.bold.yellow

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
passport.use(
  new GitHubStrategy(
    {
      clientID: '3f3cc46712d1647401a0',
      clientSecret: '969277c5eac2c49af52dba9eba2c400ea41b8e0f',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, user, cb) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return cb(null, user)
      })
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

const isAuthenticated = async (req, res, next) => {
  if ((req, isAuthenticated())) {
    return next()
  }
  res.redirect('/login')
}

app.get('/account', isAuthenticated, (req, res) => {
  res.render('Success', req.session.user)
})

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/github', passport.authenticate('github'))

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/account',
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/login')
  }
)

app.delete('/auth/logout', authCtrl.logout)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log(successStyle('=> DB CONNECTED'))
  app.listen(SERVER_PORT, () =>
    console.log(successStyle(`=> SERVER CONNECTED ON PORT: ${SERVER_PORT}`))
  )
})
