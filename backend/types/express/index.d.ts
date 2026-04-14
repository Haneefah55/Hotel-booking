export{}


interface User {

  id: string,
  email: string,
  name: string,
  lastLogin: Date,
  image: string,
  isVerified: Boolean,
  createdAt: Date,
  role: string,
      
}
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}