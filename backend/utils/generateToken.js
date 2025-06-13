import jwt from 'jsonwebtoken'
import { config } from "dotenv"


export const generateTokenAndSetCookie = (res, id, role) =>{
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  })
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  })
  
  return token
}
// When logging in:
/**
const token = jwt.sign(
  { id: user._id, role: user.role, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
)

**/