const db = require('../db')




// creating post
const createPost = async (req,res)=>{
  try{
  const { user_id,content,image} = req.body;
  const values = [user_id,content,image]
  const result = await db.query('INSERT INTO posts (user_id,content,image_url) VALUES($1,$2,$3) RETURNING *',values)
  res.status(201).json(result.rows[0])
}
catch(error){
  console.log(error)
  res.status(500).send('server error')
}
}
// get all posts

const getAllPosts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC')
    const posts = result.rows.map(post => {
      const { id, user_id, content, image_url, created_at } = post
      return {
        id,
        user_id,
        content,
        image_url: image_url.toString(),
        created_at
      }
    })
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).send('server error')
  }
}

//get post by id

const getPostById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id])
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
}
// update post

const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { user_id, content, image } = req.body
    const result = await db.query(
      'UPDATE posts SET user_id = $1, content = $2, image = $3 WHERE id = $4 RETURNING *',
      [user_id, content, image, id]
    )
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
}
const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id])
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  
}

