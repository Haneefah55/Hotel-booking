import mongoose from 'mongoose'
import { type } from 'node:os';

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["guest", "host", "admin"],
    required: true,
    default: "guest"
  },
  image: String,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  googleId: String,
  facebookId: String,
  isNewUser: Boolean,
  authCode: String,
  authCodeExpiresAt: Date,
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  tokenVersion : {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
  

}, { timestamps: true } );



const User = mongoose.model("User", userSchema)

export default User