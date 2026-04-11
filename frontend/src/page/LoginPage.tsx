import logo from '../assets/home.svg'

import React, { useState } from 'react';

import { User, Mail, Lock, Loader, Eye, EyeOff, CircleCheckBig, X } from "lucide-react"

import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore"

import { useNavigate } from 'react-router'
import bg from '../assets/images/hero.png'

const LoginPage = () =>{


  const [open, setOpen] = useState(false)
  
  
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  
  const { login, isLoading, error } = useAuthStore()
  
  
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
    
  
  
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginerror, setLoginerror] = useState('')
  
  const handleToggle = () =>{
    
    setIsVisible(!isVisible)
  }

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(password.length < 6){
      setLoginerror("password must be atleast 6 characters")
    } else {
      setLoginerror('')
    }
    console.log(email, password)

  }
  
  
  return(
    
    <div className="w-full min-h-screen flex items-center bg-no-repeat bg-cover relative justify-center" style={{ backgroundImage: `url(${bg})`}}>
      <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
        <div className="p-6 flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-24 items-center relative justify-center">
          <div className='flex flex-col items-center justify-center'>
            <div className="flex mb-2 md:mb-6 items-center gap-1">
              <img src={logo} alt="logo" className="h-17"/>
              <h2 className={"font-bold text-2xl md:text-4xl text-white "}>StayHub</h2>
            </div>
      
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 text-center">Welcome Back
            </h2>
            

          </div>
          
          
          
          
          <div className=" w-[280px] md:w-[300px] h-auto flex ">
            <div className={`w-full h-full flex bg-gray-100 flex-col   items-center rounded-lg shadow-md transition linear duration-040 flex-shrink-0`}>
              <h3 className=" text-xl mt-6 text-gray-500 font-bold">Login </h3>
              <form onSubmit={handleSubmit} className=" text-amber-800 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm ">
                
               
                
                <div className="flex items-center  my-4 border-2 bg-amber-500/5 border-amber-800/20 focus-within:border-amber-800  rounded gap-2 pl-2">
                  <Mail className="h-10" />
                  <input className="w-full outline-none bg-transparent text-gray-800 py-2.5" type="email" placeholder="Email" required onChange={(e) => (setEmail(e.target.value))} /> 
                  
                </div>
                <div className="flex items-center focus-within:border-amber-800  my-4 border-2 relative bg-amber-500/5 border-amber-800/20 rounded gap-2 pl-2  ">
                  <Lock className="h-10"/>
                  <input className="w-full outline-none  bg-transparent text-gray-800 py-2.5" type={isVisible ? "text" : "password"} placeholder="password" required onChange={(e) => (setPassword(e.target.value))} />
                  <div className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                    onClick={handleToggle}>
                    {isVisible ? <Eye className="h-10"  /> : <EyeOff className="h-10" />}
                  </div>
                
                </div>
                { error && <p className="text-center text-sm text-red-500">{error}</p>}
                { loginerror && <p className="text-center mb-3 text-sm text-red-500">{loginerror}</p>}
                <button className="w-full mb-3 bg-amber-800 hover:bg-amber-950 transition-all active:scale-95 py-2.5 rounded text-gray-100 font-medium">{isLoading ? <Loader className="animate-spin h-15 text-gray-100 mx-auto" /> : "Login"}</button>
                <p className="text-center mt-4">Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></p>
              </form>
            </div>
            
            
          </div>
          

        </div>
      

      </div>

      
          
      
    </div>

    
      
    
  )
}
export default LoginPage

