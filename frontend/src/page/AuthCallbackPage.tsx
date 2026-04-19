import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router';

const AuthCallbackPage = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log("code", code)

  const { user, verifyGoogleAuth, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() =>{

  
      verifyGoogleAuth(code!)

      if(user?.new === true){

        navigate('/select-role')

      } else {
        navigate('/dashboard')
      }

  }, [code])

  
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-6 bg-white text-amber-800 '>
      <h3>Authenticating</h3>
      <Loader size={40} color='#92400e' className='animate-spin' />
      

      
    </div>
  )
}

export default AuthCallbackPage
