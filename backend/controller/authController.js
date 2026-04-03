
import bcrypt from 'bcryptjs'
import cloudinary from "../utils/cloudinary.js"
import User from "../model/userModel.js"
import  generateTokenAndSetCookie from '../utils/generateToken.js'

export const register = async (req, res) =>{
   
  const { username, email, password } = req.body
  
  try {
    
    if(!username || !email || !password){
    
    return res.status(400).json({ error: "All fields are required" })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(!emailRegex.test(email)){
      return res.status(400).json({ error: "Invalid email" })
    }
    if(password.length < 6){
      return res.status(400).json({ error: "Password must be atleast 6 character" })
    }
    
    const userExist = await User.findOne({email})
    
    if(userExist){
      res.status(400).json({success: false, message: "User already exist"})
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      
    })
    
    await user.save()
    
    res.status(201).json({
      success: true,
      message: "User created successfully",

    })
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error creating user', error.message)
  }
  
}

export const userLogin = async (req, res) =>{
  try{
    const { email, password } = req.body

    if(!email && !password){
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const user = await User.findOne({ email })
    
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({ success: false, message: "Incorrect password" })
    }

    user.role = "guest"

    await user.save()
  
    
    generateTokenAndSetCookie(res, user._id, user.tokenVersion)
    console.log("user login successfully")


    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      lastLogin: user.lastLogin,
      image: user.image,
      isVerified: user.isVerified,
      createdAt: user.createdAt
    }
  
    res.status(200).json(userInfo)
    
    
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in user", error.message)
  }
}

export const ownerLogin = async (req, res) =>{
  try{
    const { email, password } = req.body

    if(!email && !password){
      return res.status(400).json({success: false, message: "All fields are required"})
    }

    const user = await User.findOne({ email })
    
    if(!user){
      return res.status(400).json({success: false, message: "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }

    user.role = "guest"

    await user.save()
  
    
    
    
    generateTokenAndSetCookie(res, user._id)


    res.status(200).json({ ...user._doc, password: undefined })
    
    console.log("owner login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in owner", error.message)
  }
}

export const adminLogin = async (req, res) =>{
  try{
    const { username, password } = req.body

    if(!username && !password){
      return res.status(400).json({success: false, message: "All fields are required"})
    }

    const user = await User.findOne({ username })
    
    if(!user){
      return res.status(400).json({success: false, message: "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect password"})
    }

    user.role = "admin"

    await user.save()
  
    
    
    
    generateTokenAndSetCookie(res, user._id)


    res.status(200).json({ ...user._doc, password: undefined })
    
    console.log("admin login successfully")
  } catch (error) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in admin", error.message)
  }
}


export const logout = async (req, res) =>{

  try {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",

    })
    
    res.status(200).json({success: true, message: "User logout successfully"})
  } catch (error) {
    console.error("Error in logout contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
  
}


export const changePassword = async (req, res) =>{
  
  try {
    const { oldPassword, newPassword } = req.body
    const user = req.user
    
    if(!oldPassword){
      return res.status(400).json({success: false, message: "Please enter the old password"})
    }
    
    if(newPassword.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
  
  
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect old password"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    
    user.password = hashedPassword
    await user.save()
    
    res.status(200).json({success: true, message: "Password changed successfully"})
    
    
  } catch (error) {
    console.log("error in changepassword controller", error.message)
    res.status(400).json({success: false, message: error.message})
    
  }
  
  
  
  
  
}


export const changeAdminPassword = async (req, res) =>{
  
  try {
    const { oldPassword, newPassword } = req.body
    const user = req.user
    
    if(!oldPassword){
      return res.status(400).json({success: false, message: "Please enter the old password"})
    }
    
    if(newPassword.length < 6){
      return res.status(400).json({error: "Password must be atleast 6 character"})
    }
  
  
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    
    if(!isPasswordValid){
      return res.status(400).json({success: false, message: "Incorrect old password"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    
    user.password = hashedPassword
    await user.save()
    
    res.status(200).json({success: true, message: "Password changed successfully"})
    
    
  } catch (error) {
    console.log("error in change admin password controller", error.message)
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



export const checkAuth = async(req, res) => {
  try{
    
    if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
    }

    res.status(200).json({ user: req.user }) // This should be the user from JWT or session
  } catch (error) {
    console.log("error in checkauth controller", error.message)
    res.status(400).json({success: false, message: error.message})
    
  }
  
}
