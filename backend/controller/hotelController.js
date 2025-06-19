import cloudinary from "../utils/cloudinary.js"

import Hotel from "../model/hotelModel.js"
import Owner from "../model/ownerModel.js"
import Room from "../model/roomModel.js"

export const addHotel = async(req, res) =>{
  const { name, description, address, amenities, uploadedImageUrls } = req.body

    
  
  
  const { id } = req.params
  try {
    
    const hotelExist = await Hotel.findOne({name})
    
    if(hotelExist){
      res.status(400).json({success: false, message: "Hotel already created"})
    }
    
   // const owners = await Owner.find({})
    const hotelOwner = await Owner.findById(id)
    
    
    if(!hotelOwner){
      return res.status(400).json({success: false, message: "Host not found: Create a Host account"})
    }
    
    const hotel = new Hotel({
      name,
      description,
      address,
      amenities,
      images: uploadedImageUrls,
      owner: hotelOwner._id,
      
      
    })
    
    await hotel.save()
    
    res.status(200).json({
      success: true,
      message: "Hotel created successfully"
    })
    
    console.log(hotel)
    console.log("hotel added successfully")
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error adding hotel', error.message)
  }
  
  
  
}

export const getAllHotels = async (req,res) =>{
  
  try {
    const hotels = await Hotel.find({}).populate("owner")
    
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
}
export const getAllRooms = async (req,res) =>{
  
  try {
    const rooms = await Room.find({}).populate("hotel").sort({ createdAt: -1 }) // or { createdAt: 'desc' } or { createdAt: 'descending' }
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
}


export const getOwnerHotel = async(req, res) =>{
  
  const { id } = req.params
  try {
    

    const hotelOwner = await Owner.findById(id)
    
      
    if(!hotelOwner){
      return res.status(400).json({success: false, message: "Host not found: Create a Host account"})
    }
    
    const hotels = await Hotel.find({ owner: id })
    
    res.status(200).json({
      count: hotels.length,
      data: hotels
    });
    
    
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
}

export const addRoom = async(req, res) =>{
  const { name, number, roomType, price, amenities, maxGuests, uploadedImageUrls } = req.body
  
  
  const id = req.owner._id
  
  try {
    
    const roomExist = await Room.findOne({number})
    
    if(roomExist){
      res.status(400).json({success: false, message: "Room Existed"})
    }
    
    const hotel = await Hotel.findById(req.params.id)
      
    if(!hotel){
      return res.status(400).json({success: false, message: "Hotel not found: Create Hotel"})
      console.log("Hotel not found: Create Hotel")
    }
    
    const owner = await Owner.findById(id)
    
    if(!owner){
      return res.status(400).json({success: false, message: "Access restrited: Login as owner to continue"})
      console.log("Access restrited: Login as owner to continue")
    }
    
    const room = new Room({
      hotel: hotel._id,
      name,
      number,
      roomType,
      price,
      maxGuests,
      amenities,
      images: uploadedImageUrls,
      
      
      
      
    })
    await room.save()
    
    hotel.rooms.push(room._id)
    
    await hotel.save()
    
    res.status(200).json({
      
      success: true,
      message: "Hotel room added successfully"

    })
    console.log("hotel room added successfully")
    
  } catch (error) {
    res.status(400).json({success: false, message: error.message})
    console.log('error adding room', error.message)
  }
  
  
  
}

export const getSingleHotel = async (req,res) =>{
  
   const { id } = req.params
  try {
    
    const hotel = await Hotel.findById(id)
    if(!hotel) {
      return res.status(404).json({
      success: true,
      message: 'hotel not found',
    });
    }
    
    res.status(200).json({
      success: true,
      data: hotel
    });
    
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
}