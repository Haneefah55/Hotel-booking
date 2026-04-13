import logo from '../assets/home.svg'

import React, { use, useState } from 'react';

import { User, Mail, Lock, Loader, Eye, EyeOff, CircleCheckBig, X } from "lucide-react"
import bg from '../assets/images/hero.png'
import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore"

import { useNavigate } from 'react-router'

const SignupPage = () =>{

 
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signuperror, setSignuperror] = useState('')
  
  const { signup, isLoading, error } = useAuthStore()
  
  
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(!name || !email || !password){
      setSignuperror("all fields are required")
    }
    setSignuperror("")
    if(password.length < 6){
      setSignuperror("password must be atleast 6 characters")
    } else {
      setSignuperror('')
    }
    console.log(name, email, password, role)

    await signup(name,  email, password, role)
    setOpen(true)
  

  }
    
    

  
  const handleToggle = () =>{
    
    setIsVisible(!isVisible)
  }
  

  
  return(
    
    <div className="w-full min-h-screen md:h-screen bg-no-repeat bg-cover flex relative" style={{ backgroundImage: `url(${bg})`}}>

      <div className='absolute inset-0 bg-black/50 flex  items-center justify-center'>
        <div className="p-6 flex gap-5 md:gap-24 flex-col md:flex-row items-center overflow-hidden relative justify-center">
          {
            !role &&
          
          <div className='flex items-center justify-center flex-col'>
            <div className="flex mb-6 items-center gap-1">
              <img src={logo} alt="logo" className="h-17"/>
                <h2 className={"font-bold text-2xl md:text-4xl text-white  "}>StayHub</h2>
            </div>
            

            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 text-center">Create Account
            </h2> 
            <p className="text-md md:text-xl text-gray-100 mb-6 text-center">Create an account with us today! <br/>It's easy, simple and free</p>
            <div className='mt-4 flex items-center gap-3 justify-center flex-col md:flex-row'>
              <button onClick={() => setRole("guest")} className='p-3 w-[200px]  flex flex-col items-center justify-center border-2  hover:border-amber-800 backdrop-blur-md bgwhite/30 border-white/50 transition-all duration-300 text-white rounded-2xl shadow-md '>
                <h3 className='text-md font-semibold mb-2'>Create a Guest Account</h3>
                <p className='text-sm '>Find and book hotels easily</p>

              </button>

              <button onClick={() => setRole("host")} className='p-3   flex flex-col items-center justify-center border-2  hover:border-amber-800 backdrop-blur-md bgwhite/30 border-white/50  transition-all duration-300 text-white rounded-2xl shadow-md '>
                <h3 className='text-md font-semibold mb-2'> Become a Host</h3>
                <p className='text-sm '>List your property and start earning</p>

              </button>

            </div>
          </div>
          }
          
          {
            role &&
          
          
            <div className="w-[280px] md:w-[300px] h-auto flex ">
              <div className={`w-full h-full flex bg-gray-100 flex-col   items-center rounded-lg shadow-md transition linear duration-040 flex-shrink-0`}>
                {role === "host" && <h3 className=" text-xl mt-6 text-gray-500 font-bold">Create A Host Account </h3>}

                {role === "guest" && <h3 className=" text-xl mt-6 text-gray-500 font-bold">Create A Guest Account </h3>}
                <form className=" text-amber-800 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm " onSubmit={handleSubmit}>
                  
                  <div className="flex items-center my-4 border-2 focus-within:border-amber-800 bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                    <User className="h-10" />
                    <input className="w-full outline-none bg-transparent text-gray-800 py-2.5" type="text" placeholder="Username" required onChange={(e) => (setName(e.target.value))} /> 
                    
                  </div>
                  
                  <div className="flex items-center my-4 border-2 focus-within:border-amber-800 bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                    <Mail className="h-10" />
                    <input className="w-full outline-none bg-transparent text-gray-800 py-2.5" type="email" placeholder="Email" required onChange={(e) => (setEmail(e.target.value))} /> 
                    
                  </div>
                  <div className="flex items-center my-4 border-2 focus-within:border-amber-800 relative bg-amber-500/5 border-amber-800/10 rounded gap-2 pl-2">
                    <Lock className="h-10"/>
                    <input className="w-full outline-none bg-transparent text-gray-800 py-2.5" type={isVisible ? "text" : "password"} placeholder="password" required onChange={(e) => (setPassword(e.target.value))} />
                    <div className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                      onClick={handleToggle}>
                      {isVisible ? <Eye className="h-10"  /> : <EyeOff className="h-10" />}
                    </div>
                  
                  </div>
                  { error && <p className="text-center text-sm text-red-500">{error}</p>}
                  { signuperror && <p className="text-center mb-3 text-sm text-red-500">{signuperror}</p>}
                  <button className="w-full mb-3 bg-amber-800 hover:bg-amber-950 transition-all active:scale-95 py-2.5 rounded text-gray-100 font-medium">{isLoading ? <Loader className="animate-spin h-15 text-gray-100 mx-auto" /> : "Sign Up"}</button>
                  <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
                </form>
              </div>
              
              
              
            </div>
          }

        
        </div>
        
        <div className={`bg-gray-100 ${open ? "flex" : "hidden"} space-x-3 p-3 text-sm rounded w-[280px] absolute gap-5 top-[50%] border border-gray-300/60`}>
          <CircleCheckBig className="h-10 text-amber-800"/>
        
          <h3 className="text-gray-700 font-medium">Account Created Successfully</h3>
          <Link className='mt-5 px-3 py-2 bg-amber-800 text-white ' to={'/login'}>
            Login to continue
          </Link>
            
      
          
        </div>

      </div>

      
          
      
    </div>

    
      
    
  )
}
export default SignupPage
