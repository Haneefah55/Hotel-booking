
import { useAuthStore } from "./store/authStore.js"
import Navbar from './component/Navbar.jsx'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation} from "react-router";
import Homepage from './page/Homepage.js'
import HotelPage from './page/HotelPage.jsx'
import LoginPage from './page/LoginPage.jsx'
import SignupPage from './page/SignupPage.jsx'
import { Navigate } from 'react-router'
import GuestLayout from './layouts/GuestLayout.jsx'
import GuestDashboard from './page/guest/GuestDashboard.jsx'
import OwnerLayout from './layouts/OwnerLayout.jsx'
import OwnerDashboard from './page/owner/OwnerDashboard.jsx'
import AddHotel from './page/owner/AddHotel.jsx'
import AddRoom from './page/owner/AddRoom.jsx'
import HotelList from './page/owner/HotelList.jsx'
import RoomList from './page/owner/RoomList.jsx'
import SingleHotel from './page/SingleHotel.jsx'
import SingleRoom from './page/SingleRoom.jsx'
import BookRoom from './page/BookRoom.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './page/admin/AdminDashboard.jsx'
import AdminLogin from './page/admin/AdminLogin.jsx'



const App = () =>{

  
  const { checkAuth, user, isAuthenticated } = useAuthStore()
  

  const pathname= useLocation().pathname
  const matchPaths = ['/login', '/signup', '/book'];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  //const user = null
    

  useEffect(() => {
    checkAuth()
    
  }, [])

  return(
    
    <div className=" w-screen min-h-screen overflow-x-clip " >

     {!isMatch && <Navbar user = {user} />} 
     

           
      <Routes>
        <Route path="/" element={<Homepage />} />
                 
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      

        
        {/** Admin **/}

              
        <Route path="/admin" element={<AdminLogin />} />
        
  
        
        
        <Route path="/hotel/:id" element={<SingleHotel />} />
        <Route path="/room/:id" element={<SingleRoom />} />


        <Route path="/hotels" element={<HotelPage  />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
                             

      </Routes>
      

    </div>
  
  
  )
  
}
export default App