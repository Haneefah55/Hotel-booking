
import express from 'express'
import { logout,  checkAuth,  signup, login, authGoogle, callback, verifyAuthCode, selectRole } from '../controller/authController.js'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'





const router = express.Router()

router.get('/', protectRoute, checkAuth)
router.get('/google', authGoogle)
router.get('/google/callback', callback)



router.post('/signup', signup)
router.post('/verify-google', verifyAuthCode)

router.post('/login', login)

 
router.post('/logout', protectRoute, logout)
router.patch('/select-role', protectRoute, selectRole)








export default router