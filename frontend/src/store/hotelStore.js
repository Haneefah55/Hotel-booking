import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL= import.meta.env.MODE === "development" ? "http://localhost:5000/api/hotel" : "/api/hotel"

export const useHotelStore = create(persist((set) => ({
  
    hotels: [],
    rooms:[],
    count: 0,
    isApproved: false,
    isAvailable: false,
    isBooked: false,
    isLoading: false,
    error: null,
    
    
    addHotel: async(name, description, address, amenities, uploadedImageUrls, ownerId) =>{
      
      set({ isLoading: true, error: null })
      
      
      try{
        const response = await axios.post(`${API_URL}/add-hotel/${ownerId}`, { name, description, address, amenities, uploadedImageUrls }, { headers: { 'Content-Type': 'application/json' } })
        
        const hotel = response.data
      
        set({ isLoading: false, error: null })
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
        
      }
    },
    
    
    getOwnerHotel: async(id) =>{
      try {
        
        const response = await axios.get(`${API_URL}/owner/${id}`, { withCredentials: true })
        
        const hotelData = response.data.data
        const hotelCount = response.data.count
        set({ hotels: hotelData, count: hotelCount })
        
      } catch (error) {
         const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
        
    },
    
    addRoom: async(name, number, roomType, price, maxGuests, amenities, uploadedImageUrls, id) =>{
      
      set({ isLoading: true, error: null })
    
      try {
        
        const response = await axios.post(`${API_URL}/add-room/${id}`, { name, number, roomType, price, maxGuests, amenities, uploadedImageUrls }, { headers: { 'Content-Type': 'application/json' } })
        
        const room = response.data
      
        set({ isLoading: false, error: null })
        
        
      } catch ( error) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },
    
    
    getSingleHotel: async(id) =>{
      
      try {
        
        const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true })
        
        const hotelData = response.data.data
       // alert(JSON.stringify(hotelData))
        
        set({ hotels: hotelData })
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
        
      }
      
      
      
    },
    
    getSingleRoom: async(id) =>{
      set({ isLoading: true, error: null })
      
      try {
        
        const response = await axios.get(`${API_URL}/room/${id}`, { withCredentials: true })
        
        const roomData = response.data.data
       // alert(JSON.stringify(hotelData))
        
        set({ isLoading: false, rooms: roomData })
        
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
        
      }
      
      
      
    },
    
    getAllRooms: async () =>{
      
      try{
        
        const response = await axios.get(`${API_URL}/all-rooms`, { withCredentials: true })
        
        const roomData = response.data.data
       // alert(JSON.stringify(hotelData)
        set({ rooms: roomData })
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Error signing up";
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    }
  
  }),
  {
    name: 'hotel-storage', // 🔒 key in localStorage
    partialize: (state) => ({
      
      hotel: state.hotel
      
      
    }),
  }
))