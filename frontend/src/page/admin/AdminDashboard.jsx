//import Navbar from '../component/Navbar.jsx//import { useAuthStore } from "../../store/authStore.js"
//import React, { useState } from 'react'
import { Bed, Calendar, NotebookPen } from 'lucide-react'
//import { Link, useLocation } from 'react-router'



const AdminDashboard = () =>{
  
  


  return(

   
    <div className=" flex w-full h-full  items-center flex-col  ">
      <div className="flex flex-col md:flex-row h-auto gap-5 mb-5">
        
        <div className="w-[220px] h-[140px] text-amber-800 bg-gray-100 rounded-md shadow-md flex items-center justify-center p-4 gap-1">
        
            <Bed className="w-8 h-8" />
        
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-semibold pb-4 ">Current Stay</h3>
            <p>Hotel name</p>
            <p>Room name</p>
          </div>
          
          
          
        </div>
        
        <div className="w-[220px] h-[140px] bg-gray-100 text-amber-800 rounded-md flex items-center justify-center gap-3 shadow-md">
          
          <Calendar className="w-8 h-8" />
          
          <div className="text-xl">
            <p>Check in:</p>
            <p>Check out:</p>
            
          </div>
          
          
        </div>
        
        <div className="w-[220px] h-[140px] bg-gray-100 text-amber-800 rounded-md flex items-center justify-center gap-3 shadow-md">
          
          <NotebookPen className="w-8 h-8" />
          <p>Total Bookings:</p>
          
        </div>
        
        
        
      </div>
      
      <div className="  flex flex-col md:flex-row h-auto gap-5 mb-10">
        <div className="w-[320px] h-[280px] bg-gray-100 border-t-2 flex flex-col items-center border-amber-800 text-amber-800 rounded-md shadow-md">
          <div className=" text-amber-800 border-b-2 p-3 border-amber-800 flex w-full items-center justify-center"><h3>Recent Activities</h3>
          </div>
        </div>
        <div className="w-[320px] h-[280px] bg-gray-100 text-amber-800 rounded-md border-t-2 border-amber-800 shadow-md">
          <div className=" text-amber-800 border-b-2 p-3 border-amber-800 flex w-full items-center justify-center"><h3>My Reviews</h3>
          </div>
        </div>
      </div>
      
      
        <div className="w-full mr-3 h-[280px] bg-gray-100 rounded-md bg-gray-100 text-amber-800 border-t-2 border-amber-800 shadow-md">
          <div className=" text-amber-800 border-b-2 p-3 border-amber-800 flex w-full items-center justify-center"><h3>My Bookings</h3>
          </div>
        </div>
        

      
      
    </div>
    


  )
  
  
}
export default AdminDashboard