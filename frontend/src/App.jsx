import React, { useState } from 'react'
import { Routes, Route, useLocation} from "react-router";
import { useAuthStore } from "./store/authStore.js"

import Navbar from './component/Navbar.jsx'
import Homepage from './page/Homepage.jsx'
import LoginPage from './page/LoginPage.jsx'
import SignupPage from './page/SignupPage.jsx'
import Dashboard from './page/Dashboard.jsx'



const ProtectedRoutes = ({ children }) =>{
  const { isAuthenticated } = useAuthStore()
  
  
  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  

  
  return children
} 


const RedirectAuthenticatedUser = ({ children }) =>{
  const { isAuthenticated } = useAuthStore()

  
  if(isAuthenticated){
    return <Navigate to="/dashboard" replace />
  }
  return children
}



const App = () =>{
  
  const { isAuthenticated, user } = useAuthStore()
  

  const pathname= useLocation().pathname
  const matchPaths = ['/dashboard', '/login', '/signup'];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  
  return(
    <div className="font-[Outfit] bg-gray-300">
      
      {!isMatch && <Navbar { ...user } />}
      <Routes>
        <Route path="/" element={<Homepage />} />
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
                
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      
    </div>
  
  
  )
  
}
export default App