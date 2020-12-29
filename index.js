const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/vistaac", { useNewUrlParser: true, useUnifiedTopology: true })

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const Router = require('./app/routes')
app.use('/', Router)

server.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT);
})
