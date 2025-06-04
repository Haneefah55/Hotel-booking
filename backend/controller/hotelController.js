
import Hotel from "../model/hotelModel.js"
import Owner from "../model/ownerModel.js"
import Room from "../model/roomModel.js"

export const addHotel = async(req, res) =>{
  const { name, description, address, amenities } = req.body
  
  const { ownerId }= req.params
  try {
    
    const hotelExist = await Hotel.findOne({name})
    
    if(hotelExist){
      res.status(400).json({success: false, message: "Hotel already created"})
    }
    
    const hotelOwner = await Owner.findOne({ ownerId })
    
      
    if(!hotelOwner){
      return res.status(400).json({success: false, message: "Host not found: Create a Host account"})
    }
    
    const hotel = new Hotel({
      name,
      description,
      address,
      amenities,
      owner: hotelOwner._id,
      
      
    })
    await hotel.save()
    
    res.status(200).json({
      
      hotelId: hotel._id,
      name: hotel.name,
      description: hotel.description,
      address: hotel.address,
      amenities: hotel.amenities,
      image: hotel.images,
      location: hotel.location,
      owner: hotel.owner,
      rating: hotel.rating,
      reviews: hotel.reviews,
      rooms: hotel.rooms,
      approved: hotel.approved,
      available: hotel.available,
      
    })
    
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error add hotel', error.message)
  }
  
  
  
}

export const addRoom = async(req, res) =>{
  const { name, price, amenities } = req.body
  
  const { hotelId }= req.params
  try {
    
    const roomExist = await Room.findOne({name})
    
    if(roomExist){
      res.status(400).json({success: false, message: "Room already created"})
    }
    
    const hotel = await Hotel.findOne({ hotelId })
    
      
    if(!hotel){
      return res.status(400).json({success: false, message: "Hotel not found: Create Hotel"})
    }
    
    const room = new Room({
      hotel: hotel._id,
      name,
      price,
      amenities,
      
      
      
    })
    await room.save()
    
    res.status(200).json({
      
      roomId: room._id,
      hotel: room.hotel,
      name: room.name,
      price: room.price,
      maxGuest: room.maxGuest,
      amenities: room.amenities,
      image: room.images,
      rating: room.rating,
      available: room.available,
      
    })
    
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error adding room', error.message)
  }
  
  
  
}