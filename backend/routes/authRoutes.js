
import express from 'express'
import { logout, updateUser, checkAuth, register, userLogin, ownerLogin, adminLogin, changePassword, changeAdminPassword } from '../controller/authController.js'
import { adminRoute, protectRoute } from '../middleware/authMiddleware.js'





const router = express.Router()
router.get('/check-login', protectRoute, checkAuth)
router.post('/signup', register)

router.post('/guest/login', userLogin)
router.post('/owner/login', ownerLogin)
router.post('/admin/login', adminLogin)

router.post('/logout', logout)

router.post('/change-password', protectRoute, changePassword)
router.post('/admin/change-password', protectRoute, adminRoute, changeAdminPassword)






export default router