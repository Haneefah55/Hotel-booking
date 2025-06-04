import React, { useState } from 'react'
import { Routes, Route, useLocation} from "react-router";
//import { useAuthStore } from "./store/authStore.js"

import Navbar from './component/Navbar.jsx'
import Homepage from './page/Homepage.jsx'
//import LoginPage from './page/LoginPage.jsx'
//import SignupPage from './page/SignupPage.jsx'
//import Dashboard from './page/Dashboard.jsx'

/****

const ProtectedRoutes = ({ children }) =>{
  const { isAuthenticated, user } = useAuthStore()
  
  
  if(!isAuthenticated){
    return <Navigate to="/account/login" replace />
  }
  

  
  return children
} 


const RedirectAuthenticatedUser = ({ children }) =>{
  const { isAuthenticated } = useAuthStore()

  
  if(isAuthenticated){
    return <Navigate to="/account/dashboard" replace />
  }
  return children
}

***/

const App = () =>{
  
  //const { isAuthenticated, user } = useAuthStore()
  

  const pathname= useLocation().pathname
  const matchPaths = ['/dashboard', '/login', '/signup'];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  
  return(
    <div className="font-[Outfit] bg-gray-300">
      
      {!isMatch && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/***}
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/signup" element={<SignupPage />} />
        <Route path="/account/dashboard" element={<Dashboard />} />
        ***/}
      </Routes>
      
    </div>
  
  
  )
  
}
export default App