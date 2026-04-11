
import { useAuthStore } from "../store/authStore.js"
import React, { useState } from 'react'
import { LayoutDashboard, NotebookPen, BellRing, Settings, LogOut, CircleArrowRight, CircleUserRound, House } from 'lucide-react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router'



const GuestLayout = () =>{const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const location = useLocation()
  
  const navigate = useNavigate()
  const handleOpen = () =>{
    
    setIsOpen(!isOpen)
  }
  const handleLogout = async ()=>{
    await logout()
    navigate("/")
  }
  const navLinks = [
  
    { name: 'Dashboard', path: '/guest', icon: LayoutDashboard  },
    { name: 'Bookings', path: '/guest/bookings', icon: NotebookPen },
    { name: 'Notifications', path: '/guest/notifications', icon: BellRing },
    { name: 'Settings', path: '/guest/settings', icon: Settings },
  ]
  



  return(
    <div className="w-screen">
      guest layout
    </div>
    

    
    
    
  
  
  )
  
  
}
export default GuestLayout