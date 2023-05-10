const db = require('../database/db')


//function to create user
const createUser = async (req,res) =>{
  try{
    const {username,email,password} = req.body;
    const value = [username,email,password]
  
    const result = db.query('INSERT INTO users(name,email,password) VALUE($1,$2,$3) RETURNING id, name, password *',values)
   res.status(201).json(result.rows[0])
  }
  catch(error){
    console.log(error)
    res.status(500).send('server error')
  }
}
//function to get all users

const getUsers = async (req,res)=>{
  try{
    const result = await db.query('SELECT id,name,email FROM users')
    res.status(200).json(result.rows)

  }
  catch(error){
    console.log(error);
    res.status(500).send('no users available')
  }
}

//function to get a user by id

const getUser = async (req,res)=>{
  try{
    const {id} = req.params;
    const result = await db.query('SELECT id,name,email FROM users WHERE id=$1',[id])
    res.status(200).json(result.rows)

  }
  catch(error){
    console.log(error)
    res.status(500).send('user not available')
  }
}