import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
  },
  description: {
    type: String,
  },
  address: String,
  amenities: {
    type: [String],
    default: [],
    // example: ["WiFi", "Pool", "Gym", "Parking", "Bar"]
  },
  images: {
    type: [String], // array of image URLs
    default: [],
  },
  
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
      default: [],
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: []
    },
  ],
  
  approved: {
    type: Boolean,
    default: false, // for admin approval before listing
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: "active",
  },
  
  
}, { timestamps: true } );

const Hotel = mongoose.model("Hotel", hotelSchema)

export default Hotel
