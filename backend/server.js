const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const users = require('./routes/users')
const posts = require('./routes/posts')

app.use(cors())

app.use(users)
app.use(posts)
app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})