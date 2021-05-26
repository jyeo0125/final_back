const models = require('../models')
const jwt = require('jsonwebtoken')
const { post } = require('../routes/postRoutes')
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



// Post Create

postController.create = async (req,res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log(decryptedId)
        let user = await models.user.findOne({
            where: {
                id: decryptedId.userId
                
            }
        })
        const post = await models.post.create({
            title: req.body.title,
            content: req.body.content
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
        res.json({error})
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
// get all post by user
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
        
    }
}
// Get one post include user info

postController.getOnePost = async (req,res) => {
    console.log(req.params.id)
    try {
        let post = await models.post.findOne({
            where: {
                id: req.params.id
            },
            include: [{model: models.user}, 
                {model: models.comment, 
                    include: models.user
                }
            ]
        })
        res.json({post})
    } catch (error) {
        res.json({error})
    }
}

// comment create
postController.commentCreate = async (req,res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        let user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        let post = await models.post.findOne({
            where:{
                id:req.params.id
            }
        })
        let comment = await models.comment.create({
            content: req.body.content
        })
        await comment.setUser(user)
        await comment.setPost(post)
        
        res.json({comment})
    } catch (error) {
        res.json({error})
    }
}

// Comment Delete

postController.commentDelete = async (req,res)=>{
    try {
        const comment = await models.comment.findOne({
            where: {
                id: req.params.commentid
            }
        })
        console.log(comment);
        let deleteCommnet = await comment.destroy()
        res.json(deleteCommnet)
    } catch (error) {
        res.status(400).json({error})
    }
}
module.exports = postController



