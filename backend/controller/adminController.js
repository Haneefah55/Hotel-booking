import bcrypt from 'bcryptjs'

import Admin from "../model/adminModel.js"
import { generateTokenAndSetCookieUser }  from '../utils/generateToken.js'


export const loginAdmin = async (req, res) =>{
  try{
    const { username, password } = req.body
    if(!username && !password){
      return res.status(400).json({success: false, message: "All fields are required"})
    }
    const admin = await Admin.findOne({ username })
    if(!admin){
      return res.status(400).json({success: false, message: "Incorrect username or password"})
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect username or password"})
    }
    
    
    generateTokenAndSetCookieUser(res, admin._id)
    
  
    
    
    res.status(200).json({
      adminId: admin._id,
      username: admin.username,
    
    })
    
    console.log("admin login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in admin", error.message)
  }
}

