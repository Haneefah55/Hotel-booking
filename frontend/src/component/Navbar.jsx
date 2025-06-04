import logo from '../assets/home.svg'
import React from 'react'
import profileImage from "../assets/profile.png"
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore.js"


const Navbar = () => {
  const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Hotel', path: '/hotel' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' },
  ]

  const { isAuthenticated, user } = useAuthStore()
  
  const pics = user.image

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
                <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-amber-800" : "text-gray-200"}`}>
                    {link.name}
                    <div className={`${isScrolled ? "bg-amber-800" : "bg-gray-200"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                </a>
            ))}
            
            
          
            
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          
            {isAuthenticated ? <Link to="/account/dashboard">
                <img src={pics ? pics : profileImage} className="size-8 rounded-full object-cover border-2 border-purple-600" 
                />
                </Link> : <Link to="/account/login" className={` font-bold transition-all border-2 p-2 text-md duration-500 ${isScrolled ? "text-amber-800 border-amber-800 hover:bg-amber-800 hover:text-gray-100  " : "text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-amber-800"}`}>
                Login
                </Link>
              
            }
            
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-5 md:hidden">
          
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-10 w-10 cursor-pointer text-amber-800 `} 
          />
        
          {isAuthenticated ? <Link to="/account/dashboard"> <img src={pics ? pics : profileImage} className="size-8 rounded-full object-cover border-2 border-purple-600" /> </Link> : <Link to="/account/login" className={` font-bold transition-all border-2 p-2 text-md duration-500 ${isScrolled ? "text-amber-800 border-amber-800 hover:bg-amber-800 hover:text-gray-100  " : "text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-amber-800"}`}>
                Login
              </Link>
              
          }
            
    
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-screen bg-white/40 backdrop-blur-lg  text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-amber-800 text-xl font-semibold transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                <X className="h-10 w-10 text-amber-800" />
              
            </button>

            {navLinks.map((link, i) => (
                <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                </a>
            ))}

        </div>
    </nav>
  
  );
}

export default Navbar