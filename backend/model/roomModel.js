import mongoose from 'mongoose'



const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  name: {
    type: String, // e.g., "Deluxe Room"
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  
  price: {
    type: Number,
    required: true,
  },
  
  maxGuests: {
    type: Number,
    default: 1,
  },
  amenities: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedDates: [{
    checkInDate: Date,
    checkOutDate: Date,
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  }],
  
}, { timestamps: true } );
const Room = mongoose.model("Room", roomSchema)

export default Room
