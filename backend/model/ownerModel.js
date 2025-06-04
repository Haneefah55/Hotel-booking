import mongoose from 'mongoose'

const ownerSchema = new mongoose.Schema({
  fullName: {
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
    default: "owner",
    
  },
  image: {
    type: String, // array of image URLs
    default: "",
  },
  
  

}, { timestamps: true } );




const Owner = mongoose.model("Owner", ownerSchema)

export default Owner