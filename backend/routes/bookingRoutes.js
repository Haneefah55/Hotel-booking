
import express from 'express'
import { createBooking } from '../controller/bookingController.js'
import { protectUserRoute, protectOwnerRoute } from "../middleware/protectedRoutes.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post('/book', protectUserRoute, createBooking)

export default router