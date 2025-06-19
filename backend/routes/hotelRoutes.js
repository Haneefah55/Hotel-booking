
import express from 'express'
import { addHotel, getAllHotels, getOwnerHotel, getSingleHotel, addRoom, getAllRooms } from '../controller/hotelController.js'
import { protectOwnerRoute } from "../middleware/protectedRoutes.js"

const router = express.Router()

router.get("/all", getAllHotels)
router.get("/all-rooms", getAllRooms)
router.get("/owner/:id", protectOwnerRoute, getOwnerHotel)
router.get("/:id", getSingleHotel)
router.post("/add-hotel/:id", protectOwnerRoute, addHotel)
router.post("/add-room/:id", protectOwnerRoute, addRoom)



export default router