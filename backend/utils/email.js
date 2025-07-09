import { transporter, sender } from "./emailService.js"
import { BOOKING_CONFIRM_TEMP } from "./emailTemplate.js"


export const sendBookingConfirmation = async (booking, user, room ) =>{
  
  // Safely handle address (fallback to empty string if invalid)
  const hotelAddress = Array.isArray(room.hotel?.address) 
    ? room.hotel.address.join(", ") 
    : room.hotel?.address || "Address not available";
    
  const address = `${hotelAddress.street}, ${hotelAddress.city}, ${hotelAddress.state}, ${hotelAddress.country}`
  
  const checkIn = new Date(booking?.checkInDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    
  })
  
  const checkOut = new Date(booking?.checkOutDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    
  })
  
  
  const email = 'ummabdillah202@gmail.com'
  //to get current year
  const date = new Date()
  const currentYear = date.getFullYear()
  
  let emailHtml = BOOKING_CONFIRM_TEMP
    .replace(/{guestName}/g, user?.fullName)
    .replace(/{hotelName}/g, room?.hotel?.name)
    .replace(/{roomName}/g, room?.name)
    .replace(/{roomNumber}/g, room?.number)
    .replace(/{roomType}/g, room?.roomType)
    .replace(/{bookingId}/g, booking._id)
    .replace(/{checkInDate}/g, checkIn)
    .replace(/{checkOutDate}/g, checkOut)
    .replace(/{guests}/g, booking?.guests)
    .replace(/{totalPrice}/g, booking?.totalPrice)
    .replace(/{hotelAddress}/g, address)
    .replace(/{year}/g, currentYear);
  
  const bookingConfirmation = {
    from: sender,
    to: email,
    subject: "Your Booking Has Been Confirmed!",
    html: emailHtml,
  }
  
    transporter.sendMail(bookingConfirmation, function(error, info){
      if (error) {
        console.log("Error sending email", error);
      } else {
        console.log('Email sent: ',  info.response);
      }
    });
  
}