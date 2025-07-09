import logo from '../assets/home.svg'

import React, { useState } from 'react';

import { Mail, Lock, Loader, Eye, EyeOff, CircleCheckBig, X } from "lucide-react"

import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore.js"
import { useNavigate } from 'react-router'

const LoginPage = () =>{
      

 // const isLoading = false
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);

  const [show, setShow] = useState(false)
    
 
  const [open, setOpen] = useState(false)
  
  
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }


  const handleCheckboxChange = (checkboxId) => {
    if(checkboxId === 1){
      setIsChecked1(true);
      setIsChecked2(false);
      setShow(false)

      
    }else {
      setIsChecked2(true);
      setIsChecked1(false);
      setShow(true)

    }
  };

  const { userLogin, ownerLogin, isLoading, error } = useAuthStore()

  
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
    
  
  
  const [hostEmail, setHostEmail] = useState('')
  const [hostPassword, setHostPassword] = useState('')
  
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPassword, setGuestPassword] = useState('')

  const handleToggle = () =>{
    
    setIsVisible(!isVisible)
  }
    
  const handleOwnerLogin = async(e) =>{
    e.preventDefault()
    
    
    try{
      await ownerLogin (hostEmail, hostPassword)
      handleOpen()
      setTimeout(() =>{
        navigate("/owner")
      }, 3000)
    } catch (error) {
      alert(error)
    }
    
    

  }

  const handleGuestLogin = async(e) =>{
    e.preventDefault()
    
   
    const role = "guest"

    
    try{
      await userLogin (guestEmail, guestPassword, role)
      handleOpen()
      setTimeout(() =>{
        navigate("/guest")
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
        

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome back!
        </h2> 
        
     
        <div className="flex  mb-10 space-x-2 bg-gray-100 p-1 border border-amber-800/50 rounded-full text-sm">
          <div className="flex items-center">
            <input type="checkbox" name="host" id="host" className=" hidden peer" checked={isChecked1} onChange= {() => handleCheckboxChange(1)} 
            />
            
            
            
            <label htmlFor="host" className="cursor-pointer rounded-full py-2 px-9 text-amber-800 transition-colors duration-040 peer-checked:bg-amber-800 peer-checked:text-gray-100">
              
              Host</label>
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="guest" id="guest" className="hidden peer"  checked={isChecked2} onChange= {() => handleCheckboxChange(2)} />

          
            <label htmlFor="guest" className="cursor-pointer rounded-full py-2 px-9 text-amber-800 transition-colors duration-040 peer-checked:bg-amber-800 peer-checked:text-gray-100">
              
              Guest
            </label>
          </div>
        </div>
    
      
        <div className="w-[300px] h-[350px] flex overflow-x-hidden snap-x snap-mandatory gap-10  scroll-smooth">

          <div className={`w-full h-full ${show ? "hidden" : "flex"} bg-gray-100 flex-col   items-center rounded-lg shadow-md transition linear duration-040 flex-shrink-0`}>
             <h3 className=" text-xl mt-6 text-gray-500 font-bold">Host Login </h3>
            <form onSubmit={handleOwnerLogin}  className=" text-amber-800 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm">
              
              <div className="flex items-center my-4 border bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <Mail className="h-10" />
                <input className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="Email" required onChange={(e) => (setHostEmail(e.target.value))} /> 
              </div>
              <div className="flex items-center my-4 border relative bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <Lock className="h-10"/>
                <input className="w-full outline-none bg-transparent py-2.5" type={isVisible ? "text" : "password"} placeholder="password" required onChange={(e) => (setHostPassword(e.target.value))} />
                <div className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                  onClick={handleToggle}>
                  {isVisible ? <Eye className="h-10"  /> : <EyeOff className="h-10" />}
                </div>
               
              </div>
              
              <button className="w-full mb-3 bg-amber-800 hover:bg-amber-950 transition-all active:scale-95 py-2.5 rounded text-gray-100 font-medium">{isLoading ? <Loader className="animate-spin h-15 text-gray-100 mx-auto"  /> : "Login"}</button>
              <p class="text-center mt-4">Don't have an account? <Link to="/signup" class="text-blue-500 underline">Sign Up</Link></p>
            </form>
          </div>
          <div className={`w-full h-full flex-col flex-shrink-0 ${show ? "flex" : "hidden"} transition linear duration-040 items-center bg-gray-100`}>
            <h3 className=" text-xl mt-6 text-gray-500 font-bold">Guest Login</h3>
            
            <form onSubmit={handleGuestLogin} className=" text-amber-800 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm ">
              
              
              <div className="flex items-center my-4 border bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <Mail className="h-10" />
                <input className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="Email" required onChange={(e) => (setGuestEmail(e.target.value))} />
                
              </div>
              <div className="flex items-center my-4 border relative bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                <Lock className="h-10"/>
                <input className="w-full outline-none bg-transparent py-2.5" type={isVisible ? "text" : "password"} placeholder="password" required onChange={(e) => (setGuestPassword(e.target.value))} />
                <div className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                  onClick={handleToggle}>
                  {isVisible ? <Eye className="h-10"  /> : <EyeOff className="h-10" />}
                </div>
               
              </div>
              
              <button className="w-full mb-3 bg-amber-800 hover:bg-amber-950 transition-all active:scale-95 py-2.5 rounded text-gray-100 font-medium">{isLoading ? <Loader className="animate-spin h-15 text-gray-100 mx-auto"  /> : "Login"}</button>
              <p class="text-center mt-4">Don't have an account? <Link to="/signup" class="text-blue-500 underline">Sign Up</Link></p>
            </form>
          </div>

        </div>
        


       
      </div>

      <div className={`bg-gray-100 ${open ? "flex" : "hidden"} space-x-3 p-3 text-sm rounded w-[300px] justify-between z-50 items-center absolute flex-row gap-5 top-[50%] border border-gray-300/60`}>
        <CircleCheckBig className="h-10 text-amber-800" />
      
        <h3 className="text-gray-700 font-medium">User Login Successfully</h3>
          
      
        <button type="button" aria-label="close" className="inline-flex active:scale-95 transition" onClick={handleClose}>
          <X />
        </button>
      </div>
          
                           
    </div>

    
    
  )
}
export default LoginPage
