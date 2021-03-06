const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/create', userController.createUser)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify', userController.verify)
userRoutes.get('/usercheck', userController.userCheck)

module.exports = userRoutes; 