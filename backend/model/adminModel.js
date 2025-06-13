import mongoose from 'mongoose'


const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin"
  },
  image: {
    type: String, // array of image URLs
    default: "",
  },
  

}, { timestamps: true } );


const Admin = mongoose.model("Admin", adminSchema)

export default Admin
