const models = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const postController ={}


// get all post

postController.getAll = async (req,res) => {
    try {
        let posts = await models.post.findAll()
        res.json({posts})
    } catch (error) {
        res.json({error})
    }
}

// get all user post

postController.getUserPosts = async (req,res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log(decryptedId.userId)
        let user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        let posts = await user.getPosts()
    
        res.json({
            posts
        })
    } catch (error) {
        res.json({error})
    }
}

//get one user post

postController.getOneUser = async (req,res) => {
    try {
        let post = await models.post.findOne({
            where : {
                id : req.params.id
            },
            include: [ {model: models.user}]
        })
        res.json({post})
    } catch (error) {
        res.json({error})
    }
}

// Post Create

postController.create = async (req,res) => {
    try {
        const post = await models.post.create({
            title: req.body.title,
            content: req.body.content
        })
    
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log(decryptedId)
        let user = await models.user.findOne({
            where: {
                id: encryptedId.userId
                
            }
        })
        console.log(user)
        let res = await user.addPost(post)
        
    
        let allPosts = await models.post.findAll()
    
        res.json({allPosts}) 
    } catch (error) {
        res.json({error})
    }

}

// Post deltet
postController.delete = async (req,res) => {
    try {
        let post = await models.post.findOne({
            where: {
                id: req.params.id
            }
        })
        let deletedPost = await post.destroy()
        res.json({deletedPost})
    } catch (error) {
        res.json({error, message:"delete complete"})
    }
}

// Post Update
postController.update = async (req,res) =>{
    try {
        const post = await models.post.findOne({
            where: {
                id: req.params.id
            }
        })
        await post.update({
            title: req.body.title,
            content: req.body.content
        })
        res.json({post, message:"updated complete!"})
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = postController



