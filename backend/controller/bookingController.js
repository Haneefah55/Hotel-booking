import Hotel from "../model/hotelModel.js"
import Owner from "../model/ownerModel.js"
import Room from "../model/roomModel.js"
import Booking from "../model/bookingModel.js"
import { sendBookingConfirmation } from "../utils/email.js"

async function checkRoomAvailability(roomId, checkInDate, checkOutDate) {
  const conflictingBookings = await Booking.find({
    room: roomId,
    status: { $ne: 'cancelled' },
    $or: [
      {
        checkInDate: { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) }
      }
    ]
  });

  return conflictingBookings.length === 0;
}

export const createBooking = async(req, res) =>{
  
  try {
    const { roomId, checkInDate, checkOutDate, guests, specialRequests } = req.body
    
    const userId = req.user.id; // Assuming you have user authentication

    // Check if room exists and is available
    const room = await Room.findById(roomId).populate("hotel");
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check room availability for the selected dates
    const isAvailable = await checkRoomAvailability(roomId, checkInDate, checkOutDate);
    if (!isAvailable) {
      return res.status(400).json({ 
        success: false, 
        message: 'Room is not available for the selected dates' 
      });
    }

    // Calculate total price based on room price and duration
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      paymentMethod,
      specialRequests,
      status: 'confirmed' // or 'pending' depending on your payment flow
    });
    
    
        // Update room's bookedDates
    await Room.findByIdAndUpdate(roomId, {
      $push: {
        bookedDates: {
          checkInDate,
          checkOutDate,
          booking: booking._id
        }
      }
    });
    const user = req.user
    // Send confirmation email
    await sendBookingConfirmation(booking, user, room);

    res.status(201).json({
      success: true,
      data: booking
    });
    console.log("booking created")
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: err.message 
    });
  }
};

export const bookingPayment = async (req, res) =>{
  
  
}
