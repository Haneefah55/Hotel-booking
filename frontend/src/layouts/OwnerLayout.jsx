
import { useAuthStore } from "../store/authStore.js"
import React, { useState } from 'react'
import { LayoutDashboard, NotebookPen, BellRing, Settings, LogOut, CircleArrowRight, CircleUserRound, House, Bed } from 'lucide-react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router'



const OwnerLayout = () =>{
  
  
  const [isOpen, setIsOpen] = useState(false)
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
  
    { name: 'Dashboard', path: '/owner', icon: LayoutDashboard  },
    { name: 'My Hotels', path: '/owner/hotels', icon: House },
    { name: 'My Rooms', path: '/owner/rooms', icon: Bed },
    { name: 'Settings', path: '/owner/settings', icon: Settings },
  ]
  



  return(
    <div className="w-screen h-auto overflow-y-auto">
      <div className="w-full h-[150px] bg-[url(./assets/images/hero.png)] flex bg-no-repeat bg-cover items-center justify-center relative ">
        <div className="w-full h-full pt-20 flex justify-center text-gray-200 pl-5 flex-col bg-black/30" >
          <Link to="/" className=" flex gap-2 font-semithin mt-5 md:ml-20 "><House /> Home</Link>
          <h2 className="text-3xl text-center font-semibold text-gray-200">Dashboard</h2>
          <p className="text-center text-amber-800 mt-10 text-xl font-semibold">Welcome, {user.name}</p>
      
        </div>
      
      </div>
      <button className="absolute z-20 top-[24%] right-[85%] md:hidden text-amber-800" onClick={handleOpen}>
            <CircleArrowRight className="w-7 h-7" />
      </button>
      <div className=" mx-1 md:mx-7 flex items-center mt-10 h-screen relative justify-center w-full">
        <aside className={`w-3/5 md:w-1/5 flex bg-gray-200  h-full mt-10 rounded-md pt-10 ${isOpen ? "flex" : "hidden md:flex "} `}>
          
          
          <ul className="flex flex-col space-y-2 gap-5 text-amber-800 mx-2 font-semibold w-full">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <li key={name}>
                  <Link  to={path} className={` flex flex-col  text-amber-800 hover:bg-amber-600 transition ${location.pathname === path ? "bg-amber-800 text-gray-200" : ""}`}>
                    
                    <div className="flex p-3 w-full gap-3">
                      <Icon className="w-6 h-6 " />
                      <span>{name}</span>
                    </div>
    
                  </Link>
                </li>
              ))}
            
            <li>
              <button className="flex p-3 gap-3 w-full hover:bg-amber-600 hover:text-gray-200" onClick={handleLogout}>
                <LogOut className="w-6 h-6" />
                
                Logout
              </button>
            </li>
            <li>
              <Link to="/guest/profile" className={` flex text-amber-800 hover:bg-amber-600 gap-3 mx-2 transition ${location.pathname === "/guest/profile" ? "bg-amber-800 text-gray-200" : ""}`}>
                
                {user.image ? <img src={user.image} className="size-6 rounded-full object-cover" /> : <CircleUserRound className="size-6 text-amber-800"/>
                  
                }
                <span>{user.fullName}</span>
                
              </Link>
            </li>
            
              
          
            
              
          </ul>
          
          
        </aside>
        
        <main className={`flex-1 mt-10 overflow-y-auto p-5 bg-gray-200 h-screen ${!isOpen ? "w-full" : ""} items-center justify-center`}>
          <Outlet />
        </main>
      </div>

      
    </div>
    

    
    
    
  
  
  )
  
  
}
export default OwnerLayout