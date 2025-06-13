import logo from '../assets/home.svg'
import React from 'react'

import { useState, useEffect } from 'react'
import { Menu, X, CircleUserRound } from 'lucide-react'
import { Link } from 'react-router'
//import { useAuthStore } from "../store/authStore.js"


const Navbar = ({ user }) => {
  const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Hotel', path: '/hotel' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' },
  ]
  let path = '/'
  if (user?.role === "user"){
    path = '/guest'
  } else if (user?.role === "owner"){
    path = '/owner'
  } else if (user?.role === "admin"){
    path = '/admin'
  } else {
    path= '/'
  }

  //const { isAuthenticated, user } = useAuthStore
 
 const username = user?.fullName
 

// const [isLogin, setIsLogin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      //setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  


  return (
        
    <nav className={`fixed top-0 left-0 w-full flex items-center py-2 justify-between px-5 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? " shadow-md text-amber-800 backdrop-blur-xl  py-3 md:py-4" : "py-4 md:py-6"}`}>

        {/* Logo */}
        
        <Link to="/" className="flex items-center gap-1.5">
            <img src={logo} alt="logo" className={`h-10 `} />
            <h2 className={`font-bold text-xl ${isScrolled ? "text-amber-800" : "text-gray-100"}`}>LetStay</h2>
        </Link>

        {/* Desktop Nav */}
                
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-amber-800" : "text-gray-200"}`}>
                    {link.name}
                    <div className={`${isScrolled ? "bg-amber-800" : "bg-gray-200"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} ></div>
                </Link>
            ))}
            
            
          
            
        </div>

        {/* Navbar Right */}
        

        <div className="flex items-center gap-4">
          
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-10 w-10 cursor-pointer text-amber-800 flex md:hidden`} 
          />
          { user ? <Link to={path} className=" flex items-center gap-2 justify-center">
            {user?.image ? <img src={user?.image} className="size-8 rounded-full object-cover" /> : <CircleUserRound className={` size-8 ${isScrolled ? "text-amber-800" : "text-gray-200"}`} /> }

            <div className={`${isScrolled ? "text-amber-800" : "text-gray-100"} hidden md:flex`}>{username}</div>
            </Link> :  <Link to="/login" className={` font-bold  flex transition-all border-2 p-2 text-md duration-500 ${isScrolled ? "text-amber-800 border-amber-800 hover:bg-amber-800 hover:text-gray-100  " : "text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-amber-800"}`} >
                Login
              </Link>
          }    
          
        </div>

      

        {/* Mobile Menu */}
        
     
        <div className={`fixed top-0 left-0 w-full h-screen bg-white/40 backdrop-blur-lg  text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-amber-800 text-xl font-semibold transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}>
                <X className="h-10 w-10 text-amber-800" />
              
          </button>

            {navLinks.map((link, i) => (
                <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                </Link>
            ))}

        </div>
      
    </nav>
  
  );
}

export default Navbar