
import bcrypt from 'bcryptjs'
import cloudinary from "../utils/cloudinary.js"
import Admin from "../model/adminModel.js"
import User from "../model/userModel.js"
import Owner from "../model/ownerModel.js"
import { generateTokenAndSetCookie } from '../utils/generateToken.js'


export const registerUser = async (req, res) =>{
   
  const { fullName, email, password } = req.body
  
  try {
    
    if(!fullName || !email || !password){
    throw new Error("All fields are required")
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(!emailRegex.test(email)){
      return res.status(400).json({error: "Invalid email"})
    }
    if(password.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
    
    const userExist = await User.findOne({email})
    
    if(userExist){
      res.status(400).json({success: false, message: "User already exist"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "guest"
      
    })
    
    await user.save()
    //jwt
    generateTokenAndSetCookie(res, user._id)
    
    
    
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        image: user.images,
      },
      
    })
    console.log("user created successfully")
    
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error creating user', error.message)
  }
  
}
export const registerOwner = async (req, res) =>{
  
  const { fullName, email, password } = req.body
  
  try {
    if(!fullName || !email || !password){
    throw new Error("All fields are required")
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(!emailRegex.test(email)){
      return res.status(400).json({error: "Invalid email"})
    }
    if(password.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
    
    const ownerExist = await Owner.findOne({email})
    
    if(ownerExist){
      res.status(400).json({success: false, message: "Host already exist"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const owner = new Owner({
      fullName,
      email,
      password: hashedPassword,
    
    })
    
    await owner.save()
    //jwt
    generateTokenAndSetCookie(res, owner._id)
    
    
    
    res.status(200).json({
      success: true,
      message: "Host created successfully",
      owner: {
        ownerId: owner._id,
        fullName: owner.fullName,
        email: owner.email,
        role: owner.role,
        image: owner.images,
      },
    })
    
    
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error creating host', error.message)
  }
  
}
export const loginUser = async (req, res) =>{
  try{
    const { email, password } = req.body
    if(!email && !password){
      return res.status(400).json({success: false, message: "All fields are required"})
    }
    const user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({success: false, message: "Invalid email"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }
    
    
    generateTokenAndSetCookie(res, user._id)
    
    user.role = "guest"
    
    await user.save()
    res.status(200).json({
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      image: user.image,
    })
    
    console.log("user login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in user", error.message)
  }
}

export const loginOwner = async (req, res) =>{
  try{
    const { email, password } = req.body
    if(!email && !password){
      return res.status(400).json({success: false, message: "All fields are required"})
    }
    const owner = await Owner.findOne({ email })
    if(!owner){
      return res.status(400).json({success: false, message: "Invalid email"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }
    
    
    generateTokenAndSetCookie(res, owner._id)
    
    owner.role = "owner"
    
    await owner.save()
    
    res.status(200).json({
      ownerId: owner._id,
      fullName: owner.fullName,
      email: owner.email,
      role: owner.role,
      image: owner.image,
    })
    
    console.log("host login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in host", error.message)
  }
    
}

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
    
    
    generateTokenAndSetCookie(res, admin._id)
    
  
    
    
    res.status(200).json({
      adminId: admin._id,
      username: admin.username,
      role: "admin",
    
    })
    
    console.log("admin login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in admin", error.message)
  }
}

export const logout = async (req, res) =>{

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  
  
  })
  
  res.status(200).json({success: true, message: "User logout successfully"})
  
}



export const changeUserPassword = async (req, res) =>{
  
  try {
    const { oldPassword, newPassword } = req.body
    const { userId } = req.params
    if(!oldPassword){
      return res.status(400).json({success: false, message: "Please enter the old password"})
    }
    
    if(newPassword.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
  
  
    const user = await User.findOne({ userId })
  
    if(!user){
      return res.status(400).json({success: false, message: "User not found"})
    }
    
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    
    user.password = hashedPassword
    await user.save()
    
    res.status(200).json({success: true, message: "Password changed successfully"})
    
    
  } catch (error) {
  
    res.status(400).json({success: false, message: error.message})
    
  }
  
  
  
  
  
}

export const changeOwnerPassword = async (req, res) =>{
  
  try {
    const { oldPassword, newPassword } = req.body
    const { ownerId } = req.params
    if(!oldPassword){
      return res.status(400).json({success: false, message: "Please enter the old password"})
    }
    
    if(newPassword.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
  
  
    const owner = await Owner.findOne({ ownerId })
  
    if(!owner){
      return res.status(400).json({success: false, message: "Host not found"})
    }
    
    const isPasswordValid = await bcrypt.compare(oldPassword, owner.password)
    
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    
    owner.password = hashedPassword
    await owner.save()
    
    res.status(200).json({success: true, message: "Password changed successfully"})
  
    
  } catch (error) {
  
    res.status(400).json({success: false, message: error.message})
    
  }
  
  
  
  
  
}


export const updateUser = async(req, res) =>{
  try{
    
    const data = req.body
    const { id } = req.params
  /***
  
    const pic = data.image
    
    const uploadResponse = await cloudinary.uploader.upload(pic)
    const picUrl = uploadResponse.secure_url
    
    data.image = picUrl
***/

    if(req.user._id.toString() !== id){
      return res.status(400).json({success: false, message: "Not authorized "})
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
    
    if(!updatedUser){
      return res.status(400).json({success: false, message: "user not updated "})
    }
    
    res.status(200).json({success: true, message: "User profile updates successfully"})
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message, error: "Internal error"})
  }
}
/****
export const checkAuth = asyncHandler(async (req, res) =>{
  try{
    const user = await User.findById(req.userId).select("-password")
    if(!user) return res.status(400).json({success: false, message: "User not found"})
    res.status(200).json({
      success: true,
      message: "User Authenticated",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        image: user.images,
      }
    })
  } catch (error) {

    res.status(400).json({success: false, message: error.message})
  }
})

***/