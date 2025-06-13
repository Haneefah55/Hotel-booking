import logo from '../assets/home.svg'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import React from 'react'
import profileImage from "../assets/profile.png"


const Header = ({ pics, username }) =>{
  
  const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Hotel', path: '/hotel' },
      { name: 'Experience', path: '/experience' },
      { name: 'Contact', path: '/contact' },
  ]
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  
  
  return(
    <div className="fixed top-0 left-0 w-full flex items-center py-2 justify-between px-5 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 bg-gray-200  shadow-md text-amber-800 backdrop-blur-xl  py-3 md:py-4" >
    
      <Link to="/" className="flex items-center gap-1.5">
        <img src={logo} alt="logo" className={`h-10 `} />
        <h2 className="font-bold text-xl text-amber-800">LetStay</h2>
      </Link>
      
        {/* Desktop Nav */}
                
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} className="group flex flex-col gap-0.5 text-amber-800">
                <div className="font-bold">{link.name}</div>
                
                <div className="bg-amber-800 h-0.5 w-0 group-hover:w-full transition-all duration-300"></div>
                </Link>
            ))}
            
      
            
        </div>
        
        
       
        <div className="hidden md:flex items-center gap-4">
          <button>
            <img src={pics ? pics : profileImage} className="size-10 rounded-full object-cover "  /> 
          </button>
          <p className="font-bold text-amber-800">{username}</p>
          
          
        </div>
      
        
                {/* Mobile Menu Button */}

        
        <div className="flex items-center gap-5 md:hidden">
          
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-10 w-10 cursor-pointer text-amber-800 `} 
          />
          
          <button >
            <img src={pics ? pics : profileImage} className="size-8 rounded-full object-cover"  /> 
          </button> 

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
      
        

      
      
      
      
      
    </div>
  
  
  
  )
}

export default Header