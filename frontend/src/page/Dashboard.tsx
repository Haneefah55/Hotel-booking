import Navbar from '../component/Navbar.js'
import { useAuthStore } from "../store/authStore.js"

import GuestDashboard from '../component/GuestDashboard.jsx'
import AdminDashboard from '../component/AdminDashboard.jsx'
import { Link, useNavigate } from 'react-router'



const Dashboard = () =>{
  const { user, logout } = useAuthStore()

  const navigate = useNavigate()
  
  const navLinks = [
      { name: 'Dashboard', path: '/' },
      { name: 'Hotel', path: '/hotel' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' },
  ]
  const handleLogout = async() =>{
    await logout()
    navigate('/login')
    
  }


  return(
    <div className="w-screen min-h-screen relative ">
      {/* navbar */}
      <div className='fixed top-0 left-0 w-full flex items-center py-2 justify-between px-5 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 bg-amber-100'></div>

      <button className='mt-20 p-3 bg-amber-900 text-white' onClick={handleLogout}>logout</button>
    
     
      
      
    </div>
    

    
    
    
  
  
  )
  
  
}
export default Dashboard