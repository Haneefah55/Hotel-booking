import { Building, CheckCircle, Loader, Luggage } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore'

const SelectRole = () => {

  const navigate = useNavigate()
  const { user, selectRole, isLoading } = useAuthStore()
  console.log("user", user?.new)

  const handleSelectRole = async () => {
    await selectRole()
    navigate('/dashboard')
    
    
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>

      <div className='flex flex-col md:flex-row gap-10 items-center justify-center'>
        <div className='w-[280px] h-[350px] border-2 border-green-600 rounded-2xl px-4 py-3 justify-center shadow-md bg-gray-50 flex flex-col gap-2'>
          <div className='bg-green-600 p-2 w-fit rounded-xl'>
            <Luggage size={20} color='#ffffff'/>

          </div>
          <h3 className='text-lg font-semibold'>Find Your Perfect Stay</h3>
          <p>Discover and book hotels that match your comfort and budget.</p>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#16a34a'/>
            <span>Wide range of hotel options</span>
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#16a34a'/>
            <span>Easy and fast booking process</span>
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#16a34a'/>
            <span>Safe and reliable payments</span>
          </div>
          <Link to={'/dashboard'} className='bg-green-600 mt-2 rounded-xl p-2 w-fit text-white font-medium hover:bg-green-500 hover:text-gray-200 transition-all duration-300'>Continue as Guest</Link>
       


        </div>
        <div className='w-[280px] h-[350px] border-2 border-purple-800 rounded-2xl px-4 py-3 justify-center shadow-md bg-gray-50 flex flex-col gap-2'>
          <div className='bg-purple-800 p-2 w-fit rounded-xl'>
            <Building size={20} color='#ffffff'/>

          </div>
          <h3 className='text-lg font-semibold'>List Your Hotel</h3>
          <p>Reach more guest and manage your property with powerful tools.</p>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#6b21a8'/>
            <span>Showcase your hotel to guests</span>
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#6b21a8'/>
            <span>Manage reservation effortlessly</span>
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <CheckCircle size={15} color='#6b21a8'/>
            <span>Grow your revenue</span>
          </div>
          <button onClick={handleSelectRole} className='bg-purple-800 mt-2 rounded-xl p-2 w-fit text-white font-medium hover:bg-purple-500 hover:text-gray-200 transition-all duration-300'>{isLoading ? <Loader size={20} className='animate-spin'/> : "Become a Host"}</button>
       


        </div>
        

      </div>
      
    </div>
  )
}

export default SelectRole
