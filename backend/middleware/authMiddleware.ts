import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'


interface JwtPayload {
  userId: string,
  tokenVersion: number
}


export const protectRoute = async(req:Request, res:Response, next:NextFunction) =>{
  
  try {
    
    const accessToken = req.cookies.accessToken

    if(!accessToken){
      return res.status(401).json({ message: "Unauthorized" })
    }
     
    const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET!) as JwtPayload
    const user = await User.findById(decoded.userId)
    if(user?.tokenVersion !== decoded.tokenVersion) {
    
    return res.status(401).json({ message: "Invalid token version" })
    }

    const userInfo = {
      id: user._id.toString(),
      email: user.email,
      name: user.username!,
      lastLogin: user.lastLogin,
      image: user.image!,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      role: user.role,
      new: user.isNewUser
    }
    
    
    req.user = userInfo!
    next()
     
  } catch (error: any) {
    console.error("Error in protect route contoller", error.message);
    res.status(401).json({ 
      success: false,
      message: error.message
    })
  }
  
}

export const adminRoute = async(req:Request, res:Response, next:NextFunction) =>{
  
  if(req.user && req.user.role === "admin"){
    
    next()
  } else{
    return res.status(401).json({ message: "Unauthorized user: Admin route" })
  }
  
}