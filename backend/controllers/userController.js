const db = require('../db')


//function to create user
const createUser = async (req,res) =>{
  try{
    const {username,email,password} = req.body;
    const value = [username,email,password]
  
    const result = db.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id, name, password *',value)
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

//function to update user

const updateUser = async (req,res)=>{
  try{
    const {id} = req.params;
    const {name,email,password} = req.body;
    const values = [name,email,password,id]
    const result = await db.query('UPDATE users SET name=$1,email=$2,password=$3 WHERE id=$4 RETURNING id,name,email,password ',values)
    res.status(200).json(result.rows[0])
  }
  catch(error){
    console.log(error);
    res.status(500).send(`can't update`)
  }
}

//function to delete user

const deleteUser = async (req,res)=>{
  const {id} = req.params;
  try{
    const result = await db.query('DELETE FROM users WHERE id=$1 RETURNING *',[id])
    if(result.rows.length === 0){
      res.status(404).send('user not found')

    }
    else{
      res.status(200).json(result.rows[0])
    }
   
     

  }
  catch(error){
    console.log(error);
    res.status(500).send(`can't delete`)
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers
}