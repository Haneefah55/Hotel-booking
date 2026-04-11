import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from '../utils/axios.js'

type User ={
  id: string,
  email: string,
  name: string,
  lastLogin: string,
  image: string,
  isVerified: Boolean,
  createdAt: Date,
  role: string,
}

type Authstate = {
  user: User | null,
  isAuthenticated: Boolean,
  isLoading: Boolean,
  error: string | null,
  checkAuthError: string | null,
  signup: (
    username: string, 
    email: string, 
    password: string, 
    role: "guest" | "host"
  ) => Promise<void>,
  login: (
    email: string, 
    password: string, 
  ) => Promise<void>,
}

export const useAuthStore = create<Authstate>((set) => ({
  
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    checkAuthError: null,
    
    signup: async (username: string, email: string, password: string, role: "guest" | "host") =>{
      set({ isLoading: true, error: null })
      
      try {

        const data = { username, email, password, role }
        
        const response = await axios.post('/signup', data)
        
        set({ isLoading: false, error: null })
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },
    
    login: async(email: string, password: string) =>{
      set({ isLoading: true, error: null, isAuthenticated: false })
         
      try {
  
        const response = await axios.post(`/login-user`, { email, password })

        

        const userData= response.data
  
        set({ user: userData, isLoading: false, isAuthenticated: true })
        
      } catch (error: any) {
        const errorMessage = error.response.data.message || "Error signing up";
        set({ error: errorMessage, isLoading: false, isAuthenticated: false });

        throw error
      
      }
    },
    
    logout: async() =>{
      set({ error: null })
      try{
        await axios.post(`/logout`)
        set({ user: null, isAuthenticated: false, error: null })
        console.log("user logout")
      } catch (error) {
        set({ error: "Error logging out" })
        throw error
      }
      
    },
  
    checkAuth: async()  =>{
      set({ error: null })
      
      try {
        const response = await axios.get('/auth')
        console.log("response", response)
  
        
        set({ user: response.data, isAuthenticated: true })
        
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Error checking auth";
        set({ checkAuthError: errorMessage, isLoading: false, isAuthenticated: false });
      }
    },
    
    

    
  
  }),
 
)
  

  
   
  
  /***
  resendCode: async(email)=>{
    set({ error: null })
    try{
      const response = await axios.post(`${API_URL}/resend-code`, { email })
      
      set({ user: response.data.user, isAuthenticated: true })
      
    } catch (error) {
      set({ error: error.response.data.message || "Error verifying email" })
      
      
    }
    
    
  },
   
   
    
  verifyEmail: async(code) =>{
    set({ isLoading: true, error: null })
    
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code })
      set({ user: response.data.user, isLoading: false, isAuthenticated: true })
      return response.data
    } catch (error) {
      set({ error: error.response.data.message || "Error verifying email", isLoading: false })
      
    }
  },
  
  ***/
  /***
  checkAuth: async() =>{
    //await new Promise((resolve) => setTimeout(resolve, 2000))
    set({ isCheckingAuth: true, error: null })
    
    try {
      const response = await axios.get(`${API_URL}/check-auth`)
      set({ user: response.data.user, isCheckingAuth: false, isAuthenticated: true })
      
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false })
      
    }
  },
  
 ***/
 /***
 
  logout: async() =>{
    set({ error: null })
    try{
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      set({ user: null, isAuthenticated: false, error: null })
    } catch (error) {
      set({ error: "Error logging out" })
      throw error
    }
    
    
    
  },
  
  

  updateUser: async(userId, data)=>{
    
    set({ isLoading: true, error: null })
    try {
      const response = await axios.put(`${API_URL}/edit-user/${userId}`, { ...data })
      set({ user: response.data.user, isLoading: false })
    } catch (error) {
      set({ error: error.response.data.message || "Error updating profile", isLoading: false })
    
    }
    
  },
  

  
  forgotPassword: async(email) =>{
    set({ isLoading: true, error: null, message: null })
        
    try {
      const response = await axios.post(`${API_URL}/forget-password`, { email })
      set({ user: response.data.user, isLoading: false, error: null })
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message || "Error sending reset password link" })
    
    }
    
    
  },
  
  
  resetPassword: async(token, password) =>{
    set({ isLoading: true, error: null })
    try {
      
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password })
      set({ message: response.data.message, isLoading: false, error: null})
    } catch (error){
      set({ error: error.response.data.message || "Error reseting password", isLoading: false, message: null })
      throw error
    }
    
  },

  deleteUser: async(userId)=>{
    set({ error: null, isLoading: true })
    try {
      await axios.delete(`${API_URL}/delete-account/${userId}`)
      set({ isLoading: false, user: null, isAuthenticated: false })
    } catch (error) {
      set({ error: error.response.data.message || "Error deleting user", isLoading: false })
    
    }
    
  },
  
  changePassword: async(oldPassword, newPassword, userId) =>{
    set({ isLoading: true, error: null})
    
    try{
      
      const response = await axios.post(`${API_URL}/change-password/${userId}`, { oldPassword, newPassword })
      
      set({ message: response.data.message, isLoading: false, error: null})
      
    } catch (error) {
      
      set({ error: error.response.data.message || "Error reseting password", isLoading: false, message: null })
      throw error
      
    }
    
  }
 
  
****/
  
  
