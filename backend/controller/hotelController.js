//import cloudinary from "../utils/cloudinary.js"

import Hotel from "../model/hotelModel.js"
import User from "../model/userModel.js"

import Room from "../model/roomModel.js"

export const addHotel = async(req, res) =>{
  const { name, description, address, amenities, uploadedImageUrls } = req.body

  const hostId = req.user._id
 // console.log("hostId", req.user._id)
  try {
    
    const hotelExist = await Hotel.findOne({name})
    
    if(hotelExist){
      res.status(400).json({success: false, message: "Hotel already exist"})
    }
    
   
    const user = await User.findById(hostId)
    //console.log("role", user.role)
    
    
    if(user.role !== "host"){
      return res.status(400).json({success: false, message: "Access Restricted, Create a Host account"})
    }
    
    const hotel = new Hotel({
      name,
      description,
      address,
      amenities,
      images: uploadedImageUrls,
      host: user._id,
      
      
    })
    
    await hotel.save()
    
    res.status(200).json({
      success: true,
      message: "Hotel created successfully"
    })
    
    console.log(hotel)
    console.log("hotel added successfully")
    
  } catch (error) {
    console.log('error adding hotel', error.message)
    res.status(400).json({success: false, message: error.message})
    
  }
  
  
  
}

export const getAllHotels = async (req,res) =>{
  
  try {
    const hotels = await Hotel.find({}).sort({ createdAt: -1 })
    
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    console.log('error getting all hotels', error.message)
    
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
}

export const addRoom = async(req, res) =>{
  
  try {

    const { name, roomNumber, roomType, price, amenities, maxGuests, uploadedImageUrls } = req.body
  
    const  hotelId = req.params.id
    console.log("hotelId", req.params.id)
    
    const roomExist = await Room.findOne({roomNumber})
    
    if(roomExist){
      res.status(400).json({success: false, message: "Room Existed"})
    }
    
    const hotel = await Hotel.findById(hotelId)
    const host = await User.findById(req.user._id)

    if(host.role !== "host") {
      res.status(400).json({success: false, message: "Access Restricted"})
    }
      
    if(!hotel){
      console.log("Hotel not found: Create Hotel")
      return res.status(400).json({success: false, message: "Hotel not found: Create Hotel"})
      
    }
  
    
    const room = new Room({
      hotel: hotel._id,
      host: host._id,
      name,
      roomNumber,
      roomType,
      price,
      maxGuests,
      amenities,
      images: uploadedImageUrls,
      
    })

    await room.save()
    
    hotel.rooms.push(room._id)
    
    await hotel.save()
    console.log("hotel room added successfully")
    console.log(room)
    
    res.status(200).json({
      
      success: true,
      message: "Hotel room added successfully"

    })
    
    
  } catch (error) {
    console.log('error adding room', error.message)
    res.status(400).json({success: false, message: error.message})
    
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
  } catch (error) {
    console.log("error get all rooms", error.message)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
}


export const getHotel = async (req,res) =>{
  
  const { id } = req.params
  console.log("id", id)
  try {
    
    const hotel = await Hotel.findById(id).populate("host")
    if(!hotel) {
      return res.status(404).json({
      success: true,
      message: 'hotel not found',
    });
    }
    
    res.status(200).json(hotel);
    
  } catch (error) {
    console.log("error getting hotel", error.message)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
}



export const getRoom = async (req,res) =>{
  
  const { id } = req.params
  try {
    
    const room = await Room.findById(id).populate("hotel")
    if(!room) {
      return res.status(404).json({
      success: false,
      message: 'room not found',
    });
    }
    
    res.status(200).json(room);
    
    
  } catch (error) {
    console.log("error getting hotel", error.message)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
}


/*

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


 */