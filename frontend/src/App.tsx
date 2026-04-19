
import { useAuthStore } from "./store/authStore.js"
import Navbar from './component/Navbar'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation} from "react-router";
import Homepage from './page/Homepage.js'
import HotelPage from './page/HotelPage.jsx'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import { Navigate } from 'react-router'
import GuestLayout from './layouts/GuestLayout'
import Dashboard from "./page/Dashboard";

import SingleHotel from './page/SingleHotel.jsx'
import SingleRoom from './page/SingleRoom.jsx'
import BookRoom from './page/BookRoom.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AuthCallbackPage from "./page/AuthCallbackPage.js";
import SelectRole from "./component/SelectRole.js";




const App = () =>{

  
  const { checkAuth, user, isAuthenticated } = useAuthStore()
  console.log("user from app", user)
  

  const pathname= useLocation().pathname
  const matchPaths = ['/login'];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  //const user = null
    

  useEffect(() => {
    checkAuth()
    
  }, [])

  return(
    
    <div className=" w-screen min-h-screen overflow-x-clip " >

     {!isMatch && <Navbar />} 
     

           
      <Routes>
        <Route path="/" element={<Homepage />} />
                 
        <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to={'/dashboard'} replace />} />
        <Route path="/signup" element= { !user ? <SignupPage /> : <Navigate to={'/dashboard'} replace />} />
        <Route path="/dashboard" element={ user ? <Dashboard /> : <Navigate to={'/login'} replace />} />
  
        <Route path="/google-callback" element={<AuthCallbackPage />}/>
        <Route path="/select-role" element={ <SelectRole /> } />
       


        
        <Route path="/hotel/:id" element={<SingleHotel />} />
        <Route path="/room/:id" element={<SingleRoom />} />


        <Route path="/hotels" element={<HotelPage  />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
                             

      </Routes>
      

    </div>
  
  
  )
  
}
export default App