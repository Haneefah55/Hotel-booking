
import express from 'express'
import { logout,  checkAuth,  signup, login, authGoogle } from '../controller/authController.js'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'





const router = express.Router()
router.get('/', authGoogle)
router.get('/', protectRoute, checkAuth)
router.post('/signup', signup)

router.post('/login', login)

 
router.post('/logout', protectRoute, logout)








export default router