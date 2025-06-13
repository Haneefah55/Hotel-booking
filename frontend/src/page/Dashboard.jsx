import Navbar from '../component/Navbar.jsx'
import { useAuthStore } from "../store/authStore.js"

import GuestDashboard from '../component/GuestDashboard.jsx'
import AdminDashboard from '../component/AdminDashboard.jsx'
import { Link } from 'react-router'



const Dashboard = () =>{
  const { user } = useAuthStore()
  
  const navLinks = [
      { name: 'Dashboard', path: '/' },
      { name: 'Hotel', path: '/hotel' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' },
  ]



  return(
    <div className="w-screen">
      <div className="w-full h-[200px] bg-[url(./assets/images/hero.png)] flex bg-no-repeat bg-cover items-center justify-center relative ">
        <div className="w-full h-full pt-20 flex justify-center text-gray-200 pl-5 flex-col bg-black/30" >
          <Link to="/" className=" font-thin mt-5 ">Back to Home</Link>
          <h2 className="text-3xl text-center font-semibold text-gray-200">Dashboard</h2>
          <p className="text-center mt-4">Welcome, {user.fullName}</p>
      
        </div>
        
    
      
      </div>
      
          {/** Dashboard view**/}
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "owner" && <OwnerDashboard />}
      {user.role === "guest" && <GuestDashboard />}

     
      
      
    </div>
    

    
    
    
  
  
  )
  
  
}
export default Dashboard