const express = require('express')
const postController = require('../controllers/postController')
const postRoutes = express.Router()

postRoutes.post('/create', postController.create)
postRoutes.get('/all', postController.getAll)
postRoutes.get('/alluser', postController.getUserPosts)
postRoutes.get('/single/:id', postController.getOnePost)
postRoutes.delete('/:id', postController.delete)
postRoutes.put('/:id', postController.update)
postRoutes.post('/:id/comment', postController.commentCreate)
postRoutes.delete('/comment/:commentid', postController.commentDelete)



module.exports= postRoutes