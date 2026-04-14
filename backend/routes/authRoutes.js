
import express from 'express'
import { logout,  checkAuth,  signup, login } from '../controller/authController.ts'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'





const router = express.Router()
router.get('/', protectRoute, checkAuth)
router.post('/signup', signup)

router.post('/login', login)

 
router.post('/logout', protectRoute, logout)








export default router