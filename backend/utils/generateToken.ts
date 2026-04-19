import jwt from 'jsonwebtoken'
import type { Request, Response } from "express"




const generateTokenAndSetCookie = (res: Response, userId: string, tokenVersion: number) =>{
  const accessToken = jwt.sign({ userId, tokenVersion }, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: "15m"
  })
  const refreshToken = jwt.sign({ userId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
  
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
 
   
  return accessToken
}



export default generateTokenAndSetCookie