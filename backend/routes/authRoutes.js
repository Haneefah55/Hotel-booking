
import express from 'express'
import { registerUser, registerOwner, loginUser, loginOwner, logout, changeUserPassword, changeOwnerPassword, updateUser, checkLogin, loginAdmin } from '../controller/authController.js'
import { protectUserRoute, protectOwnerRoute } from "../middleware/protectedRoutes.js"
import { verifyToken } from "../middleware/verifyToken.js"




const router = express.Router()
router.get('/check-login', verifyToken, checkLogin)
router.post('/signup-user', registerUser)
router.post('/signup-owner', registerOwner)
router.post('/login-user', loginUser)
router.post('/login-owner', loginOwner)
router.post('/login-admin', loginAdmin)
router.post('/logout', logout)
router.post('/change-user-password/:id', protectUserRoute, changeUserPassword)
router.post('/change-owner-password/:id', protectOwnerRoute, changeOwnerPassword)
router.put('/update-profile/:id', protectUserRoute, updateUser)




export default router