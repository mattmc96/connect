require('dotenv').config()
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')
const path = require('path')
const postController = require('../controllers/postController')
const socketio = require('socket.io')

const router = express.Router()

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('../controllers/usersController')

// const authCtrl = require('../controllers/authController')

const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// MiddleWare
app.use(express.json())
app.use(cors())
app.use(require('body-parser').urlencoded({ extended: true }))

app.use(express.static(__dirname + '/../../build'))

app.get('/api/posts', postController.getPosts)
// app.post('/api/posts', postController.addPost)
app.put('/api/posts/:post_id', postController.editPost)
app.delete('/api/posts/:post_id', postController.deletePost)

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
})
const server = app.listen(SERVER_PORT, () =>
  console.log(`=> SERVER CONNECTED ON PORT: ${SERVER_PORT}`)
)

const io = socketio(server)

io.on('connection', (socket) => {
  console.log('connected')
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

  // socket.on('sendMessage', (message, callback) => {
  //   const user = getUser(socket.id)

  //   io.to(user.room).emit('message', { user: user.name, text: message })

  //   callback()
  // })

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
