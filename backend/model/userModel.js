import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["guest", "host", "admin"],
    required: true
  },
  image: String,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  googleId: String,
  facebookId: String,
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