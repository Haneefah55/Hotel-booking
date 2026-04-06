
import express from 'express'
import { logout, updateUser, checkAuth,  changePassword, changeAdminPassword, signup, login } from '../controller/authController.js'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'





const router = express.Router()
router.get('/', protectRoute, checkAuth)
router.post('/signup', signup)

router.post('/login', login)

 
router.post('/logout', protectRoute, logout)

router.post('/change-password', protectRoute, changePassword)
router.post('/admin/change-password', protectRoute, adminRoute, changeAdminPassword)






export default router