
import User from "../model/userModel.js"
import Owner from "../model/ownerModel.js"
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const protectUserRoute = async (req, res, next) =>{
  
  
  try{
    
    const token = req.cookies.token
  
    if(!token) {
      return res.status(400).json({error: "Unathorized: No Token Provided"})
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if(!decoded){
      return res.status(400).json({error: "Unathorized: Invalid Token"})
      
    }
    const user = await User.findById(decoded.id).select("-password")
    
    if(!user){
      return res.status(404).json({error: "Access restricted!"})
    }
    
    
    req.user = user
    next()
    
  } catch (error){
    console.log("Error in protectedRoute middleware:", error.message)
    res.status(500).json({error: "Internal server error"})
  }
  
}

export const protectOwnerRoute = async (req, res, next) =>{
  
  
  try{
    
    const token = req.cookies.token
  
    if(!token) {
      return res.status(400).json({error: "Unathorized: No Token Provided"})
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if(!decoded){
      return res.status(400).json({error: "Unathorized: Invalid Token"})
      
    }
    const owner = await Owner.findById(decoded.id).select("-password")
    
    if(!owner){
      return res.status(404).json({error: "Access restricted!"})
    }
    
    
    req.owner = owner
    next()
    
  } catch (error){
    console.log("Error in protectOwnerRoutes middleware:", error.message)
    res.status(500).json({error: "Internal server error"})
  }
  
}