
import logo from '../../assets/home.svg'

import React, { useState } from 'react';

import { User, Lock, Loader, Eye, EyeOff, CircleCheckBig, X } from "lucide-react"

import { Link } from 'react-router'
import { useAuthStore } from "../../store/authStore.js"
import { useNavigate } from 'react-router'

const AdminLogin = () =>{

  const { adminLogin, isLoading, error } = useAuthStore()
    
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [open, setOpen] = useState(false)
  
  
  const handleOpen = () =>{
    setOpen(true)
  }
  
  const handleClose = () =>{
    setOpen(false)
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleToggle = () =>{
    
    setIsVisible(!isVisible)
  }
  
  const handleAdminLogin = async(e) =>{
    e.preventDefault()

    
    try{
      await adminLogin(username, password)
      handleOpen()
      setTimeout(() =>{
        navigate("/admin")
      }, 3000)
    } catch (error) {
      alert(error)
    }
    
  }
  
  
  return(
    
    <div className="w-full h-screen md:h-screen md:max-w-[700px] flex items-center justify-center">
      


      <div className="p-6 flex flex-col items-center overflow-hidden relative justify-center">
        
        <div className="flex mb-6 items-center gap-1">
          <img src={logo} alt="logo" className="h-17"/>
            <h2 className={"font-bold text-3xl text-amber-800 "}>LetStay</h2>
        </div>
        

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back!  </h2> 
        
     
        
      
        <div className="w-[300px] h-[350px] flex ">

          <div className={`w-full h-full flex bg-gray-100 flex-col items-center rounded-lg shadow-md transition linear duration-040 flex-shrink-0`}>
             <h3 className=" text-xl mt-6 text-gray-500 font-bold">Admin Login </h3>
            <form onSubmit={handleAdminLogin}  className=" text-amber-800 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm">
              
              <div className="flex items-center my-4 border bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <User className="h-10" />
                <input className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Username" required onChange={(e) => (setUsername(e.target.value))} /> 
              </div>
              <div className="flex items-center my-4 border relative bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <Lock className="h-10"/>
                <input className="w-full outline-none bg-transparent py-2.5" type={isVisible ? "text" : "password"} placeholder="password" required onChange={(e) => (setPassword(e.target.value))} />                <div className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                  onClick={handleToggle}>
                  {isVisible ? <Eye className="h-10"  /> : <EyeOff className="h-10" />}
                </div>
               
              </div>
              
              <button className="w-full mb-3 bg-amber-800 hover:bg-amber-950 transition-all active:scale-95 py-2.5 rounded text-gray-100 font-medium">{isLoading ? <Loader /> : "Login"}</button>
              
            </form>
          </div>
          

        </div>
        


       
      </div>

      <div className={`bg-gray-100 ${open ? "flex" : "hidden"} space-x-3 p-3 text-sm rounded w-[300px] justify-between flex-col gap-2 z-50 items-center absolute top-[50%] border border-gray-300/60`}>
        <CircleCheckBig className="h-10 text-amber-800" />
      
        <h3 className="text-gray-700 font-medium">Admin Login Successfully</h3>
          
      
        <button type="button" aria-label="close" className="inline-flex active:scale-95 transition" onClick={handleClose}>
          <X />
        </button>
      </div>
          
                        
    </div>

    
  )
}
export default AdminLogin