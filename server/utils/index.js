require('dotenv').config()
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('../controllers/usersController')
// const authCtrl = require('../controllers/authController')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// MiddleWare
const router = require('./router')
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(cors())
app.use(router)
app.use(require('body-parser').urlencoded({ extended: true }))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })
    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
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
