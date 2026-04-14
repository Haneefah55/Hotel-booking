
import bcrypt from 'bcryptjs'
import type { Request, Response } from "express"
import cloudinary from "../utils/cloudinary.js"
import User from "../model/userModel.js"
import  generateTokenAndSetCookie from '../utils/generateToken.js'
import type { freemem } from 'node:os'
import axios from 'axios'
import { OAuth2Client } from 'google-auth-library'
import { sendGuestWelcomeEmail, sendHostWelcomeEmail } from '../emailService/email.js'


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

type tokenPayload = {
  email: string,
  name: string,
  sub: string
}

type signupBody = {
    username: string, 
    email: string, 
    password: string, 
    role: "guest" | "host"
}

type loginBody = {
    email: string, 
    password: string, 
}

interface AuthRequest extends Request {
  user: {
    id: string,
    email: string,
    name: string,
    lastLogin: Date,
    image: string,
    isVerified: Boolean,
    createdAt: Date,
    role: string,

  }
}

export const signup = async (
    req: Request<{}, {}, signupBody>,
    res: Response
  ) =>{
   
  const { username, email, password, role } = req.body
  
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
      role: role
      
    })
    
    await user.save()

    if (user.role === "guest"){
      await sendGuestWelcomeEmail(user.email, user.username, user.createdAt)
    } else if(user.role === "host") {
      await sendHostWelcomeEmail(user.email, user.username, user.createdAt)
    }

    
    
    res.status(201).json({
      success: true,
      message: "User created successfully",

    })
    
  } catch (error: any) {
    res.status(400).json({success: false, message: error.message})
    console.log('error creating user', error.message)
  }
  
}

export const login = async (
  req: Request<{}, {}, loginBody>,
  res: Response
) =>{
  try{
    const { email, password } = req.body

    if(!email && !password){
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const user = await User.findOne({ email })
    
    if(!user){
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({ success: false, message: "Incorrect password" })
    }

    await user.save()
  
    
    //generateTokenAndSetCookie(res, user._id, user.tokenVersion)
     generateTokenAndSetCookie(res, user._id, user.tokenVersion)
     //console.log("accessToken", accessToken)
    console.log("user login successfully")
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

    
  
    res.status(200).json(userInfo)
    
    
  } catch (error: any) {
    
    res.status(400).json({success: false, message: error.message})
    console.log("error logging in user", error.message)
  }
}

export const logout = async (
  req: Request,
  res: Response
) =>{

  try {
    console.log("logging out user")

    const user = req.user!
    
  
    await User.findByIdAndUpdate(user.id, {
      $inc: { tokenVersion: 1 }
    })  
    res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",

    })
    
    res.status(200).json({ success: true, message: "User logout successfully" })
  } catch (error: any) {
    console.error("Error in logout contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
  
}

export const checkAuth = async(
  req: Request,
  res: Response
) => {
  try{
    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const user = await User.findById(req.user.id)
    if(!user) {
      return res.status(404).json({ message: 'user not found' })
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
    

    res.status(200).json(userInfo)
  } catch (error: any) {
    console.log("error in checkauth controller", error.message)
    res.status(400).json({ success: false, message: error.message })
    
  }
  
}

export const authGoogle = async (req: Request, res: Response) => {
  const redirect_uri = process.env.REDIRECT_URI!
  
  const authUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent('profile email')}`

  res.redirect(authUri)
}


export const callback = async (req:Request, res:Response) => {
  console.log(req.query)

  const code = req.query.code
  console.log(code)
  
  try {

    const googleRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    })
    console.log("callback successful")
    //console.log("googleRes.data", googleRes.data)

    const { id_token, access_token } = googleRes.data

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    })

    const payload = ticket.getPayload()

    //console.log("payload", payload)

    const { email, name, sub: googleId } = payload as tokenPayload

    // check if user is already created

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        

      })

      //await sendWelcomeEmail(user.email, user.name)

      
    } 

  
    user.isVerified = true
    user.lastLogin =  new Date()
  
    await user.save()

    generateTokenAndSetCookie(res, user._id, user.tokenVersion)
     //console.log("accessToken", accessToken)
    console.log("user login successfully")

    if (user.role === "guest"){
      await sendGuestWelcomeEmail(user.email, user.username, user.createdAt)
    } else if(user.role === "host") {
      await sendHostWelcomeEmail(user.email, user.username, user.createdAt)
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

    
  
    res.status(200).json(userInfo)

   
  
    
    
    
  } catch (error: any) {

    console.log(error)
  
    console.error("Error in callback contoller", error.message);
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }
}