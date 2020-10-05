const http = require('http')
const express = require('express')

const router = require('./index')

const app = express()

const server = http.createServer(app)


app.use(router)
app.use(cors())
