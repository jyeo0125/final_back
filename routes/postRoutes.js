const express = require('express')
const postController = require('../controllers/postController')
const postRoutes = express.Router()

postRoutes.post('/create', postController.create)
postRoutes.get('/all', postController.getAll)
postRoutes.get('/:id', postController.getOneUser)
postRoutes.get('/alluser', postController.getUserPosts)
postRoutes.delete('/:id', postController.delete)
postRoutes.put('/:id', postController.update)


module.exports= postRoutes