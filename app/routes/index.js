const express = require('express')
const Router = express.Router()

const UserRoutes = require('./user')
Router.use('/user', UserRoutes)

module.exports = Router
