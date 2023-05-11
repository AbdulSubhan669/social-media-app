const express = require('express')
const router = express.Router()
const { createPost,getAllPosts,updatePost,deletePost,getPostById } = require('../controllers/postController')

router.post('/posts',createPost)
router.get('/posts',getAllPosts)
router.delete('/posts/id:',deletePost)
router.put('/posts/id:',updatePost)
router.get('/posts/id:',getPostById)

module.exports = router                                      