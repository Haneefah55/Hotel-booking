
import mongoose from 'mongoose'
import Admin from './model/adminModel.js'
import bcrypt from 'bcryptjs'
import { connectDb } from './db/connectDb.js'



const createAdmin = async() =>{
  
  try {
    
    const pass = "admin9090"
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)
    
    connectDb()
    
    
    await Admin.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    })
    
    console.log("admin created successfully")
      

  } catch (error) {
    console.log("error creating admin", error.message)
  }
  await mongoose.disconnect()
    
  
    
}

createAdmin()