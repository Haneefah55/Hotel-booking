
import express from 'express'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'
import { addHotel, addRoom, getAllHotels, getAllRooms, getHotel, getRoom } from '../controller/hotelController.js' 

const router = express.Router()

router.get("/", getAllHotels)

router.get("/rooms", getAllRooms)

router.get("/:id", getHotel)
router.get("/room/:id", getRoom)



router.post("/add-hotel", protectRoute,  addHotel)
router.post("/add-room/:id", protectRoute, addRoom) 



export default router