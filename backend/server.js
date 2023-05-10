const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})