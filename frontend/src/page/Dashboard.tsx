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
    navigate('/')
    
  }


  return(
    <div className="w-screen">
     Welcome
     {user?.name}

     <button className='mt-36 ml-10 border-red-300 border-2' onClick={handleLogout}>
      logout

     </button>
     
      
      
    </div>
    

    
    
    
  
  
  )
  
  
}
export default Dashboard