import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './db/connectDb.js'
import cookieParser from  'cookie-parser'

import authRoutes from './routes/authRoutes.js'

import bodyParser from 'body-parser'

dotenv.config()


const app = express()

const port = process.env.PORT || 5300


app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',  // frontend origin
  credentials: true                 // allows cookies & sessions
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))



app.use("/api/auth", authRoutes)



app.listen(port, () =>{
  connectDb()
  console.log(`server running on port ${port}`)
})


