import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  location: {
    // optional: for geo queries or maps
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
  },
  amenities: {
    type: [String],
    default: [],
    // example: ["WiFi", "Pool", "Gym", "Parking", "Bar"]
  },
  images: {
    type: [String], // array of image URLs
    default: [],
  },
  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Owner" if you use a separate model
    required: true,
    default: null,
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
  available: {
    type: Boolean,
    default: false, // for user checking if available before booking
  },
  
}, { timestamps: true } );

const Hotel = mongoose.model("Hotel", hotelSchema)

export default Hotel
