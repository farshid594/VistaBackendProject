const express = require('express')
const Router = express.Router()
const Authorization = require('../../middlewares/Authorization')
const UserController = require('../../controllers/UserController')

Router.get('/', Authorization, UserController.GetUser)
Router.post('/login', UserController.Login)
Router.post('/signup', UserController.Register)
Router.post('/logout', Authorization, UserController.LogOut)
Router.post('/logoutAll', Authorization, UserController.LogOutAll)
Router.post('/upload', Authorization, UserController.Upload)

module.exports = Router
