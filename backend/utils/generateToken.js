import jwt from 'jsonwebtoken'


const generateTokenAndSetCookie = (res, userId, tokenVersion) =>{
  const accessToken = jwt.sign({ userId, tokenVersion }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d"
  })
  
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

   
  return accessToken
}



export default generateTokenAndSetCookie