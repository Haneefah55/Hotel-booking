
import express from 'express'
import { addHotel } from '../controller/hotelController.js'
import { protectOwnerRoute } from "../middleware/protectedRoutes.js"

const router = express.Router()

router.post("/add-hotel/:id", protectOwnerRoute, addHotel)



export default router