

import express from 'express'

import { loginAdmin } from '../controller/adminController.js'




const router = express.Router()


//router.get('/check-auth', verifyToken, checkAuth)


//post request to /api/auth/login to login a user
router.post('/login', loginAdmin)

// post request to /api/auth/signup to register a new user


//router.post('/logour-user', logUser)





export default router