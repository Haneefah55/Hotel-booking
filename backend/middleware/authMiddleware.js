import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'


export const protectRoute = async(req, res, next) =>{
  
  try {
    
    const accessToken = req.cookies.accessToken

    if(!accessToken){
      return res.status(401).json({ message: "Unauthorized" })
    }
     
    const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    if(user.tokenVersion !== decoded.tokenVersion) {
    
    return res.status(401).json({ message: "Invalid token version" })
    }

    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.username,
      lastLogin: user.lastLogin,
      image: user.image,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      role: user.role,
    }
    
    
    req.user = userInfo
    next()
     
  } catch (error) {
    console.error("Error in protect route contoller", error.message);
    res.status(401).json({ 
      success: false,
      message: error.message
    })
  }
  
}

export const adminRoute = async(req, res, next) =>{
  
  if(req.user && req.user.role === "admin"){
    
    next()
  } else{
    return res.status(401).json({ message: "Unauthorized user: Admin route" })
  }
  
}