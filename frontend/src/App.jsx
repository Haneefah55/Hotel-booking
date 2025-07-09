
import { useAuthStore } from "./store/authStore.js"
import Navbar from './component/Navbar.jsx'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation} from "react-router";
import Homepage from './page/Homepage.jsx'
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
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './page/admin/AdminDashboard.jsx'
import AdminLogin from './page/admin/AdminLogin.jsx'



const ProtectedRoutes = ({ allowedRole, children }) =>{
  const { user } = useAuthStore()
  
  //window.alert(JSON.stringify(user))
  if(!user){
    return <Navigate to="/login" replace />
  }
  if(!allowedRole.includes(user.role)){
    return <Navigate to="/login" replace />
  }
  

  
  return children
} 


const ProtectAdminRoutes = ({ allowedRole, children }) =>{
  const { user } = useAuthStore()
  
  //window.alert(JSON.stringify(user))
  if(!user){
    return <Navigate to="/login-admin" replace />
  }
  if(!allowedRole.includes(user.role)){
    return <Navigate to="/login" replace />
  }
  

  
  return children
} 


const RedirectAuthenticatedUser = ({ children }) =>{
  const { isAuthenticated } = useAuthStore()

  
  if(isAuthenticated){
    return <Navigate to="/" replace />
  }
  return children
}



const App = () =>{

  
  const { checkAuth, user, isAuthenticated } = useAuthStore()
  

  const pathname= useLocation().pathname
  const matchPaths = ['/login', '/signup' ];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  //const user = null
    

  useEffect(() => {
    checkAuth()
    //window.alert(JSON.stringify(user))
  }, [])

  return(
    
    <div className="font-[Outfit] w-screen h-screen bg-gray-100 " >

     {!isMatch && <Navbar user = {user} />} 
     

           
      <Routes>
        <Route path="/" element={<Homepage />} />
                 
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
        
          
        } />
        
        {/** Guest **/}
        
        <Route path="/guest" element={
          <ProtectedRoutes allowedRole={["guest"]}>
            <GuestLayout />
          </ProtectedRoutes>
        }>
          <Route index element ={<GuestDashboard />} />
          <Route path="bookings" element={<div>my bookings</div>} />
        
        </Route>
        
             {/** Owner **/}
            
        <Route path="/owner" element={
          <ProtectedRoutes allowedRole={["owner"]}>
            <OwnerLayout />
          </ProtectedRoutes>
        }>
          <Route index element ={<OwnerDashboard />} />
          <Route path="hotels" element={<HotelList />} />
          <Route path="rooms" element={<RoomList />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="add-hotel" element={<AddHotel />} />
        </Route>
        

        
        {/** Admin **/}

              
        <Route path="/login-admin" element={<AdminLogin />} />
        
               

        <Route path="/admin" element={
          <ProtectAdminRoutes allowedRole={["admin"]}>
            <AdminLayout />
          </ProtectAdminRoutes>
        }>
          <Route index element ={<AdminDashboard />} />
          <Route path="bookings" element={<div>my bookings</div>} />
        
        </Route>
        
        
        <Route path="/hotel/:id" element={<SingleHotel />} />
        <Route path="/room/:id" element={<SingleRoom />} />
        <Route path="/hotels" element={<HotelPage  />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
                             

      </Routes>
      

    </div>
  
  
  )
  
}
export default App